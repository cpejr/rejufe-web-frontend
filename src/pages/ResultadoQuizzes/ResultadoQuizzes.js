import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import ModalEnquete from '../../components/Enquetes/modalEnquetes';
import { useAuth } from '../../providers/auth';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizz, setNewQuizz] = useState(false);
  const [associates, setAssociates] = useState([]);
  const history = useHistory();
  const [voted, setVoted] = useState();
  const [toVote, setToVote] = useState([]);
  const [date] = useState(new Date());
  const dateQuizz = moment(date).format('YYYY-MM-DD, hh:mm');
  const [loading, setLoading] = useState(true);

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes();
      const allAssociates = await managerService.getAssociates();
      setAssociates(allAssociates);
      setQuizzes(response);
      setLoading(false);
    } catch (error) {
      history.push('/NotFound');
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  async function getToVoteQuizzes() {
    try {
      const response = await managerService.getToVoteQuizzes(user?.id, dateQuizz);
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

  useEffect(() => {
    if (user?.type === 'administrador') {
      getAllAQuizzes();
    } else {
      getToVoteQuizzes();
    }
  }, [voted, newQuizz]);

  return (
    <div className="container-cards-quizzes">
      <div className="division-cards-quizzes">
        <div className="title-cards-quizzes-page">
          <h1>Resultado das Enquetes</h1>
          {user.type === 'administrador' && (
            <ModalEnquete setNewQuizz={setNewQuizz} />
          )}
        </div>
        <div className="line-table-cards-quizzes" />
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
                  associates={associates}
                  dateQuizz={dateQuizz}
                  user={user}
                  setVoted={setVoted}
                />
              ))
            ) : (
              toVote?.map((quizz) => (
                <Quizzes
                  quizz={quizz}
                  associates={associates}
                  dateQuizz={dateQuizz}
                  user={user}
                  setVoted={setVoted}
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
