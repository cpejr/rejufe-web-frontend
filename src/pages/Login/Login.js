import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import * as managerService from '../../services/manager/managerService';
import backgroundImage from "../../images/martelin.png";
import { useToasts } from 'react-toast-notifications';

const initialState = {
    rememberMe: false,
}
function Login() {
    const { addToast } = useToasts();
    const [user, setUser] = useState(initialState);
    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const email = await managerService.getUserEmailByUsername(user.user);
            const body = {
                email: email,
                password: user.password,
                rememberMe: user.rememberMe
            }
            await managerService.login(body);
        } catch (error) {
            addToast('Credenciais Inválidas!!', { appearance: 'error', autoDismiss: true });
        }
    };

    return (
        <div className="Background-login" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
            <div className="Box-login">
                <img src="images/logoSemFundo.png" alt="Logo" />
                <p>Usuário </p>
                <input type="user" id="user"
                    onChange={e => setUser({ ...user, user: e.target.value })} ></input>
                <p>Senha </p>
                <input type="password"
                    onChange={e => setUser({ ...user, password: e.target.value })}></input>

                <div className="Remember-Box">
                    <input type="checkbox"
                        onChange={e => setUser({ ...user, rememberMe: e.target.checked })}
                        id="rememberMe"
                        name="rememberMe" value={user.rememberMe} />
                    <label for="rememberMe">Lembrar de mim</label></div>

                <button type="button" onClick={handleClick}>Acessar</button>
                <div className="Link-ForgottenPassword">
                    <Link to="redefinirSenha">Esqueci Minha Senha</Link>
                </div>

            </div>
        </div>
    );
}


export default Login;
