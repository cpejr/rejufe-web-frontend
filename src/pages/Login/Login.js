/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
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
import StyledInput from '../../components/StyledInput/StyledInput';
import Loading from '../../components/Loading/Loading';

moment.locale('pt-br', [ptLocale]);

const initialState = {
  user: '',
  rememberMe: false,
};

toast.configure();
function Login() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [usuario, setUsuario] = useState(initialState);
  const [cpf, setCpf] = useState(initialState);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [contentWarningModal, setContentWarningModal] = useState('');
  const { setUser } = useAuth();
  const history = useHistory();
  const [isBlocked, setIsBlocked] = useState(false);
  async function rememberMe() {
    try {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (userStorage?.rememberMe) {
        history.push('/intranet');
      }
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    rememberMe();
  }, []);

  // const handleChange = (value, field) => {
  //   setUsuario({ ...usuario, [field]: value });
  // };
  const handleChange = (value, field) => {
    if (/([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/.test(value)) {
    setCpf({ ...cpf, [field]: value });
   } else {
      setUsuario({ ...usuario, [field]: value });
             }
  };

  const handleClickClose = () => {
    setShowWarningModal(false);
  };
  const handleClick = async (e) => {
    try {
      setLoading(true);
      let res;
      let attempts;
      let email = '';
      if (usuario?.user !== '' && usuario?.cpf === undefined) {
        try {
          email = await managerService.getUserEmailByUsername(usuario?.user);
        } catch (error) {
          toast.error('Credenciais Inválidas!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        }
      }
      // if (usuario?.cpf !== undefined && usuario?.user === '') {
      //   try {
      //     email = await managerService.getUserEmailByCpf(usuario?.cpf);
      //   } catch (error) {
      //     toast.error('Credenciais Inválidas!', {
      //       position: toast.POSITION.TOP_RIGHT,
      //       autoClose: 5000,
      //     });
      //   }
      // }
      if (usuario?.cpf !== undefined && usuario?.user !== '') {
        toast.error('Insira somente seu CPF ou seu usuário!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        setLoading(false);
      }
      const field = {
        email,
        lock_time: moment(),
      };
      res = await managerService.getAttempts(email);
      if (Object.values(res).length === 0) {
        res = await managerService.createAttempt(field);
        setShowWarningModal(false);
        attempts = 0;
      } else {
        attempts = res?.quantity;
      }
      if (moment() < moment(res?.lock_time)) {
        const restante = moment(res?.lock_time).fromNow();
        setContentWarningModal(restante);
        setShowWarningModal(true);
      } else {
        setShowWarningModal(false);
        try {
          e.preventDefault();
          const body = {
            email,
            password: usuario?.password,
            rememberMe: usuario?.rememberMe,
          };
          await managerService.login(body);
          const response = await managerService.login(body);
          const id = response?.data?.user?._id;
          setUser({
            name: response?.data?.user?.name,
            email: response?.data?.user?.email,
            type: response?.data?.user?.type,
            acessToken: response?.data?.accessToken,
            id,
          });
          await managerService.resetAttempts(email);
          if (response !== {}) {
              window.location.href = '/intranet';
          }
        } catch (error) {
          setShowWarningModal(true);
          setLoading(false);
          if (email !== undefined) {
            if (attempts <= 1) {
              const time = moment();
              await managerService.updateTime(email, time);
            } else {
              switch (attempts) {
                case 2: {
                  const time = moment().add(1, 'minutes');
                  setContentWarningModal('após 3 minutos');
                  await managerService.updateTime(email, time);
                  setIsBlocked(true);
                  setShowWarningModal(true);
                  break;
                }
                case 3: {
                  const time = moment().add(1, 'minutes');
                  setContentWarningModal('após 5 minutos');
                  await managerService.updateTime(email, time);
                  setShowWarningModal(true);
                  setIsBlocked(true);
                  break;
                }
                default: {
                  const time = moment().add(2, 'minutes');
                  setContentWarningModal('após 15 minutos');
                  await managerService.updateTime(email, time);
                  setShowWarningModal(true);
                  setIsBlocked(true);
                  break;
                }
              }
            }
          }
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error('Usuário inválido!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setLoading(false);
      setIsBlocked(false);
    }
  };

  return (
    <div>
      {pageLoading ? (
        <Loading />
      ) : (
        <div
          className="container-login"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <div className="campo-login">
            <div className="Box-login">
              <div className="text-login">
                <img src="images/logoSemFundo.png" alt="Logo" />
                <h1>CPF ou Usuário </h1>
                <StyledInput
                  type="text"
                  id="user"
                  dados={usuario}
                  setDados={handleChange}
                />

                <h1>Senha </h1>
                <StyledInput
                  type="password"
                  id="password"
                  label=""
                  width="100%"
                  height="6vh"
                  dados={usuario}
                  setDados={handleChange}
                  handleClick={handleClick}
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
                <button id="LoginButton" className="container-login-button" type="button" onClick={handleClick}>
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
                isBlocked={isBlocked}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
