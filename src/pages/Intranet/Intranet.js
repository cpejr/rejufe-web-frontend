import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import ResultadoQuizzes from '../ResultadoQuizzes';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  return (
    <div className="intranet-main-container">
      <div className="intranet-side-menu">
        <MenuLateral setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
      </div>
      {selectedButton === 'Enquetes' ? (
        <div className="intranet-dashboad-quizzes">
          <ResultadoQuizzes />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Intranet;
