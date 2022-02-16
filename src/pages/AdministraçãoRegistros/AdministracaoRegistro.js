import React, { useState, useEffect } from 'react';
import './administracaoregistro.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdministracaoRegistros() {
  const [associate, setAllAssociates] = useState([]);

  async function getAllAssociates() {
    try {
      const associates = await managerService.getAssociates();
      console.log(associates.data);
      setAllAssociates(associates.data);
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
    associate.status,
    associate.name,
    associate.cpf,
  ];

  return (
    <div>
      <h1>Administração de Registros</h1>
      {/* <TableComponent rows={rows} titles={titles} order /> */}
    </div>
  );
}

export default AdministracaoRegistros;
