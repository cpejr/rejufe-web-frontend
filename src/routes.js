import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EsqueciSenha from './pages/EsqueciSenha';
import ConsultaAssociados from './pages/ConsultaAssociados';
import FichaAssociados from './pages/FichaAssociados';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard/administrador" component={Dashboard} />
        <Route path="/dashboard/usuario" component={Dashboard} />
        <Route path="/redefinirSenha" component={EsqueciSenha} />
        <Route path="/ConsultaAssociados" component={ConsultaAssociados} />
        <Route path="/FichaAssociados" component={FichaAssociados} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
