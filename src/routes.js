import React from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EsqueciSenha from "./pages/EsqueciSenha";
import Header from "./pages/Header";
import Intranet from "./pages/Intranet";
import Cadastro from "./pages/Cadastro";
import AdmRegistros from "./pages/AdmRegistros";
import associadosExcluidos from "./pages/AssociadosExcluidos";
import Consultas from "./pages/Consultas";
import validarSocio from "./pages/ValidarSocio";
import Editais from "./pages/Editais";
import Atas from "./pages/Atas";
import alteracoesExclusoes from "./pages/AlteracoesExclusoes";
import moduloUsuarios from "./pages/ModuloUsuarios";
import alterarSenha from "./pages/AlterarSenha";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/redefinirSenha" component={EsqueciSenha} />
                <Route path="/" component={UserHeader} />
            </Switch>
        </BrowserRouter>
    )
}

function UserHeader(){
    return(
        <Header>
            <Switch>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/intranet" component={Intranet}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/admregistros" component={AdmRegistros}/>
                <Route path="/associadosexcluidos" component={associadosExcluidos}/>
                <Route path="/consultas" component={Consultas}/>
                <Route path="/validarsocio" component={validarSocio}/>
                <Route path="/editais" component={Editais}/>
                <Route path="/atas" component={Atas}/>
                <Route path="/alteracoeseexclusoes" component={alteracoesExclusoes}/>
                <Route path="/usuarios" component={moduloUsuarios}/>
                <Route path="/alterarsenha" component={alterarSenha}/>
            </Switch>
        </Header>
    )
}

export default Routes;