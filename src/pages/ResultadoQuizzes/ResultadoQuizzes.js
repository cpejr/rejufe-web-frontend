import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useAuth } from '../../providers/auth';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [associates, setAssociates] = useState([]);
  const history = useHistory();
  const [toVote, setToVote] = useState([]);

  const [date] = useState(new Date());
  const dateQuizz = moment(date).format('YYYY-MM-DD');

  console.log(user);

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes();
      const allAssociates = await managerService.getAssociates();
      setQuizzes(response);
      setAssociates(allAssociates);
    } catch (error) {
      history.push('/NotFound');
      console.log(error);
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  async function getToVoteQuizzes() {
    try {
      const response = await managerService.getToVoteQuizzes(user?.id);
      console.log(response);
      setToVote(response);
    } catch (error) {
      history.push('/NotFound');
      console.log(error);
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
  }, []);

  return (
    <div className="container-cards-quizzes">
      <div className="division-cards-quizzes" />
      <div className="title-cards-quizzes">
        <h1>Resultado das Enquetes</h1>
        <div className="line-table-cards-quizzes" />
        {user?.type === 'administrador' ? (
          quizzes?.map((quizz) => (
            <Quizzes quizz={quizz} associates={associates} dateQuizz={dateQuizz} />
          ))
        ) : (
          toVote?.map((quizz) => (
            <>
              {quizz?.openingDate <= dateQuizz && (
                <Quizzes quizz={quizz} associates={associates} dateQuizz={dateQuizz} />
              )}
              <div />
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
