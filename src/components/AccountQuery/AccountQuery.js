import React, { useState, useEffect } from 'react';
import moment from 'moment';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './AccountQuery.css';

function AccountQuery() {
  const [account, setAllAccount] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const titles = [
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
    const auxAccount = [];
    const accountId = [];
    const archive1Code = [];

    try {
      const allAccounts = await managerService.getAccounts();
      allAccounts.forEach((object) => {
        auxAccount.push(createData(
          object.date,
          object.title,
          object.description,
        ));
        if (object.pdf !== '') {
          archive1Code.push(object.pdf);
        }
      });
      allAccounts.forEach((object) => {
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
      <div className="title-account-menu">
        <h1>
          {'Manutenção em Prestação de Contas '}
        </h1>
      </div>
      <div className="line-table-account" />
      <TableComponent setUse={setUse} accountId={id} rows={account} titles={titles} archive1Id={archive1Id} />
    </div>
  );
}

export default AccountQuery;
