/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import './AdmRegistrosContas.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import FileSaver from 'file-saver';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdmRegistrosContas() {
  const [comunics, setAllComunics] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [actualFile, setActualFile] = useState();
  const [fileId, setFileId] = useState();
  const [archive1Id, setArchive1Id] = useState();

  function createData(dateActual, title, description) {
    const date = moment(dateActual).format('YYYY-MM-DD');
    return {
      date, title, description,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllAccounts() {
    console.log('ali');
    const auxAccount = [];
    const accountId = [];
    const archive1Code = [];
    const archive2Code = [];
    try {
      console.log('alo');
      const allComunic = await managerService.getAccounts();
      console.log('🚀 ~ file: AdmRegistrosAcoes.js ~ line 41 ~ getAllComunic ~ allComunic', allComunic);
      allComunic.forEach((object) => {
        auxAccount.push(createData(
          object.date,
          object.title,
          object.description,
        ));
        if (object.pdf !== '') {
          archive1Code.push(object.pdf);
        }
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
    'Data',
    'Título',
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
      <TableComponent setUse={setUse} accountId={id} rows={comunics} titles={titles} archive1Id={archive1Id} editAccount />
    </div>
  );
}

export default AdmRegistrosContas;
