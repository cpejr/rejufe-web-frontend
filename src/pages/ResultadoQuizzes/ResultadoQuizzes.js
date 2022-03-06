import React, { useEffect } from 'react';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  async function getAllAQuizzes() {
    const quizzes = await managerService.getQuizzes();
    console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 10 ~ getAllAQuizzes ~ quizzes', quizzes);
  }
  useEffect(() => {
    getAllAQuizzes();
  }, []);
  return (
    <Quizzes />
  );
}

export default ResultadoQuizzes;
