/* eslint-disable indent */
import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes/ResultadoQuizzes';
import ActionQuery from '../../components/ActionQuery/ActionQuery';
import ConsultaAssociados from '../ConsultaAssociados/ConsultaAssociados';
import AdministrativeRequirements from '../../components/AdministrativeRequirements/AdministrativeRequirements';
import InformativeQuery from '../../components/InformativeQuery/InformativeQuery';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const menuDashboard = () => {
    switch (selectedButton) {
      case 'Enquetes': return <ResultadoQuizzes />;
      case 'Ações Adm': return <ActionQuery />;
      case 'Associados': return <ConsultaAssociados />;
      case 'Informativos': return <InformativeQuery />;
      case 'Requerimentos Administrativos': return <AdministrativeRequirements />;

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
          {menuDashboard()}
        </div>
      </div>
      <div>
        <BottomMenu setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
      </div>
    </div>
  );
}
export default Intranet;
