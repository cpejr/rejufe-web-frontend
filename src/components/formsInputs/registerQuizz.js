import React, { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Alternatives from '../Enquetes/alternatives';
import * as managerService from '../../services/manager/managerService';
import { initialQuizzState, initialQuizzErrorState } from '../initialStates/initialQuizzStates';
import judicialSection from '../consts/judicialSection';

function FormInputs({ setNewQuizz }) {
  const users = [];
  const [voterSection, setVoterSection] = useState([]);
  const [dados, setDados] = useState(initialQuizzState);
  const [initialErrorState, setError] = useState(initialQuizzErrorState);

  const handleSectionChange = (event) => {
    const {
      target: { value },
    } = event;
    setVoterSection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const allAssociates = 'Todos os associados';

  const sections = judicialSection?.filter((section) => section.value !== '');

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  const getUsers = async () => {
    if (voterSection?.some((elem) => elem === allAssociates)) {
      try {
        const response = await managerService.getAllUsers();
        let count = 0;
        response?.forEach((user) => {
          users[count] = user._id;
          count += 1;
        });
      } catch (error) {
        toast.error('Não foi possível obter usuários!!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } else if (voterSection.length !== 0) {
      try {
        const response = await managerService.getUsersBySection(voterSection);
        let count = 0;
        response?.forEach((user) => {
          users[count] = user._id;
          count += 1;
        });
      } catch (error) {
        toast.error('Não foi possível obter usuários!!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
  };

  useEffect(() => {
    getUsers();
    if (voterSection?.includes(allAssociates) && voterSection.length > 1) {
      setVoterSection([allAssociates]);
    }
  }, [voterSection]);

  return (
    <div>
      <div className="title-modal-quizz">
        <h2>Insira as informações da nova enquete</h2>
      </div>
      <div className="form-modal-quizz">
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 25 }} className="input-forms-create-quizz">Título</InputLabel>
          <Input
            required
            error={initialErrorState.title}
            value={dados.title}
            onChange={(e) => handleChange(e.target.value, 'title')}
          />
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 25 }} className="input-forms-create-quizz">Descrição</InputLabel>
          <Input
            required
            error={initialErrorState.description}
            value={dados.description}
            onChange={(e) => handleChange(e.target.value, 'description')}
          />
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 25 }} className="input-forms-create-quizz">Data de início </InputLabel>
          <Input
            required
            error={initialErrorState.openingDate}
            type="Date"
            value={dados.openingDate}
            onChange={(e) => handleChange(e.target.value, 'openingDate')}
          />
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 25 }} className="input-forms-create-quizz">Data de fim </InputLabel>
          <Input
            required
            error={initialErrorState.closingDate}
            type="Date"
            value={dados.closingDate}
            onChange={(e) => handleChange(e.target.value, 'closingDate')}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="select-voter" shrink sx={{ fontSize: 25 }} className="input-forms-create-quizz">Selecione quem irá votar</InputLabel>
          <Select
            required
            error={initialErrorState.toVote}
            labelId="select-voter"
            id="multiple-chip"
            value={voterSection}
            onChange={handleSectionChange}
            multiple={voterSection.some((elem) => elem !== allAssociates)}
            input={<Input id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected?.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem key="Todos os associados" value="Todos os associados">Todos os associados</MenuItem>
            {sections?.map((section) => (
              <MenuItem
                key={section.label}
                value={section.value}
              >
                {section.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Alternatives
          initialErrorState={initialErrorState}
          dados={dados}
          users={users}
          setError={setError}
          setNewQuizz={setNewQuizz}
        />
      </div>
    </div>
  );
}

export default FormInputs;
