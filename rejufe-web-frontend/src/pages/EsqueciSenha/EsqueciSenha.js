import React from "react";
import "./esquecisenha.css"
import imagemFundo from "../../images/martelin.png";

function EsqueciSenha(){
    return (
        <div className="background" style={{backgroundImage: `url(${imagemFundo})`, backgroundSize: 'cover', width: '100vw', height: '100vh'}}>
           <div className="container">
           <img src="images/logoSemFundo.png" alt="Logo" />
           <h2> Redefinir Senha</h2>
           <p style={{ marginTop:'10px'}}> Informe cadastrado no REJUFE</p>
           <input type="text"></input>
           <button>Redefinir Senha</button>
           </div>
        </div>
    )
}

export default EsqueciSenha;