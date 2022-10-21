/* eslint-disable max-len */
import React from 'react';
import './ModalFailedLogin.css';

function ModalFailedLogin({ close, content, isBlocked }) {
  // console.log(isBlocked);
  const phrase = isBlocked ? `Devido a sucessivas tentativas de login falhas essa conta foi bloqueada temporariamente, tente novamente ${content}` : 'Prezado(a) usuário, a sua conta será bloqueada temporariamente caso erre suas credenciais de login por 3 vezes seguidas';
  return (
    <div className="ModalFailedLogin">
      <div className="ModalFailedLoginContainer">
        <div className="ModalFailedLoginContainerInside">
          <h2>Aviso</h2>
          <div className="ModalFailedLoginContent">
            <b>{phrase}</b>
          </div>
          <div className="ModalFailedLoginCloseDiv">
            <button type="button" className="ModalFailedLoginCloseButton" onClick={close}>Entendi</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ModalFailedLogin;
