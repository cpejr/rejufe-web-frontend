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
import allocation from '../consts/allocation';

function FormInputs({ setNewQuizz, handleClose }) {
  const users = [];
  const [voterAllocation, setVoterAllocation] = useState([]);
  const [dados, setDados] = useState(initialQuizzState);
  const [initialErrorState, setError] = useState(initialQuizzErrorState);

  const handleSectionChange = (event) => {
    const {
      target: { value },
    } = event;
    setVoterAllocation(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const allAssociates = 'Todos os associados';

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  const getUsers = async () => {
    if (voterAllocation?.some((elem) => elem === allAssociates)) {
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
    } else if (voterAllocation.length !== 0) {
      try {
        const response = await managerService.getUsersByAllocation(voterAllocation);
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
    if (voterAllocation?.includes(allAssociates) && voterAllocation.length > 1) {
      setVoterAllocation([allAssociates]);
    }
  }, [voterAllocation]);

  return (
    <div>
      <div className="title-modal-quizz">
        <h2>Insira as informações da nova enquete</h2>
      </div>
      <div className="form-modal-quizz">
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
        <FormControl>
          <InputLabel id="select-voter" shrink sx={{ fontSize: 22 }} className="input-forms-create-quizz">Selecione quem irá votar</InputLabel>
          <Select
            required
            error={initialErrorState.toVote}
            labelId="select-voter"
            id="multiple-chip"
            value={voterAllocation}
            onChange={handleSectionChange}
            multiple={voterAllocation.some((elem) => elem !== allAssociates)}
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
            {allocation?.map((_allocation) => (
              <MenuItem
                key={_allocation?.label}
                value={_allocation?.value}
              >
                {_allocation?.label}
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
          voterAllocation={voterAllocation}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}

export default FormInputs;
