import React, { useState, useEffect } from 'react';
import './AdmRegistrosModelos.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdmRegistrosModelos() {
  const [models, setAllModels] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();

  function createData(numberModels, description, type) {
    return {
      numberModels, description, type,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllModels() {
    const auxModels = [];
    const sequentialIds = [];
    const archive1Code = [];
    const archive2Code = [];
    try {
      const allModels = await managerService.getModels();
      const values = [...allModels];
      values.forEach((object) => {
        auxModels.push(createData(
          object.numberModels,
          object.description,
          object.type,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      values.forEach((object) => {
        sequentialIds.push(createId(
          object._id,
        ));
      });
      setId(sequentialIds);
      setAllModels(auxModels);
      setArchive1Id(archive1Code);
      setId(sequentialIds);
      setArchive2Id(archive2Code);
      setUse(false);
    } catch (error) {
      toast.error('Não foi possível obter modelos!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    getAllModels();
  }, [use]);

  const titles = [
    ' ',
    'Número',
    'Descrição',
    'Tipo',
    'Arquivo 1',
    'Arquivo 2',
  ];

  return (
    <div className="container-administration-register">
      <div className="title-adm-registers">
        <h1>
          {'Manutenção em Modelos '}
        </h1>
      </div>
      <div className="line-table-registers" />
      <TableComponent
        setUse={setUse}
        rows={models}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        modelsSequentialId={id}
      />
    </div>
  );
}

export default AdmRegistrosModelos;
