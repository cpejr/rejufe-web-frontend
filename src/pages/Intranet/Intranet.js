import React from 'react';
import MenuLateral from '../MenuLateral';
import ResultadoQuizzes from '../ResultadoQuizzes';
import './Intranet.css';

function Intranet() {
  return (
    <div className="Intranet-main-container">
      <div className="Intranet-side-menu">
        <MenuLateral />
      </div>
      <div className="Intranet-dashboad-quizzes">
        <ResultadoQuizzes />
      </div>
    </div>
  );
}

export default Intranet;
