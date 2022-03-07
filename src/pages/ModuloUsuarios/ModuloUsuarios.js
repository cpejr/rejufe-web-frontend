import React, { useEffect, useState } from 'react';
import './moduloUsuario.css';
import { toast } from 'react-toastify';
import TableComponent from '../../components/moduloUsuario/TableContainer';
import * as managerService from '../../services/manager/managerService';

toast.configure();

function ModuloUsuarios() {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [typeChanged, setTypeChanged] = useState(false);

  function filterRows(value) {
    return value.type === 'administrador';
  }

  const getUsers = async () => {
    try {
      const response = await managerService.getAllUsers();
      setUsers(response);
      setRows(response?.filter(filterRows));
    } catch (error) {
      toast.error('Não foi possível obter usuários!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [typeChanged]);

  const titles = [
    '',
    'Status',
    'Usuário',
    'Seção',
    'Perfil',
    'Login',
    'Email',
    'Cpf',
  ];

  return (
    <div className="container-module">
      <div className="Title-module-page">
        <h1>Módulo de Usuários</h1>
      </div>
      <TableComponent setTypeChanged={setTypeChanged} rows={rows} users={users} titles={titles} order />
    </div>

  );
}

export default ModuloUsuarios;
