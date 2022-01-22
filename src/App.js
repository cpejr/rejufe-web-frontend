import React from 'react';
import Routes from "./routes";
import "./global.css";
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <div>
      <ToastProvider>
        <Routes></Routes>
      </ToastProvider>
    </div>
  );
}

export default App;
