import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Routes from './routes';
import './global.css';
import { AuthProvider } from './providers/auth';

function App() {
  return (
    <div>
      <AuthProvider>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
