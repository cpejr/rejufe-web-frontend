import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../providers/auth';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [associates, setAssociates] = useState([]);
  const history = useHistory();

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
            <Quizzes quizz={quizz} associates={associates} />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
