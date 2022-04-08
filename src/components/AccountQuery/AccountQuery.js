import React, { useState, useEffect } from 'react';
import moment from 'moment';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';

function AccountQuery() {
  const [account, setAllAccount] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const titles = [
    '',
    'Data',
    'Título',
    'Descrição',
    'Anexo ',
  ];

  function createData(dateActual, title, description) {
    const date = moment(dateActual).format('DD-MM-YYYY');
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
      setAllAccount(auxAccount);
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

  return (
    <div>
      <TableComponent setUse={setUse} accountId={id} rows={account} titles={titles} archive1Id={archive1Id} order />
    </div>
  );
}

export default AccountQuery;
