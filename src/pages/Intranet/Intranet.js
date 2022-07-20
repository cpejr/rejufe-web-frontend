/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
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
import * as managerService from '../../services/manager/managerService';
import ContactUs from '../contactUs/contactUs';
import ListaEditais from '../ListaEditais/ListaEditais';
import './Intranet.css';
import BirthdayNotificationModal from '../../components/BirthdayNotification/BirthdayNotification';

toast.configure();

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('Home');
  const [birthdaysUsers, setBirthdayUsers] = useState();

  async function getBirthdayUsers() {
    try {
      const response = await managerService.getTodayBirthday();
      setBirthdayUsers(response);
    } catch (error) {
      toast.error('Não foi possível obter aniversariantes!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

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

  useEffect(() => {
    getBirthdayUsers();
  }, []);

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
      {(birthdaysUsers?.length !== 0 && birthdaysUsers !== undefined) && (
        <BirthdayNotificationModal birthdaysUsers={birthdaysUsers} />
      )}
    </div>
  );
}

export default Intranet;
