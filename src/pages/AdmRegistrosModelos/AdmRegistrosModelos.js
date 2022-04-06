import React, { useEffect, useState } from 'react';
import './AdmRegistrosModelos.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TableComponent from '../../components/dashboard/dashboardComponent';
import * as managerService from '../../services/manager/managerService';

const titles = [
  ' ',
  ' ',
  'Número',
  'Descrição',
  'Tipo',
  'Arquivo 1',
  'Arquivo 2',
];

toast.configure();

function AdmRegistrosNoticias() {
  const [modelos, setModelos] = useState([]);
  let rows = [];
  let sequentialIds = [];

  async function getAllModels() {
    try {
      const response = await managerService.getModels();
      setModelos(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível obter modelos', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    getAllModels();
  }, []);

  modelos?.forEach((modelo) => {
    sequentialIds = sequentialIds.concat([modelo?._id]);
    rows = rows.concat([{
      number: modelo?.numberModel,
      description: modelo?.description,
      tipo: modelo?.type,
      archive_1: modelo?.archive_1,
      archive_2: modelo?.archive_2,
    }]);
  });

  return (
    <div>
      <h1 className="titleAdministrationRecords"> Administração de Registros </h1>
      <div className="containerAdministrationRecords">
        <TableComponent rows={rows} titles={titles} modelsSequentialId={sequentialIds} />
      </div>
    </div>
  );
}

export default AdmRegistrosNoticias;
