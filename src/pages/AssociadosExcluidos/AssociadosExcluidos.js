/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './AssociadosExcluidos.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/ExcludedAssociates/ExcludedAssociates';
import { getExcludedAssociate } from '../../services/requester/requesterService';

toast.configure();

function AdmRegistros() {
  const [associates, setAllAssociates] = useState([]);
  const [sequentialId, setSequentialId] = useState([]);
  const [id, setId] = useState([]);

  function createData(status, sequentialId, name, cpf) {
    return {
      status, sequentialId, name, cpf,
    };
  }

  async function getAllAssociates() {
    const auxAssociate = [];
    const associateCode = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getExcludedAssociate('A');
      console.log('🚀 ~ file: AssociadosExcluidos.js ~ line 29 ~ getAllAssociates ~ allAssociates', allAssociates);
      allAssociates.forEach((object) => {
        associateCode.push(object.sequential_Id);
        auxAssociate.push(createData(object.status, object.sequential_Id, object.name, object.cpf));
      });
      auxAssociate.sort();
      setId(associateId);
      setAllAssociates(auxAssociate);
      setSequentialId(associateCode);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  useEffect(() => {
    getExcludedAssociate('A');
  }, []);

  const titles = [
    '',
    'Status',
    'Código',
    'Nome',
    'Cpf',
  ];

  return (
    <div className="container-administration">
      <TableComponent sequentialId={sequentialId} rows={associates} titles={titles} order />
    </div>
  );
}

export default AdmRegistros;
