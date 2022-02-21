import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EsqueciSenha from './pages/EsqueciSenha';
import Header from './pages/Header';
import Intranet from './pages/Intranet';
import Cadastro from './pages/Cadastro';
import CadastroExterno from './pages/CadastroExterno';
import AdmRegistros from './pages/AdmRegistros';
import AssociadosExcluidos from './pages/AssociadosExcluidos';
import Consultas from './pages/Consultas';
import ValidarSocio from './pages/ValidarSocio';
import Editais from './pages/Editais';
import Atas from './pages/Atas';
import AlteracoesExclusoes from './pages/AlteracoesExclusoes';
import ModuloUsuarios from './pages/ModuloUsuarios';
import AlterarSenha from './pages/AlterarSenha';

function UserHeader() {
  return (
    <Header>
      <Switch>
        <Route path="/dashboard/usuario" component={Dashboard} />
        <Route path="/dashboard/administrador" component={Dashboard} />
        <Route path="/intranet" component={Intranet} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/adm-registros" component={AdmRegistros} />
        <Route path="/associados-excluidos" component={AssociadosExcluidos} />
        <Route path="/consultas" component={Consultas} />
        <Route path="/validar-socio" component={ValidarSocio} />
        <Route path="/editais" component={Editais} />
        <Route path="/atas" component={Atas} />
        <Route path="/alteracoes-e-exclusoes" component={AlteracoesExclusoes} />
        <Route path="/usuarios" component={ModuloUsuarios} />
        <Route path="/alterar-senha" component={AlterarSenha} />
      </Switch>
    </Header>
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/cadastro-externo" component={CadastroExterno} />
        <Route path="/dashboard/administrador" component={Dashboard} />
        <Route path="/dashboard/usuario" component={Dashboard} />
        <Route path="/redefinirSenha" component={EsqueciSenha} />
        <Route path="/" component={UserHeader} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
