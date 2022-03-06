import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes();
      setQuizzes(response);
      console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 10 ~ getAllAQuizzes ~ quizzes', quizzes);
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
    <div>
      {quizzes?.map((quizz) => (
        <Quizzes quizz={quizz} />
      ))}
    </div>
  );
}

export default ResultadoQuizzes;
