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

  function createData(sequential, names, cpfs, state) {
    return {
      sequential, names, cpfs, state,
    };
  }

  async function getAllAssociates() {
    let auxAssociate = [];
    try {
      const allAssociates = await managerService.getAssociates();
      allAssociates.forEach((object) => {
        auxAssociate.push(createData(object.sequential_Id, object.name, object.cpf, object.status));
      });
      const associate = new Set(auxAssociate);
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
    'Status',
    'Nome',
    'Cpf',
  ];
  const rows = [
    associates,
  ];

  return (
    <div>
      <h1>Administração de Registros</h1>
      <TableComponent rows={rows} titles={titles} order />
    </div>
  );
}

export default AdministracaoRegistros;
