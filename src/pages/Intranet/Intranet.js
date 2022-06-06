/* eslint-disable indent */
import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ResultadoQuizzes from '../ResultadoQuizzes/ResultadoQuizzes';
import ListaComunicados from '../ListaComunicados/ListaComunicados';
import ActionQuery from '../../components/ActionQuery/ActionQuery';
import InformativeQuery from '../../components/InformativeQuery/InformativeQuery';
import ConsultaAssociados from '../ConsultaAssociados/ConsultaAssociados';
import MinuteQuery from '../../components/MinutesQuery/MinutesQuery';
import AdministrativeRequirements from '../../components/AdministrativeRequirements/AdministrativeRequirements';
import Aniversariantes from '../Aniversariantes/Aniversariantes';
import ActionJuridical from '../../components/ActionJuridicalQuery/ActionJuridical';
import AccountQuery from '../../components/AccountQuery/AccountQuery';
import InitialPetitions from '../../components/InitialPetitions/InitialPetitions';
import Jurisprudence from '../../components/Jurisprudence/Jurisprudence';
import Simbolo from '../../images/simbolo.png';
import NewsQuery from '../../components/NewsQuery/NewsQuery';
import ContactUs from '../contactUs/contactUs';
import ListaEditais from '../ListaEditais/ListaEditais';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const menuDashboard = () => {
    switch (selectedButton) {
      case 'Enquetes': return <ResultadoQuizzes />;
      case 'Ações Adm': return <ActionQuery />;
      case 'Associados': return <ConsultaAssociados />;
      case 'Informativos': return <InformativeQuery />;
      case 'Ações Jurídicas': return <ActionJuridical />;
      case 'Aniversariantes': return <Aniversariantes />;
      case 'Prestação de Contas': return <AccountQuery />;
      case 'Petições Iniciais': return <InitialPetitions />;
      case 'Atas': return <MinuteQuery />;
      case 'Comunicados': return <ListaComunicados />;
      case 'Jurisprudência': return <Jurisprudence />;
      case 'Home': return <NewsQuery />;
      case 'Requerimentos Administrativos': return <AdministrativeRequirements />;
      case 'Fale Conosco': return <ContactUs />;
    case 'Editais': return <ListaEditais intranet />;

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
