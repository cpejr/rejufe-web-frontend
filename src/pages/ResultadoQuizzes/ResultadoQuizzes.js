import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import {
  InputLabel, FormControl, Select, MenuItem,
} from '@mui/material';
import ModalEnquete from '../../components/Enquetes/modalEnquetes';
import { useAuth } from '../../providers/auth';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const [voted, setVoted] = useState(false);
  const [filter, setFilter] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [toVote, setToVote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuizz, setNewQuizz] = useState(false);
  const [deletedQuizz, setDeletedQuizz] = useState(false);
  const { user } = useAuth();
  const history = useHistory();
  const dateQuizz = moment(new Date());

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes(dateQuizz.format('YYYY-MM-DD, HH:mm'));
      setQuizzes(response);
      setDeletedQuizz(false);
      setLoading(false);
    } catch (error) {
      history.push('/NotFound');
      toast.error('Não foi possível obter quizzes!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  async function getToVoteQuizzes() {
    try {
      const response = await managerService.getToVoteQuizzes(user?.id, dateQuizz.format('YYYY-MM-DD, HH:mm'));
      setToVote(response);
      setLoading(false);
    } catch (error) {
      history.push('/NotFound');
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  const handleChange = (value) => {
    if (value !== 'Sem filtros') {
      setFilter(value);
    }
  };

  useEffect(() => {
    if (user?.type === 'administrador') {
      getAllAQuizzes();
    } else {
      getToVoteQuizzes();
    }
  }, [voted, newQuizz, deletedQuizz]);

  return (
    <div className="container-cards-quizzes">
      <div className="division-cards-quizzes">
        <div className="title-cards-quizzes-page">
          <h1>Resultado das Enquetes</h1>
        </div>
        <div className="line-table-cards-quizzes" />
        <div className="filter-create-cards-quizzes">
          <FormControl className="form-user-module-page">
            <InputLabel id="select-filter">Selecione um filtro</InputLabel>
            <Select
              className="select-filter-user-module"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Selecione um filtro"
              onChange={(e) => handleChange(e.target.value)}
            >
              <MenuItem value="">Nenhum</MenuItem>
              <MenuItem value="Em andamento">Em andamento</MenuItem>
              <MenuItem value="Finalizada">Finalizada</MenuItem>
              <MenuItem value="Não iniciada">Não iniciada</MenuItem>
            </Select>
          </FormControl>
          {user?.type === 'administrador' && (
            <ModalEnquete setNewQuizz={setNewQuizz} />
          )}
        </div>
        {loading ? (
          <div className="loader-cards-quizzes">
            <CircularProgress size={35} color="inherit" />
          </div>
        ) : (
          <>
            {user?.type === 'administrador' ? (
              quizzes?.map((quizz) => (
                <Quizzes
                  quizz={quizz}
                  dateQuizz={dateQuizz}
                  user={user}
                  filter={filter}
                  setVoted={setVoted}
                  setDeletedQuizz={setDeletedQuizz}
                />
              ))
            ) : (
              toVote?.map((quizz) => (
                <Quizzes
                  quizz={quizz}
                  dateQuizz={dateQuizz}
                  user={user}
                  filter={filter}
                  setVoted={setVoted}
                  setDeletedQuizz={setDeletedQuizz}
                />
              ))
            )}
            <div />
          </>
        )}
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
