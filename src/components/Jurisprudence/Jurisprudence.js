import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableComponent from '../dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';
import './Jurisprudence.css';

function Jurisprudence() {
  const [model, setAllModels] = useState([]);
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
    return {
      number, description,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllModels() {
    const auxModel = [];
    const modelId = [];
    const archive1Code = [];
    const archive2Code = [];

    try {
      const allModels = await managerService.getModels();
      allModels.filter((models) => models.type === 'JURISPRUDÊNCIA').forEach((object) => {
        auxModel.push(createData(
          object.numberModels,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      allModels.forEach((object) => {
        modelId.push(createId(
          object._id,
        ));
      });
      auxModel.sort();
      setId(modelId);
      setAllModels(auxModel);
      setArchive1Id(archive1Code);
      setArchive2Id(archive2Code);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      toast.error('Não foi possível obter modelos de jurisprudência!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  useEffect(() => {
    getAllModels();
  }, [use]);

  return (
    <div>
      <div className="title-jurisprudence-bottom">
        <h1>
          {'Manutenção em Jurisprudência '}
        </h1>
      </div>
      <div className="line-table-jurisprudence-bottom" />
      <TableComponent
        setUse={setUse}
        accountId={id}
        rows={model}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
      />
    </div>
  );
}

export default Jurisprudence;
