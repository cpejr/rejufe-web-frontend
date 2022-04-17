import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes/ResultadoQuizzes';
import ListaComunicados from '../ListaComunicados/ListaComunicados';
import ActionQuery from '../../components/ActionQuery/ActionQuery';
import InformativeQuery from '../../components/InformativeQuery/InformativeQuery';
import ConsultaAssociados from '../ConsultaAssociados/ConsultaAssociados';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const menuSide = () => {
    switch (selectedButton) {
    case 'Enquetes': return <ResultadoQuizzes />;
    case 'Ações Adm': return <ActionQuery />;
    case 'Associados': return <ConsultaAssociados />;
    case 'Informativos': return <InformativeQuery />;

    default: return <div />;
    }
  };

    case 'Comunicados': return <ListaComunicados />;
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
