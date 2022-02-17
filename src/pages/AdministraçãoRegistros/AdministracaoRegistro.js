import React, { useState, useEffect } from 'react';
import './administracaoregistro.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdministracaoRegistros() {
  const [associates, setAllAssociates] = useState([]);

  console.log("🚀 ~ file: AdministracaoRegistro.js ~ line 12 ~ AdministracaoRegistros ~ name", associates)

  function createData(sequentialId, name, cpf, status) {
    return {
      sequentialId, name, cpf, status,
    };
  }

  async function getAllAssociates() {
    const auxAssociate = [];
    try {
      const allAssociates = await managerService.getAssociates();
      allAssociates.forEach((object) => {
        auxAssociate.push(createData(object.sequential_Id, object.name, object.cpf, object.status));
      });
      console.log(auxAssociate);
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
    'Código',
    'Nome',
    'Cpf',
    'Status',
  ];

  return (
    <div className="container-administration">
      <h1>Manutenção em Associados</h1>
      <TableComponent rows={associates} titles={titles} order />
    </div>
  );
}

export default AdministracaoRegistros;
