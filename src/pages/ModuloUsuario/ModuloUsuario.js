import React from 'react';
import './moduloUsuario.css';
import TableComponent from '../../components/ModuloUsuario/TableContainer/TableContainer';
import ModalAdmin from '../../components/ModuloUsuario/ModalUsuario/ModalUsuario';
// import AutocompleteMemberInput from '../../components/AutoCompleteMemberInput';

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
        <ModalAdmin />
        <button className="button" type="button">Voltar</button>
        {/* <AutocompleteMemberInput
          onChange={setMemberTextToLogin}
          value={memberTextToLogin}
          onMemberChange={(member) => (memberToLogin.current = member)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              handleLogin();
            }
          }}
        /> */}
      </div>
      <TableComponent rows={rows} titles={titles} />
    </div>

  );
}

export default ModuloUsuario;
