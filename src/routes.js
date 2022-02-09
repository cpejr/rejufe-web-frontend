import React from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EsqueciSenha from "./pages/EsqueciSenha";
import Cadastro from "./pages/Cadastro";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/dashboard/administrador" component={Dashboard} />
                <Route path="/dashboard/usuario" component={Dashboard} />
                <Route path="/redefinirSenha" component={EsqueciSenha} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
