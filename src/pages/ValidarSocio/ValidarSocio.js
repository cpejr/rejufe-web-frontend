import React, { useState, useEffect } from 'react';
import './ValidarSocio.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function ValidarSocio() {
  const [associates, setAllAssociates] = useState([]);
  const [data, setAllData] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);

  function createData(name, cpf, status) {
    return {
      name, cpf, status,
    };
  }

  async function getAllAssociates() {
    const auxData = [];
    const auxAssociate = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getExternalAssociates();
      allAssociates.forEach((object) => {
        associateId.push(object._id);
        auxAssociate.push(createData(object.name, object.cpf, object.status));
        auxData.push(object);
      });
      auxAssociate.sort();
      setId(associateId);
      setAllAssociates(auxAssociate);
      setAllData(auxData);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  useEffect(() => {
    getAllAssociates();
  }, [use]);

  const titles = [
    '',
    'Nome',
    'Cpf',
    'Status',
  ];

  return (
    <div className="container-administration">
      <TableComponent setUse={setUse} dados={data} associateId={id} rows={associates} titles={titles} validate />
    </div>
  );
}

export default ValidarSocio;
