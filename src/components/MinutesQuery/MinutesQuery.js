import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './MinutesQuery.css';

function MinuteQuery() {
  const [minute, setAllMinutes] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();
  const titles = [
    '',
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

  async function getAllMinutes() {
    const auxMinute = [];
    const minuteId = [];
    const archive1Code = [];
    const archive2Code = [];

    try {
      const allMinutes = await managerService.getMinutes();
      allMinutes.filter((account) => account.type === 'ATAS').forEach((object) => {
        auxMinute.push(createData(
          object.number,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      allMinutes.forEach((object) => {
        minuteId.push(createId(
          object._id,
        ));
      });
      auxMinute.sort();
      setId(minuteId);
      setAllMinutes(auxMinute);
      setArchive1Id(archive1Code);
      setArchive2Id(archive2Code);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      toast.error('Não foi possível obter ações administrativas!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  useEffect(() => {
    getAllMinutes();
  }, [use]);

  return (
    <div>
      <div className="title-informative-adm-menu">
        <h1>
          {'Manutenção em Informativos '}
        </h1>
      </div>
      <div className="line-table-informative-adm-menu" />
      <TableComponent
        setUse={setUse}
        id={id}
        rows={minute}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        searchMinutes
        printButton
        route="/imprimir-atas"
      />
    </div>
  );
}

export default MinuteQuery;
