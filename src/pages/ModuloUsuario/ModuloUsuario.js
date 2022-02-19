import React, { useEffect, useState } from 'react';
import './moduloUsuario.css';
import { toast } from 'react-toastify';
import TableComponent from '../../components/moduloUsuario/TableContainer';
import * as managerService from '../../services/manager/managerService';
import ModalUsuario from '../../components/moduloUsuario/modalUsuario/ModalUsuario';

toast.configure();

function ModuloUsuario() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await managerService.getAllUsers();
      console.log(response);
      setUsers(response);
      console.log(users);
    } catch (error) {
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const titles = [
    '',
    'status',
    'Usuário',
    'Login',
    'Email',
    'cpf',
  ];

  return (
    <div className="container-modulo">
      <h1>Módulo de Usuários</h1>
      <div className="module-buttons">
        <button className="button" type="button">Voltar</button>
        <ModalUsuario rows={users} />

      </div>
      <TableComponent users={users} titles={titles} edit order />
    </div>

  );
}

export default ModuloUsuario;
