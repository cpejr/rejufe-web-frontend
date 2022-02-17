import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './pages/Login';
import dashboard from './pages/Dashboard';
import esqueciSenha from './pages/EsqueciSenha';
import Header from './pages/Header';
import intranet from './pages/Intranet';
import cadastro from './pages/Cadastro';
import admRegistros from './pages/AdmRegistros';
import associadosExcluidos from './pages/AssociadosExcluidos';
import consultas from './pages/Consultas';
import validarSocio from './pages/ValidarSocio';
import editais from './pages/Editais';
import atas from './pages/Atas';
import alteracoesExclusoes from './pages/AlteracoesExclusoes';
import moduloUsuarios from './pages/ModuloUsuarios';
import alterarSenha from './pages/AlterarSenha';

function userHeader() {
  return (
    <Header>
      <Switch>
        <Route path="/dashboard/usuario" component={dashboard} />
        <Route path="/dashboard/administrador" component={dashboard} />
        <Route path="/intranet" component={intranet} />
        <Route path="/cadastro" component={cadastro} />
        <Route path="/adm-registros" component={admRegistros} />
        <Route path="/associados-excluidos" component={associadosExcluidos} />
        <Route path="/consultas" component={consultas} />
        <Route path="/validar-socio" component={validarSocio} />
        <Route path="/editais" component={editais} />
        <Route path="/atas" component={atas} />
        <Route path="/alteracoes-e-exclusoes" component={alteracoesExclusoes} />
        <Route path="/usuarios" component={moduloUsuarios} />
        <Route path="/alterar-senha" component={alterarSenha} />
      </Switch>
    </Header>
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/redefinirSenha" component={esqueciSenha} />
        <Route path="/" component={userHeader} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
