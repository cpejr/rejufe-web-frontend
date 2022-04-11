import React, { useState, useEffect } from 'react';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './ActionQuery.css';

function AccountQuery() {
  const [action, setAllActions] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();
  const titles = [
    'Número',
    'Descrição',
    'Arquivo 1',
    'Arquivo 2 ',
  ];

  function createData(number, description) {
    // let actualNumber = [];
    // let actualDescription = [];

    // if (type === 'ADMINISTRATIVAS') {
    //   actualNumber = number;
    //   actualDescription = description;
    // }
    return {
      number, description,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllActions() {
    const auxAction = [];
    const actionId = [];
    const archive1Code = [];
    const archive2Code = [];

    try {
      const allAccounts = await managerService.getActions();
      allAccounts.filter((account) => account.type === 'ADMINISTRATIVAS').forEach((object) => {
        auxAction.push(createData(
          object.numberAction,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      allAccounts.forEach((object) => {
        actionId.push(createId(
          object._id,
        ));
      });
      auxAction.sort();
      setId(actionId);
      setAllActions(auxAction);
      setArchive1Id(archive1Code);
      console.log('🚀 ~ file: ActionQuery.js ~ line 66 ~ getAllActions ~ archive1Code', archive1Code);
      setArchive2Id(archive2Code);
      console.log('🚀 ~ file: ActionQuery.js ~ line 68 ~ getAllActions ~ archive2Code', archive2Code);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  useEffect(() => {
    getAllActions();
  }, [use]);

  return (
    <div>
      <div className="title-account-menu">
        <h1>
          {'Manutenção em Ações Administrativas '}
        </h1>
      </div>
      <div className="line-table-account" />
      <TableComponent
        setUse={setUse}
        accountId={id}
        rows={action}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
      />
    </div>
  );
}

export default AccountQuery;
