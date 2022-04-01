import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './contactUs.css';

toast.configure();

export default function renderPage(selectedButton) {
  const initialState = {
    name: '',
    email: '',
    message: '',
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleChange(event) {
    data[event.target.name] = event.target.value;
    setData(data);
  }

  async function emailSubmit(event) {
    event.preventDefault();
    try {
      const body = {
        name: data.name,
        email: data.email,
        message: data.message,
      };
      await managerService.contactUs(body);
      toast('Email enviado com sucesso!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/menu-lateral');
    } catch (error) {
      toast.error('Falha ao enviar email!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      setLoading(false);
    }
    setLoading(false);
  }

  if (selectedButton === 'Fale Conosco') {
    return (
      <div className="boxFormContactUs">
        <h1>Fale Conosco</h1>
        <input placeholder="Nome" name="name" onChange={handleChange} />
        <input placeholder="Email" name="email" onChange={handleChange} />
        <textarea placeholder="Mensagem" name="message" onChange={handleChange} />

        <div className="buttonGroupContactUs">
          <button type="button" loading={loading} className="sendButton" onClick={(e) => emailSubmit(e)}> Enviar </button>
        </div>
      </div>
    );
  }
  return null;
}