import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './MenuLateral.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import * as managerService from '../../services/manager/managerService';

const buttons = [
  { buttonName: 'Home' },
  { buttonName: 'Editais' },
  { buttonName: 'Atas' },
  { buttonName: 'Associados' },
  { buttonName: 'Ações Adm' },
  { buttonName: 'Ações Jurídicas' },
  { buttonName: 'Prestação de Contas' },
  { buttonName: 'Aniversariantes' },
  { buttonName: 'Comunicados' },
  { buttonName: 'Informativos' },
  { buttonName: 'Enquetes' },
  { buttonName: 'Fale Conosco' },
];

const theme = createTheme({
  palette: {
    secondary: {
      main: '#264A6F',
    },
  },
});

toast.configure();

function renderPage(selectedButton) {
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
  return (
    <div>
      Selecione uma das opções ao lado
    </div>
  );
}

function MenuLateral() {
  const [selectedButton, setSelectedButton] = useState('Home');

  const defineBackgroundColor = (buttonType) => (selectedButton === buttonType
    ? 'menuSideClickButton'
    : 'menuSideGrupButton');

  return (
    <Box>
      <div className="menuSidepage">
        <div className="menuSideContainer">
          <ThemeProvider theme={theme}>
            <ButtonGroup
              className="menuSideAll"
              size="large"
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="text"
              color="secondary"
            >

              {buttons.map((button) => (
                <Button key={`${button.buttonName}`} className={defineBackgroundColor(button.buttonName)} onClick={() => setSelectedButton(button.buttonName)}>{button.buttonName}</Button>
              ))}
            </ButtonGroup>
          </ThemeProvider>
        </div>
        <div className="boxRenderPage">
          {renderPage(selectedButton)}
        </div>
      </div>
    </Box>
  );
}

export default MenuLateral;
