/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import { CircularProgress, Modal } from '@mui/material';
import * as managerService from '../../services/manager/managerService';
import backgroundImage from '../../images/martelin.png';
import { useAuth } from '../../providers/auth';
import 'react-toastify/dist/ReactToastify.css';
import ModalFailedLogin from '../../components/ModalFailedLogin/ModalFailedLogin';

const initialState = {
  user: '',
  rememberMe: false,
};

toast.configure();
function Login() {
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(initialState);
  console.log('🚀 ~ file: Login.js ~ line 24 ~ Login ~ usuario', usuario);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [contentWarningModal, setContentWarningModal] = useState('');
  const history = useHistory();
  const { setUser } = useAuth();

  const handleClickClose = () => {
    setShowWarningModal(false);
  };

  const verifySecurity = async () => {
    const currentSecurityStatus = JSON.parse(localStorage.getItem('userSecurity'));
    if (currentSecurityStatus && currentSecurityStatus.attemptsNumber === 3) {
      if (moment() > moment(currentSecurityStatus.blockDate)
        || currentSecurityStatus.email !== usuario?.email) {
        localStorage.removeItem('userSecurity');
        return true;
      }
      setShowWarningModal(true);
      // setContentWarningModal('após alguns minutos.');
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    setLoading(true);
    let userStorage;
    if (await verifySecurity() === true) {
      const currentSecurityStatus = JSON.parse(localStorage.getItem('userSecurity'));
      const email = await managerService.getUserEmailByUsername(usuario.user);
      const attempts = managerService.getAttempts(email);
      console.log('🚀 ~ file: Login.js ~ line 53 ~ handleClick ~ currentSecurityStatus', currentSecurityStatus);
      try {
        e.preventDefault();
        const body = {
          email,
          password: usuario.password,
          rememberMe: usuario.rememberMe,
        };
        await managerService.login(body);
        const response = await managerService.login(body);
        const id = response.data.user._id;
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          type: response.data.user.type,
          acessToken: response.data.accessToken,
          id,
        });
        localStorage.removeItem('userSecurity');
      // history.push('/intranet');
      } catch (error) {
        toast.error('Credenciais inválidas!!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        if (!currentSecurityStatus || currentSecurityStatus?.user !== usuario.user) {
          await managerService.createAttempt(usuario.user);
          userStorage = {
            user: usuario.user,
            attemptsNumber: 1,
          };
          console.log('🚀 ~ file: Login.js ~ line 81 ~ handleClick ~ userStorage', userStorage);
        } else {
          switch (currentSecurityStatus.attemptsNumber) {
          case 2: {
            userStorage = {
              user: usuario.user,
              attemptsNumber: currentSecurityStatus.attemptsNumber + 1,
              blockDate: moment().add(3, 'minutes'),
            };
            setShowWarningModal(true);
            setContentWarningModal('após 3 minutos.');
            break;
          }
          case 3: {
            userStorage = {
              user: usuario.user,
              attemptsNumber: currentSecurityStatus.attemptsNumber + 1,
              blockDate: moment().add(5, 'minutes'),
            };
            setShowWarningModal(true);
            setContentWarningModal('após 5 minutos.');
            break;
          }
          case 4: {
            userStorage = {
              user: usuario.user,
              attemptsNumber: currentSecurityStatus.attemptsNumber + 1,
              blockDate: moment().add(15, 'minutes'),
            };
            setShowWarningModal(true);
            setContentWarningModal('após 15 minutos.');
            break;
          }
          default: {
            console.log(currentSecurityStatus.attemptsNumber);
            userStorage = {
              user: usuario.user,
              attemptsNumber: currentSecurityStatus.attemptsNumber + 1,
            };
          }
          }
        }
        localStorage.setItem('userSecurity', JSON.stringify(userStorage));
        setLoading(false);
      }
    }
    setLoading(false);
  };
  return (
    <div
      className="container-login"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div className="campo-login">
        <div className="Box-login">
          <div className="text-login">
            <img src="images/logoSemFundo.png" alt="Logo" />
            <h1>Usuário </h1>
            <input
              type="user"
              id="user"
              value={usuario.user}
              onChange={(e) => setUsuario({ ...usuario, user: e.target.value })}
            />
            <h1>Senha </h1>
            <input
              type="password"
              onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
            />

            <div className="Remember-Box">
              <input
                type="checkbox"
                onChange={(e) => setUsuario({ ...usuario, rememberMe: e.target.checked })}
                id="rememberMe"
                name="rememberMe"
                value={usuario.rememberMe}
              />
              <label htmlFor="rememberMe">Lembrar de mim</label>
            </div>
            <button type="button" onClick={handleClick}>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <p>Acessar</p>
              )}
            </button>
            <div className="Link-ForgottenPassword">
              <Link to="redefinirSenha">Esqueci Minha Senha</Link>
            </div>
          </div>
        </div>
        {showWarningModal && (
          <ModalFailedLogin
            content={contentWarningModal}
            close={handleClickClose}
            className="WarningModalLoginScreen"
          />
        )}
      </div>
    </div>
  );
}

export default Login;
