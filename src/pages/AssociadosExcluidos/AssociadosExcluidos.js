/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './AssociadosExcluidos.css';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/ExcludedAssociates/ExcludedAssociates';
import { getExcludedAssociate } from '../../services/requester/requesterService';

toast.configure();

function ExcludedAssociates() {
  const [associates, setAllAssociates] = useState([]);
  const [sequentialId, setSequentialId] = useState([]);
  const [id, setId] = useState([]);

  const icones = [
    <EditIcon />,
    <DeleteIcon />,
  ];

  function createData(icones, status, sequentialId, name, cpf) {
    return {
      icones, status, sequentialId, name, cpf,
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
        auxAssociate.push(createData(
          icones,
          object.status,
          object.sequential_Id,
          object.name,
          object.cpf,
        ));
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
    getAllAssociates();
  }, []);

  const titles = [
    '',
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

export default ExcludedAssociates;
