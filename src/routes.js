import React from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EsqueciSenha from "./pages/EsqueciSenha";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/dashboard/ADMINISTRADOR" component={Dashboard} />
                <Route path="/dashboard/USUÁRIO" component={Dashboard} />
                <Route path="/redefinirSenha" component={EsqueciSenha} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;