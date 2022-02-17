import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { MuiThemeProvider, createTheme } from '@material-ui/core';
import Routes from './routes';
import './global.css';
import { AuthProvider } from './providers/auth';

const theme = createTheme({
  palette: {
    primary: '#264A6F',
    secondary: '#2F5C88',
    button: '#1C3854',
    hover: '#122438',
    color1: '#0b162b',
    header: '#081120',
    color2: '#3A404C',
    color3: '#616670',
    color4: '#81848C',
    // background: {
    //   color: '#ffffff',
    //   opacity: 0.6,
    // },
    fontColor1: '#000000',
    fontColor2: '#ffffff',
  },
});

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <AuthProvider>
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </AuthProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
