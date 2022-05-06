/* eslint-disable indent */
import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes/ResultadoQuizzes';
import ActionQuery from '../../components/ActionQuery/ActionQuery';
import ConsultaAssociados from '../ConsultaAssociados/ConsultaAssociados';
import MinuteQuery from '../../components/MinutesQuery/MinutesQuery';
import InformativeQuery from '../../components/InformativeQuery/InformativeQuery';
import ActionJuridical from '../../components/ActionJuridicalQuery/ActionJuridical';
import AccountQuery from '../../components/AccountQuery/AccountQuery';
import Jurisprudence from '../../components/Jurisprudence/Jurisprudence';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const menuSide = () => {
    switch (selectedButton) {
      case 'Enquetes': return <ResultadoQuizzes />;
      case 'Ações Adm': return <ActionQuery />;
      case 'Associados': return <ConsultaAssociados />;
      case 'Informativos': return <InformativeQuery />;
      case 'Ações Jurídicas': return <ActionJuridical />;
      case 'Prestação de Contas': return <AccountQuery />;
      case 'Atas': return <MinuteQuery />;
      case 'Jurisprudência': return <Jurisprudence />;

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
        <BottomMenu setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
      </div>
    </div>
  );
}
export default Intranet;
