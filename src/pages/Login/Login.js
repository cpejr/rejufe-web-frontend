/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import * as managerService from '../../services/manager/managerService';
import backgroundImage from '../../images/martelin.png';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  user: '',
  rememberMe: false,
};

toast.configure();
function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialState);
  const handleClick = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const email = await managerService.getUserEmailByUsername(user.user);
      const body = {
        email,
        password: user.password,
        rememberMe: user.rememberMe,
      };
      await managerService.login(body);
    } catch (error) {
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div
      className="container-login"
      style={{
        backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', width: '100vw', height: '100vh',
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
              value={user.user}
              onChange={(e) => setUser({ ...user, user: e.target.value })}
            />
            <h1>Senha </h1>
            <input
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <div className="Remember-Box">
              <input
                type="checkbox"
                onChange={(e) => setUser({ ...user, rememberMe: e.target.checked })}
                id="rememberMe"
                name="rememberMe"
                value={user.rememberMe}
              />
              <label htmlFor="rememberMe">Lembrar de mim</label>

            </div>

            <button type="button" onClick={handleClick}>
              {loading ? <CircularProgress size={24} color="inherit" /> : <p>Acessar</p>}
            </button>
            <div className="Link-ForgottenPassword">
              <Link to="redefinirSenha">Esqueci Minha Senha</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
