import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import backgroundImage from "../../images/martelin.png";

function Login(){



    return (
        <div className="Fundo" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', width: '100vw', height: '100vh'}}>
            <div className="Box">
                <img src="images/logoSemFundo.png" alt="Logo" />
                <p>Usuario *</p>
                <input type="text"></input>
                <p>Senha *</p>
                <input type="password"></input>
                <div className="link">
                <Link to="redefinirSenha">Esqueci Minha Senha</Link>
                </div>
                <button>Acessar</button>
            </div>
        </div>
    )
}

export default Login;