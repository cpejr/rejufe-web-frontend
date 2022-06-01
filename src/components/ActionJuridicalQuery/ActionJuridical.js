import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './ActionJuridical.css';

function ActionJuridical() {
  const [action, setAllActions] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();
  const [loading, setLoading] = useState(false);
  const titles = [
    'Número',
    'Descrição',
    'Arquivo 1',
    'Arquivo 2 ',
  ];

  function createData(number, description) {
    return {
      number, description,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllActions() {
    setLoading(true);
    const auxAction = [];
    const actionId = [];
    const archive1Code = [];
    const archive2Code = [];

    try {
      const allActions = await managerService.getActions();
      allActions.filter((account) => account.type === 'JUDICIAIS').forEach((object) => {
        auxAction.push(createData(
          object.numberAction,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      allActions.forEach((object) => {
        actionId.push(createId(
          object._id,
        ));
      });
      auxAction.sort();
      setId(actionId);
      setAllActions(auxAction);
      setArchive1Id(archive1Code);
      setArchive2Id(archive2Code);
      setUse(false);
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      toast.error('Não foi possível obter ações judiciais!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  useEffect(() => {
    getAllActions();
  }, [use]);

  return (
    <div>
      <div className="title-action-juridical-menu">
        <h1>
          {'Manutenção em Ações Judiciais '}
        </h1>
      </div>
      <div className="line-table-action-juridical-menu" />
      <TableComponent
        setUse={setUse}
        accountId={id}
        rows={action}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        loading={loading}
      />
    </div>
  );
}

export default ActionJuridical;
