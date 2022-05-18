import React, { useEffect, useState } from 'react';
import './BirthdayNotification.css';
import '../../global.css';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import LottieControl from './BirthdayAnimation';

function sendEmail(email) {
  // eslint-disable-next-line
  console.log(email);
}

export default function BirthdayNotificationModal() {
  const [birthdaysUsers, setBirthdayUsers] = useState();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // eslint-disable-next-line
    console.log('entrou');
    axios
      .get('http://localhost:3333/usuario/getUsersByTodaysBirthday')
      .then((response) => setBirthdayUsers(response))
      .catch((error) => {
        // eslint-disable-next-line
        console.err(error);
        setOpen(false);
      });
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className="BirthdayModalBox">
        Aniversariantes de hoje:
        <div className="BirthdayCentralBox">

          <div className="BirthdayAnimation">
            <LottieControl
              width={100}
              height={100}
            />
          </div>
          <div className="UsersBirthday">
            {(birthdaysUsers !== undefined && birthdaysUsers !== null)
              ? birthdaysUsers.data.map((users) => {
                // eslint-disable-next-line
                console.log(birthdaysUsers);
                const { name, email } = users;
                return (
                  <div className="UsersBirthdayine">
                    <p>
                      Aniversário de
                      {' '}
                      {name}
                    </p>
                    <button type="button" onClick={() => sendEmail(email)}>
                      Enviar Email
                    </button>
                  </div>
                );
              })
              : setOpen(false)}
          </div>
        </div>
        <buttons>
          <button type="button" onClick={handleClose}>Enviar Email</button>
          <button type="button" onClick={handleClose}>Fechar</button>
        </buttons>
      </div>
    </Modal>
  );
}
