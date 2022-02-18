import React from 'react';
import './moduloUsuario.css';
import TableComponent from '../../components/moduloUsuario/TableContainer';
import ModalUsuario from '../../components/moduloUsuario/modalUsuario/ModalUsuario';

function ModuloUsuario() {
  function createData(ordem, icone, status, usuario, seção, perfil, login, email, cpf) {
    return {
      ordem, icone, status, usuario, seção, perfil, login, email, cpf,
    };
  }

  const rows = [
    createData(1, 'lixo', 'S', 'Adrian Soares Amorim de Freita', 'SJRN', 'S', 'adrian', 'adrian.freitas@@jfpb.jus.br', '70336326491'),
  ];

  const titles = [
    '',
    '',
    '',
    'status',
    'Usuário',
    'Seção',
    'Perfil',
    'Login',
    'Email',
    'cpf',
  ];

  return (
    <div className="container-modulo">
      <h1>Módulo de Usuários</h1>
      <div className="module-buttons">
        <button className="button" type="button">Voltar</button>
        <ModalUsuario rows={rows} />

      </div>
      <TableComponent rows={rows} titles={titles} />
    </div>

  );
}

export default ModuloUsuario;
