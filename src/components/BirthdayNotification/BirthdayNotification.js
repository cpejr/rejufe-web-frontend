import React, { useEffect, useState } from 'react';
import './BirthdayNotification.css';
import '../../global.css';
import Modal from '@material-ui/core/Modal';
// import axios from 'axios';
import { toast } from 'react-toastify';
import LottieControl from './BirthdayAnimation';
import * as managerService from '../../services/manager/managerService';

toast.configure();

export default function BirthdayNotificationModal() {
  const [birthdaysUsers, setBirthdayUsers] = useState();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  async function sendEmail() {
    try {
      await managerService.sendBirthdayEmail();
      toast.success('Email enviado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setOpen(false);
    } catch {
      toast.error('Email não cadastrado!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setOpen(false);
    }
  }

  async function getBirthdayUsers() {
    try {
      const response = await managerService.getTodayBirthday();
      setBirthdayUsers(response);
    } catch (error) {
      toast.error('Não foi possível obter aniversariantes!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    getBirthdayUsers();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className="birthday-modal-box">
        <div className="birthday-modal-box-content">
          <div className="birthday-animation">
            <LottieControl
              width={120}
              height={120}
            />
          </div>
          <div className="birthday-central-box">
            <div className="birthday-central-box-title">
              <h1>Aniversariantes de hoje:</h1>
            </div>
            <div className="users-birthday">
              {(birthdaysUsers !== undefined && birthdaysUsers !== null)
                && birthdaysUsers.data.map((users) => {
                  const { name, email } = users;
                  const phoneNumber = users.cell_phone_number;
                  return (
                    <div className="users-birthday-ine">
                      <p>{name}</p>
                      <p>{email}</p>
                      <p>{phoneNumber}</p>
                    </div>
                  );
                })}
            </div>
            <buttons>
              <button type="button" onClick={sendEmail}>Enviar Email</button>
              <button type="button" onClick={handleClose}>Fechar</button>
            </buttons>
          </div>
        </div>
      </div>
    </Modal>
  );
}
