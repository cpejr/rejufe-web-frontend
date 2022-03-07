import React from 'react';
import ModalEnquete from '../../components/Enquetes/modalEnquetes';
import { useAuth } from '../../providers/auth';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import './ResultadoQuizzes.css';

function ResultadoQuizzes() {
  const { user } = useAuth();

  return (
    <div className="container-quizzes">
      <div className="division-page" />
      <div className="division-quizzes">
        <h1>Resultado das Enquetes</h1>
        <ModalEnquete />
        <div className="line-table-quizzes" />
        {quizzes?.map((quizz) => (
          user?.type === 'administrador' ? (
            <Quizzes quizz={quizz} />
          ) : (
            <div />
          )
        ))}
      </div>
    </div>
  );
}

export default ResultadoQuizzes;
