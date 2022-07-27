/* eslint-disable no-unused-vars */
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

function FormInputs({ setNewQuizz, handleClose }) {
  const users = [];
  const [voterSection, setVoterSection] = useState([]);
  const [dados, setDados] = useState(initialQuizzState);
  const [initialErrorState, setError] = useState(initialQuizzErrorState);
  const [day, setDay] = useState('');
  let openingTime;
  let openingDay;
  let closingTime;
  let closingDay;

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

  function handleDate(value, field) {
    const date = (`${day}, ${value}`);
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: date });
  }

  function handleChange(value, field) {
    if (field === 'openingDate' || field === 'closingDate') {
      setDay(value);
    }
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
  }, [voterSection], dados);

  return (
    <div>
      <div className="title-modal-quizz">
        <h2>Insira as informações da nova enquete</h2>
      </div>
      <div className="form-modal-quizz">
<<<<<<< HEAD
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Título</InputLabel>
          <Input
            required
            error={initialErrorState.title}
            value={dados.title}
            onChange={(e) => handleChange(e.target.value, 'title')}
          />
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Descrição</InputLabel>
          <Input
            required
            error={initialErrorState.description}
            value={dados.description}
            onChange={(e) => handleChange(e.target.value, 'description')}
          />
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 22 }} className="input-label-forms-create-quizz">Data de início </InputLabel>
          <Input
            required
            error={initialErrorState.openingDate}
            type="Date"
            value={openingDay}
            onChange={(e) => handleChange(e.target.value, 'openingDate')}
          />
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 22 }} className="input-label-forms-create-quizz">Horário de início </InputLabel>
          <Input
            required
            error={initialErrorState.openingDate}
            type="time"
            value={openingTime}
            onChange={(e) => handleDate(e.target.value, 'openingDate')}
          />
        </FormControl>
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Data de fim </InputLabel>
          <Input
            required
            error={initialErrorState.closingDate}
            type="Date"
            value={closingDay}
            onChange={(e) => handleChange(e.target.value, 'closingDate')}
          />
        </FormControl>
=======
        <div className="label-modal-quizz">
          <FormControl>
            <InputLabel shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Título</InputLabel>
            <Input
              required
              error={initialErrorState.title}
              value={dados?.title}
              onChange={(e) => handleChange(e.target.value, 'title')}
            />
          </FormControl>
        </div>
        <div className="label-modal-quizz">
          <FormControl>
            <InputLabel shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Descrição</InputLabel>
            <Input
              required
              error={initialErrorState.description}
              value={dados?.description}
              onChange={(e) => handleChange(e.target.value, 'description')}
            />
          </FormControl>
        </div>
        <div className="label-modal-quizz">
          <FormControl>
            <InputLabel shrink sx={{ fontSize: 22 }} className="input-label-forms-create-quizz">Data de início </InputLabel>
            <Input
              required
              error={initialErrorState.openingDate}
              type="Date"
              value={dados?.openingDate}
              onChange={(e) => handleChange(e.target.value, 'openingDate')}
            />
          </FormControl>
        </div>
        <div className="label-modal-quizz">
          <FormControl>
            <InputLabel shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Data de fim </InputLabel>
            <Input
              required
              error={initialErrorState.closingDate}
              type="Date"
              value={dados?.closingDate}
              onChange={(e) => handleChange(e.target.value, 'closingDate')}
            />
          </FormControl>
        </div>
>>>>>>> DEV
        <FormControl>
          <InputLabel shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Horário de fim </InputLabel>
          <Input
            required
            error={initialErrorState.closingDate}
            type="time"
            value={closingTime}
            onChange={(e) => handleDate(e.target.value, 'closingDate')}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="select-voter" shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Selecione quem irá votar</InputLabel>
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
                key={section?.label}
                value={section?.value}
              >
                {section?.label}
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
          voterSection={voterSection}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}

export default FormInputs;
