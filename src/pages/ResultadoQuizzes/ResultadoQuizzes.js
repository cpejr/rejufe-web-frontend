import React, { useEffect } from 'react';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  async function getAllAQuizzes() {
    const quizzes = await managerService.getQuizzes();
  }
  useEffect(() => {
    getAllAQuizzes();
  }, []);
  return (
    <div className="container-quizzes">
      <div className="division-page" />
      <div className="division-quizzes">
        <h1> Resultado das Enquetes</h1>
        <div className="line-table-quizzes" />
        <Quizzes />
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
