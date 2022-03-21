/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import ptLocale from 'moment/locale/pt-br';
import * as managerService from '../../services/manager/managerService';
import backgroundImage from '../../images/martelin.png';
import { useAuth } from '../../providers/auth';
import 'react-toastify/dist/ReactToastify.css';
import ModalFailedLogin from '../../components/ModalFailedLogin/ModalFailedLogin';

moment.locale('pt-br', [ptLocale]);

const initialState = {
  user: '',
  rememberMe: false,
};

toast.configure();
function Login() {
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(initialState);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [contentWarningModal, setContentWarningModal] = useState('');
  const history = useHistory();
  const { setUser } = useAuth();

  const handleClickClose = () => {
    setShowWarningModal(false);
  };

  // const verifySecurity = async () => {
  //   const email = await managerService.getUserEmailByUsername(usuario.user);
  //   const field = {
  //     email: email,
  //     lock_time: moment(),
  //   };
  //   // await managerService.createAttempt(field);
  //   const res = await managerService.getAttempts(email);
  //   console.log('🚀 ~ file: Login.js ~ line 38 ~ verifySecurity ~ res', res);
  //   const attempts = res.quantity;
  //   console.log('🚀 ~ file: Login.js ~ line 40 ~ verifySecurity ~ attempts', attempts);
  //   if (attempts && attempts >= 3) {
  //     if (moment() > moment(res.lock_time)
  //       || res.email !== usuario?.email) {
  //       return true;
  //     }
  //     setShowWarningModal(true);
  //     // setContentWarningModal('após alguns minutos.');
  //     return false;
  //   }
  //   return true;
  // };

  const handleClick = async (e) => {
    setLoading(true);
    let res;
    let attempts;
    const email = await managerService.getUserEmailByUsername(usuario.user);
    const field = {
      email: email,
      lock_time: moment(),
    };
    res = await managerService.getAttempts(email);
    if (res === null) {
      res = await managerService.createAttempt(field);
      setShowWarningModal(false);
      attempts = 0;
    } else {
      attempts = res.quantity;
    }
    if (attempts > 2 && moment() < moment(res.lock_time)) {
      const restante = moment(res.lock_time).fromNow();
      setContentWarningModal(restante);
      setShowWarningModal(true);
    } else {
      setShowWarningModal(false);
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
        await managerService.deleteAttempts(email);
        history.push('/intranet');
      } catch (error) {
        toast.error('Credenciais inválidas!!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        if (attempts <= 1) {
          await managerService.updateAttempts(email);
        } else {
          switch (attempts) {
          case 2: {
            await managerService.updateAttempts(email);
            const time = moment().add(3, 'minutes');
            setContentWarningModal('após 3 minutos');
            await managerService.updateTime(email, time);
            setShowWarningModal(true);
            break;
          }
          case 3: {
            await managerService.updateAttempts(email);
            const time = moment().add(5, 'minutes');
            setContentWarningModal('após 5 minutos');
            await managerService.updateTime(email, time);
            setShowWarningModal(true);
            break;
          }
          case 4: {
            await managerService.updateAttempts(email);
            const time = moment().add(15, 'minutes');
            setContentWarningModal('após 15 minutos');
            await managerService.updateTime(email, time);
            setShowWarningModal(true);
            break;
          }
          case 5: {
            await managerService.updateAttempts(email);
            const time = moment().add(15, 'minutes');
            setContentWarningModal('após 15 minutos');
            await managerService.updateTime(email, time);
            setShowWarningModal(true);
            break;
          }
          default: {
            await managerService.updateAttempts(email);
            const time = moment().add(15, 'minutes');
            await managerService.updateTime(email, time);
            setShowWarningModal(true);
            break;
          }
          }
        }
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
