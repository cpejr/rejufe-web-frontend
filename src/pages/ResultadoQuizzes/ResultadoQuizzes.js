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

  const [date] = useState(new Date());
  const dateQuizz = moment(date).format('YYYY-MM-DD');

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
  useEffect(() => {
    getAllAQuizzes();
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
          quizzes?.map((quizz) => (
            <>
              {quizz?.openingDate <= dateQuizz && (
                <>
                  {quizz?.toVote?.includes(user._id) ? (
                    <Quizzes quizz={quizz} associates={associates} dateQuizz={dateQuizz} />
                  ) : (
                    <div />
                  )}
                  <div />
                </>
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
