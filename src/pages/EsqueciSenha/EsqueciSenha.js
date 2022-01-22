import React, {useState} from "react";
import "./esquecisenha.css";
import imagemFundo from "../../images/martelin.png";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as managerService from '../../services/manager/managerService';
<link href="https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu:wght@700&display=swap" rel="stylesheet"></link>

function EsqueciSenha(){
  const [email, setEmail] = useState('');
  const { addToast } = useToasts();
  const history = useHistory();
  function confirmarEmail(e) {
    setEmail(e.target.value);
  }
  const sendEmail = {
    email,
  };
  const JSONtoSend = JSON.stringify(sendEmail);
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await managerService.sendResetEmail(JSONtoSend);
      history.push('/login');
      addToast('Email enviado com sucesso!', { appearance: 'success' });
    } catch {
      addToast('Email não cadastrado!', { appearance: 'error' });
    }
  };
    return (
        <div className="background" style={{backgroundImage: `url(${imagemFundo})`, backgroundSize: 'cover', width: '100vw', height: '100vh'}}>
           <div className="container">
                <img src="images/logoSemFundo.png" alt="Logo" />
                <h2> Redefinir Senha</h2>
                <p style={{ marginTop:'10px'}}> Informe seu email cadastrado no REJUFE</p>
                <input type="text" name="email" required onChange={(e) => confirmarEmail(e)}></input>
                <button type="submit" onClick={handleClick}>Redefinir Senha</button>
           </div>
        </div>
    )
}

export default EsqueciSenha;