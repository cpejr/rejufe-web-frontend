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

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes();
      setQuizzes(response);
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
  }, []);

  return (
    <div className="container-quizzes">
      <div className="division-page" />
      <div className="division-quizzes">
        <div className="title-quizzes">
          <h1>Resultado das Enquetes</h1>
          <ModalEnquete />
        </div>
        <div className="line-table-quizzes" />
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
