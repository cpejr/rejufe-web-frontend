import React from 'react';
import './Footer.css';
import logoCPEJr from '../../images/logoCPEJr.png';

export default function Footer() {
  return (
    <footer className="footerRejufeCPE">
      <div className="containerRejufeImageFooter">
        <div className="RejufeImageFooter">
          <img
            className="imageRejufeLogo"
            src="images/logoSemFundo.png"
            alt="logotipo Rejufe"
          />
        </div>
      </div>
      <div className="containerLogoAndTextCPE">
        <div className="logoAndTextCPE">
          <h1 className="textFooterCPE">Desenvolvido&nbsp;</h1>
          <h1 className="textFooterCPE">por</h1>
          <img className="imageCPEJrFooter" src={logoCPEJr} alt="Logo CPE" />
        </div>
      </div>
    </footer>
  );
}
