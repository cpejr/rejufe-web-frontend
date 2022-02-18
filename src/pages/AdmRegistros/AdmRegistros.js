import React, { useState, useEffect } from 'react';
import './AdmRegistros.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/BoxAdmRegister/BoxRegisterComponent';

toast.configure();

function AdmRegistros() {
  const [associates, setAllAssociates] = useState([]);
  const [code, setCode] = useState([]);
  const [id, setId] = useState([]);

  function createData(sequentialId, name, cpf, status) {
    return {
      sequentialId, name, cpf, status,
    };
  }

  async function getAllAssociates() {
    const auxAssociate = [];
    const associateCode = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getAssociates();
      allAssociates.forEach((object) => {
        associateCode.push(object.sequential_Id);
        auxAssociate.push(createData(object.sequential_Id, object.name, object.cpf, object.status));
      });
      auxAssociate.sort();
      setId(associateId);
      setAllAssociates(auxAssociate);
      setCode(associateCode);
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
    'Código',
    'Nome',
    'Cpf',
    'Status',
  ];

  return (
    <div className="container-administration">
      <TableComponent rowCode={code} rows={associates} titles={titles} order />
    </div>
  );
}

export default AdmRegistros;
