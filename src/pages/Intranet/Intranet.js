/* eslint-disable indent */
import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes/ResultadoQuizzes';
import ActionJuridical from '../../components/ActionJuridicalQuery/ActionJuridical';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const menuSide = () => {
    switch (selectedButton) {
      case 'Enquetes': return <ResultadoQuizzes />;
      case 'Ações Jurídicas': return <ActionJuridical />;

      default: return <div />;
    }
  };

  return (
    <div>
      <div className="intranet-main-container">
        <div className="intranet-side-menu">
          <MenuLateral setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
        </div>
        <div className="intranet-dashboad-all">
          {menuSide()}
        </div>
      </div>
      <div>
        <BottomMenu />
      </div>
    </div>
  );
}
export default Intranet;
