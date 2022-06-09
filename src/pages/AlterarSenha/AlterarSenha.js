import React, { useState } from 'react';
import './AlterarSenha.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from '@material-ui/core';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';

function ChangePassword() {
  const [open, setOpen] = useState(false);
  const { email } = JSON.parse(localStorage.getItem('user'));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();
  const JSONToSend = JSON.stringify({ email });

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await managerService.sendResetEmail(JSONToSend);
      history.push('/login');
      toast.success('Email enviado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } catch {
      toast.error('Email não cadastrado!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="containerChangePassword">
      <div className="boxChangePassword">
        <div className="change-password-text">
          <h1>Alterar Senha</h1>
          <p>
            Clique no botão abaixo para que um link seja enviado para o seu
            email com os dados de alteração de senha.
          </p>
        </div>
        <div className="change-passowrd-button">
          <button type="submit" onClick={handleOpen}>Enviar</button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} className="modalStyleChangePassword">
        <div className="popUpChangePassword">
          <div className="textoPopUpChangePassword">
            <h1>Recuperação de senha</h1>
            <p>Você tem certeza que deseja enviar um email para recuperação de senha?</p>
          </div>
          <div className="grupoButtonsChangePassword">
            <button type="submit" onClick={handleClick}>Enviar</button>
            <button type="submit" onClick={handleClose}>Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChangePassword;
