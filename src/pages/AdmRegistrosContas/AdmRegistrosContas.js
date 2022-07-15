/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import './AdmRegistrosContas.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdmRegistrosContas() {
  const [comunics, setAllComunics] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();

  function createData(title, date, description) {
    return {
      title, date, description,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllAccounts() {
    const auxAccount = [];
    const accountId = [];
    const archive1Code = [];
    try {
      const allComunic = await managerService.getAccounts();
      allComunic.forEach((object) => {
        auxAccount.push(createData(
          object.title,
          moment(object.date).add(1, 'days').format('DD-MM-YYYY'),
          object.description,
        ));
        archive1Code.push(object.archive_1);
      });
      allComunic.forEach((object) => {
        accountId.push(createId(
          object._id,
        ));
      });
      auxAccount.sort();
      setId(accountId);
      setAllComunics(auxAccount);
      setArchive1Id(archive1Code);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  useEffect(() => {
    getAllAccounts();
  }, [use]);

  const titles = [
    '',
    'Título',
    'Data',
    'Descrição',
    'Anexo ',
  ];

  return (
    <div className="container-administration-register">
      <div className="title-adm-registers">
        <h1>
          {'Manutenção em Prestação de Contas '}
        </h1>
      </div>
      <div className="line-table-registers" />
      <TableComponent
        setUse={setUse}
        accountId={id}
        rows={comunics}
        titles={titles}
        archive1Id={archive1Id}
        editAccount
        renderButton
      />
    </div>
  );
}

export default AdmRegistrosContas;
