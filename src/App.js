import React from 'react';
import Routes from "./routes";
import "./global.css";
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from './providers/auth';

function App() {
  return (
    <div>
      <AuthProvider>
      <ToastProvider>
        <Routes></Routes>
      </ToastProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
