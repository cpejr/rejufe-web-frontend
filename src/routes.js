import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import EditarAssociados from './pages/EditarAssociados';
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
import Footer from './components/Footer';
import MenuLateral from './pages/MenuLateral';
import ChangePassword from './pages/AlterarSenha';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function UserHeader() {
  return (
    <Header>
      <Switch>
        <PrivateRoute path="/cadastro" component={Cadastro} type="administrador" />
        <PrivateRoute path="/intranet" component={Intranet} type="usuario" />
        <PrivateRoute path="/administracao-registros" component={AdmRegistros} type="administrador" />
        <PrivateRoute path="/associados-excluidos" component={AssociadosExcluidos} type="administrador" />
        <PrivateRoute path="/consultas" component={Consultas} type="administrador" />
        <PrivateRoute path="/modulo-usuario" component={ModuloUsuarios} type="administrador" />
        <PrivateRoute path="/validar-socio" component={ValidarSocio} type="administrador" />
        <PrivateRoute path="/editais" component={Editais} type="administrador" />
        <PrivateRoute path="/atas" component={Atas} type="administrador" />
        <PrivateRoute path="/alteracoes-e-exclusoes" component={AlteracoesExclusoes} type="administrador" />
        <PrivateRoute path="/usuarios" component={ModuloUsuarios} type="administrador" />
        <PrivateRoute path="/menu-lateral" component={MenuLateral} type="administrador" />
        <PrivateRoute path="/alterar-senha" component={ChangePassword} type="administrador" />
        <PrivateRoute path="/editar-associados" component={EditarAssociados} type="administrador" />
        <Redirect to="/NotFound" />
      </Switch>
    </Header>
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro-externo" component={CadastroExterno} />
        <Route path="/redefinirSenha" component={EsqueciSenha} />
        <Route path="/NotFound" component={NotFound} />
        <Route path="/" component={UserHeader} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
