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
import CadastrarNoticias from './pages/CadastrarNoticias';
import CadastrarComunic from './pages/CadastrarComunic';
import CadastrarMinutes from './pages/CadastrarAtas/CadastrarAtas';
import CadastroExterno from './pages/CadastroExterno';
import CadastrarAcoes from './pages/CadastrarAcoes/CadastrarAcoes';
import AdmRegistros from './pages/AdmRegistros';
import AdmRegistrosNoticias from './pages/AdmRegistrosNoticias';
import AdmRegistrosComunic from './pages/AdmRegistrosComunic';
import AssociadosExcluidos from './pages/AssociadosExcluidos';
import ValidarSocio from './pages/ValidarSocio';
import Editais from './pages/Editais';
import AlteracoesExclusoes from './pages/AlteracoesExclusoes';
import ModuloUsuarios from './pages/ModuloUsuarios';
import ConsultaAssociados from './pages/ConsultaAssociados';
import ConsultasMinutes from './pages/ConsultasAtas';
import FichaAssociados from './pages/FichaAssociados';
import FichaMinutes from './pages/FichaAtas';
import Footer from './components/Footer';
import ChangePassword from './pages/AlterarSenha';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CadastroContas from './pages/CadastroPrestacaoContas/CadastroContas';
import CadastrarModelos from './pages/CadastrarModelos';
import AdmRegistrosModelos from './pages/AdmRegistrosModelos';
import ImprimirAssociados from './pages/ImprimirAssociados';
import ImprimirAtasEditais from './pages/ImprimirAtasEditais';
import AdmRegistrosContas from './pages/AdmRegistrosContas';

export function UserHeader() {
  return (
    <Header>
      <Switch>
        <PrivateRoute path="/cadastro" component={Cadastro} type="administrador" />
        <PrivateRoute path="/cadastrar-noticias" component={CadastrarNoticias} type="administrador" />
        <PrivateRoute path="/cadastrar-comunic" component={CadastrarComunic} type="administrador" />
        <PrivateRoute path="/cadastrar-atas" component={CadastrarMinutes} type="administrador" />
        <PrivateRoute path="/cadastrar-acoes" component={CadastrarAcoes} type="administrador" />
        <PrivateRoute path="/cadastrar-contas" component={CadastroContas} type="administrador" />
        <PrivateRoute path="/administracao-registros-noticias" component={AdmRegistrosNoticias} type="administrador" />
        <PrivateRoute path="/administracao-registros-comunic" component={AdmRegistrosComunic} type="administrador" />
        <PrivateRoute path="/intranet" component={Intranet} type="usuario" />
        <PrivateRoute path="/administracao-registros" component={AdmRegistros} type="administrador" />
        <PrivateRoute path="/consulta-associados" component={ConsultaAssociados} type="administrador" />
        <PrivateRoute path="/consulta-atas-e-editais" component={ConsultasMinutes} type="administrador" />
        <PrivateRoute path="/associados-excluidos" component={AssociadosExcluidos} type="administrador" />
        <PrivateRoute path="/ficha-associados" component={FichaAssociados} type="administrador" />
        <PrivateRoute path="/ficha-atas" component={FichaMinutes} type="administrador" />
        <PrivateRoute path="/modulo-usuario" component={ModuloUsuarios} type="administrador" />
        <PrivateRoute path="/validar-socio" component={ValidarSocio} type="administrador" />
        <PrivateRoute path="/editais" component={Editais} type="administrador" />
        <PrivateRoute path="/alteracoes-e-exclusoes" component={AlteracoesExclusoes} type="administrador" />
        <PrivateRoute path="/alterar-senha" component={ChangePassword} type="administrador" />
        <PrivateRoute path="/editar-associados" component={EditarAssociados} type="administrador" />
        <PrivateRoute path="/cadastrar-modelos" component={CadastrarModelos} type="administrador" />
        <PrivateRoute path="/administracao-registros-modelos" component={AdmRegistrosModelos} type="administrador" />
        <PrivateRoute path="/administracao-registros-contas" component={AdmRegistrosContas} type="administrador" />
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
        <Route path="/imprimir-associados" component={ImprimirAssociados} />
        <Route path="/imprimir-atas-editais" component={ImprimirAtasEditais} />
        <Route path="/" component={UserHeader} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
