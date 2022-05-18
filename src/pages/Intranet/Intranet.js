import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes';
import './Intranet.css';
import BirthdayNotificationModal from '../../components/BirthdayNotification/BirthdayNotification';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  return (
    <div>
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
      <div>
        <BottomMenu />
      </div>
      <BirthdayNotificationModal />
    </div>
  );
}

export default Intranet;
