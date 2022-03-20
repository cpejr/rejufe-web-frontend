import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import DashboardUsuario from './pages/DashboardUsuario';
import DashboardAdmin from './pages/DashboardAdmin';
import EditarAssociados from './pages/EditarAssociados';
import EsqueciSenha from './pages/EsqueciSenha';
import Header from './pages/Header';
import Intranet from './pages/Intranet';
import Cadastro from './pages/Cadastro';
import CadastrarNoticias from './pages/CadastrarNoticias';
import CadastroExterno from './pages/CadastroExterno';
import AdmRegistros from './pages/AdmRegistros';
import AdmRegistrosNoticias from './pages/AdmRegistrosNoticias';
import AssociadosExcluidos from './pages/AssociadosExcluidos';
import Consultas from './pages/Consultas';
import ValidarSocio from './pages/ValidarSocio';
import Editais from './pages/Editais';
import Atas from './pages/Atas';
import AlteracoesExclusoes from './pages/AlteracoesExclusoes';
import ModuloUsuarios from './pages/ModuloUsuarios';
import ResultadoQuizzes from './pages/ResultadoQuizzes';
import ConsultaAssociados from './pages/ConsultaAssociados';
import FichaAssociados from './pages/FichaAssociados';
import Footer from './components/Footer';
import MenuLateral from './pages/MenuLateral';
import ChangePassword from './pages/AlterarSenha';
import NotFound from './pages/NotFound';

export function UserHeader() {
  return (
    <Header>
      <Switch>
        <Route path="/dashboard/usuario" component={DashboardUsuario} />
        <Route path="/dashboard/administrador" component={DashboardAdmin} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/intranet" component={Intranet} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/cadastrar-noticias" component={CadastrarNoticias} />
        <Route path="/administracao-registros" component={AdmRegistros} />
        <Route path="/administracao-registros-noticias" component={AdmRegistrosNoticias} />
        <Route path="/associados-excluidos" component={AssociadosExcluidos} />
        <Route path="/consultas" component={Consultas} />
        <Route path="/validar-socio" component={ValidarSocio} />
        <Route path="/editais" component={Editais} />
        <Route path="/atas" component={Atas} />
        <Route path="/alteracoes-e-exclusoes" component={AlteracoesExclusoes} />
        <Route path="/usuarios" component={ModuloUsuarios} />
        <Route path="/consulta-associados" component={ConsultaAssociados} />
        <Route path="/menu-lateral" component={MenuLateral} />
        <Route path="/alterar-senha" component={ChangePassword} />
        <Route path="/editar-associados" component={EditarAssociados} />
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
        <Route path="/enquetes" component={ResultadoQuizzes} />
        <Route path="/redefinirSenha" component={EsqueciSenha} />
        <Route path="/ficha-associados" component={FichaAssociados} />
        <Route path="/modulo-usuario" component={ModuloUsuarios} />
        <Route path="/NotFound" component={NotFound} />
        {/* <Route path="/administracao-registros-noticia-editar" component={ModuloUsuarios} /> */}
        <Route path="/" component={UserHeader} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
