import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalEnquete from '../../components/Enquetes/modalEnquetes';
import { useAuth } from '../../providers/auth';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizz, setNewQuizz] = useState(false);

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes();
      setQuizzes(response);
      setNewQuizz(false);
      console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 10 ~ getAllAQuizzes ~ quizzes', response);
    } catch (error) {
      console.log(error);
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  useEffect(() => {
    getAllAQuizzes();
  }, [newQuizz]);

  return (
    <div className="container-cards-quizzes">
      <div className="division-cards-quizzes">
        <div className="title-cards-quizzes">
          <h1>Resultado das Enquetes</h1>
          <ModalEnquete setNewQuizz={setNewQuizz} />
        </div>
        <div className="line-table-cards-quizzes" />
        {user?.type === 'administrador' ? (
          quizzes?.map((quizz) => (
            <Quizzes quizz={quizz} />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
