import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes/ResultadoQuizzes';
import ContactUs from '../contactUs/contactUs';
import './Intranet.css';

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
        {selectedButton === 'Fale Conosco' ? (
          <div className="intranet-dashboad-contactus">
            <ContactUs />
          </div>
        ) : (
          <div />
        )}
      </div>
      <div>
        <BottomMenu />
      </div>
    </div>
  );
}

export default Intranet;
