import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes';
import './Intranet.css';

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
      <div className="Bottom-Menu-Align">
        <BottomMenu />
      </div>
    </div>
  );
}

export default Intranet;
