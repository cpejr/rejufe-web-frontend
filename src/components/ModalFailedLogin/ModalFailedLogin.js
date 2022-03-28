/* eslint-disable max-len */
import React from 'react';
import './ModalFailedLogin.css';

function ModalFailedLogin({ close, content }) {
  const phrase = `Devido a sucessivas tentativas de login falhas essa conta foi bloqueada temporariamente, tente novamente ${content}`;

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
