import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [associates, setAssociates] = useState([]);

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes();
      const allAssociates = await managerService.getAssociates();
      setQuizzes(response);
      setAssociates(allAssociates);
    } catch (error) {
      console.log(error);
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  // const userName = [];
  // let count = 0;

  useEffect(() => {
    getAllAQuizzes();
  }, []);
  console.log(associates);

  return (
    <div className="container-quizzes">
      <div className="division-page" />
      <div className="division-quizzes">
        <h1>Resultado das Enquetes</h1>
        <div className="line-table-quizzes" />
        {quizzes?.map((quizz) => (
          <Quizzes associates={associates} quizz={quizz} />
        ))}
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
