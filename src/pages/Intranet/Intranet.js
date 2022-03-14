import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import ResultadoQuizzes from '../ResultadoQuizzes';
import './Intranet.css';
import BottomMenu from '../../components/BottomMenu/BottomMenu';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  return (
    <div className="intranet-main-container">
      <div className="intranet-side-menu">
        <MenuLateral setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
      </div>
      <div className="intranet-right-column">
        {selectedButton === 'Enquetes' ? (
          <div className="intranet-dashboad-quizzes">
            <ResultadoQuizzes />
          </div>
        ) : (
          <div />
        )}
        <div>
          <BottomMenu />
        </div>
      </div>
    </div>
  );
}

export default Intranet;
