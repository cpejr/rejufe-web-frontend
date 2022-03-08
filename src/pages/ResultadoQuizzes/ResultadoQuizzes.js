import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [vote, setVote] = useState([]);
  const associateId = [];

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes();
      setQuizzes(response);
      response.forEach((object) => {
        associateId.push(object.toVote);
      });
      setVote(associateId);
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
  console.log(quizzes);

  useEffect(() => {
    getAllAQuizzes();
  }, []);

  return (
    <div className="container-quizzes">
      <div className="division-page" />
      <div className="division-quizzes">
        <h1>Resultado das Enquetes</h1>
        <div className="line-table-quizzes" />
        {quizzes?.map((quizz) => (
          <Quizzes vote={vote} quizz={quizz} />
        ))}
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
