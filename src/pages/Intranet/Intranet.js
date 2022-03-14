import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import ResultadoQuizzes from '../ResultadoQuizzes';
import './Intranet.css';
import BottomMenu from '../../components/BottomMenu/BottomMenu';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  return (
    <div className="Intranet-main-container">
      <div className="Intranet-side-menu">
        <MenuLateral setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
      </div>
      {selectedButton === 'Enquetes' ? (
        <div className="Intranet-dashboad-quizzes">
          <ResultadoQuizzes />
        </div>
      ) : (
        <div />
      )}
      <div>
        <BottomMenu />
      </div>
    </div>
  );
}

export default Intranet;
