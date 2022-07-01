import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './AccountQuery.css';

function AccountQuery() {
  const [account, setAllAccount] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [loading, setLoading] = useState(false);
  const titles = [
    'Data',
    'Título',
    'Descrição',
    'Anexo ',
  ];

  function createData(dateActual, title, description) {
    const date = moment(dateActual).format('DD/MM/YYYY');
    return {
      date, title, description,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllAccounts() {
    setLoading(true);
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

        archive1Code.push(object.pdf);
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
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      toast.error('Não foi possível obter prestações de contas!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  useEffect(() => {
    getAllAccounts();
  }, [use]);

  return (
    <div>
      <div className="title-account-menu-side">
        <h1>
          {'Manutenção em Prestação de Contas '}
        </h1>
      </div>
      <div className="line-table-account-menu-side" />
      <TableComponent
        setUse={setUse}
        loading={loading}
        accountId={id}
        rows={account}
        titles={titles}
        archive1Id={archive1Id}
      />
    </div>
  );
}

export default AccountQuery;
