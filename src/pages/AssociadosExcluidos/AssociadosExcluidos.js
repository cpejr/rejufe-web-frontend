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
import RemoveModal from '../../components/RemoveModal/RemoveModal';

toast.configure();

function ExcludedAssociates() {
  const [associates, setAllAssociates] = useState([]);
  const [id, setId] = useState([]);

  function createData(status, name, cpf) {
    return {
      status, name, cpf,
    };
  }
  function createId(_id) {
    return _id;
  }

  async function getAllAssociates() {
    const auxAssociate = [];
    const AssociatesId = [];
    try {
      const allAssociates = await managerService.getExcludedAssociate('E');
      allAssociates.forEach((object) => {
        auxAssociate.push(createData(
          object.status,
          object.name,
          object.cpf,
        ));
      });
      allAssociates.forEach((object) => {
        AssociatesId.push(createId(
          object._id,
        ));
      });
      auxAssociate.sort();
      setId(AssociatesId);
      setAllAssociates(auxAssociate);
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
    'Status',
    'Nome',
    'Cpf',
  ];

  return (
    <div>
      <TableComponent associateId={id} rows={associates} titles={titles} edit />
    </div>
  );
}

export default ExcludedAssociates;
