import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes/ResultadoQuizzes';
import ActionQuery from '../../components/ActionQuery/ActionQuery';
import ConsultaAssociados from '../ConsultaAssociados/ConsultaAssociados';
import InformativeQuery from '../../components/InformativeQuery/InformativeQuery';
import AccountQuery from '../../components/AccountQuery/AccountQuery';
import Simbolo from '../../images/simbolo.png';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const menuSide = () => {
    switch (selectedButton) {
      case 'Enquetes': return <ResultadoQuizzes />;
      case 'Ações Adm': return <ActionQuery />;
      case 'Associados': return <ConsultaAssociados />;
      case 'Informativos': return <InformativeQuery />;
      case 'Prestação de Contas': return <AccountQuery />;

      default: return <div />;
    }
  };

  return (
    <div className="intranet-total-page-container">
      <div className="intranet-welcome">
        <div className="intranet-rejufe-logo">
          <img src={Simbolo} alt="Logo" />
          <h1>REJUFE</h1>
        </div>
        <h2>Bem vindo a Intranet!</h2>
      </div>
      <Divider variant="inset" />
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
