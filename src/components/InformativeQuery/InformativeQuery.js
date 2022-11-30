import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './InformativeQuery.css';

function InformativeQuery() {
  const [informative, setAllInformatives] = useState([]);
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

  async function getAllInformatives() {
    setLoading(true);
    const auxInformative = [];
    const informativeId = [];
    const archive1Code = [];
    const archive2Code = [];

    try {
      const allInformatives = await managerService.getInformations();
      allInformatives.filter((account) => account.type === 'INFORMATIVO').forEach((object) => {
        auxInformative.push(createData(
          object.number,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      allInformatives.forEach((object) => {
        informativeId.push(createId(
          object._id,
        ));
      });
      auxInformative.sort();
      setId(informativeId);
      setAllInformatives(auxInformative);
      setArchive1Id(archive1Code);
      setArchive2Id(archive2Code);
      setUse(false);
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      toast.error('Não foi possível obter ações administrativas!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllInformatives();
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
        accountId={id}
        rows={informative}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        loading={loading}
      />
    </div>
  );
}

export default InformativeQuery;
