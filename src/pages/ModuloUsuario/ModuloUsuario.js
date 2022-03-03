import React, { useEffect, useState } from 'react';
import './moduloUsuario.css';
import { toast } from 'react-toastify';
import TableComponent from '../../components/moduloUsuario/TableContainer';
import * as managerService from '../../services/manager/managerService';
import ModalUsuario from '../../components/moduloUsuario/modalUsuario/ModalUsuario';

toast.configure();

function ModuloUsuario() {
  const [users, setUsers] = useState([]);
  const [typeChanged, setTypeChanged] = useState(false);
  const getUsers = async () => {
    try {
      const response = await managerService.getAllUsers();
      setUsers(response);
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
    <div className="container-modulo">
      <h1>Módulo de Usuários</h1>
      <div className="module-buttons">
        <button className="button" type="button">Voltar</button>
        <ModalUsuario setTypeChanged={setTypeChanged} users={users} />

      </div>
      <TableComponent users={users} titles={titles} edit order />
    </div>

  );
}

export default ModuloUsuario;
