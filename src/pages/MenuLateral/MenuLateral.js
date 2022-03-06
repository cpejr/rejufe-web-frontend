import React, { useState } from 'react';
import './MenuLateral.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttonss = [
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
  { buttonName: 'Fale Conosco' },
];

const theme = createTheme({
  palette: {
    secondary: {
      main: '#264A6F',
    },
  },
});

function MenuLateral() {
  const [selectedButton, setSelectedButton] = useState('');

  const defineBackgroundColor = (buttonType) => (selectedButton === buttonType
    ? 'butaoo'
    : 'testee');

  return (
    <Box className="menu-lateral">
      <div>
        <div className="menu">
          <ThemeProvider theme={theme}>
            <ButtonGroup
              className="teste"
              size="large"
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="text"
              color="secondary"
            >

              {buttonss.map((button) => (
                <Button key={`${button.buttonName}`} className={defineBackgroundColor(button.buttonName)} onClick={() => setSelectedButton(button.buttonName)}>{button.buttonName}</Button>
              ))}

            </ButtonGroup>
          </ThemeProvider>
        </div>
      </div>
    </Box>
  );
}

export default MenuLateral;
