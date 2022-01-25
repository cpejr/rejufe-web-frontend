import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { login } from "../../services/requester/requesterService";
import { useState } from "react";
import * as managerService from '../../services/manager/managerService';
import backgroundImage from "../../images/martelin.png";

function Login() {
    const [user, setUser] = useState();
    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const email = await managerService.getUserEmailByUsername(user.user);
            const body = {
                email: email,
                password: user.password
            }
            console.log(body);
            await managerService.login(body);
        } catch (error) {
            alert("Credenciais Invalidas!");
        }
    };

    return (
        <div className="Background-login" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
            <div className="Box-login">
                <img src="images/logoSemFundo.png" alt="Logo" />
                <p>Usuario *</p>
                <input type="user"
                    onChange={e => setUser({ ...user, user: e.target.value })} ></input>
                <p>Senha *</p>
                <input type="password"
                    onChange={e => setUser({ ...user, password: e.target.value })}></input>
                <div className="link">
                    <Link to="redefinirSenha">Esqueci Minha Senha</Link>
                </div>
                <button type="button" onClick={handleClick}>Acessar</button>
                <div className="lembrarDeMim">
                    <input type="checkbox" id="lembrarDeMim" name="lembrarDeMim" value="lembrarDeMim" />
                    <label for="lembrarDeMim">Lembrar de mim</label>
                </div>
            </div>
        </div>
    );
}


export default Login;