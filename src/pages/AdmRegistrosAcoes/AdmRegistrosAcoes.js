/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import './AdmRegistrosAcoes.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdmRegistrosAcoes() {
  const [action, setAllActions] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();

  function createData(type, numberAction, description) {
    return {
      type, numberAction, description,
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
      const allAction = await managerService.getActions();
      allAction.forEach((object) => {
        auxAction.push(createData(
          object.type,
          object.numberAction,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      allAction.forEach((object) => {
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  useEffect(() => {
    getAllActions();
  }, [use]);

  const titles = [
    '',
    'Tipo',
    'Número',
    'Descrição',
    'Arquivo 1',
    'Arquivo 2',
  ];

  return (
    <div className="container-administration-register">
      <div className="title-adm-registers">
        <h1>
          {'Manutenção em Ações '}
        </h1>
      </div>
      <div className="line-table-registers" />
      <TableComponent
        setUse={setUse}
        actionId={id}
        rows={action}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        editActions
      />
    </div>
  );
}

export default AdmRegistrosAcoes;
