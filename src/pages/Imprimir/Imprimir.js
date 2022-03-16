import React from 'react';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { ComponentToPrint } from 'react-to-print';
import './Imprimir.css';

function Imprimir() {
  const handlePrint = () => {
    <ComponentToPrint />;
  };
  return (
    <div>
      <div className="header-print-icon">
        <button type="button" className="print-associates-button" onClick={handlePrint}>
          <PrintRoundedIcon sx={{ fontSize: 20, marginRight: 1 }} />
          Imprimir
        </button>
        <button type="button" className="return-print-associates-button">
          <BackspaceIcon sx={{ fontSize: 20, marginRight: 1 }} />
          Voltar
        </button>
      </div>
      <h1>Imprimir</h1>
    </div>
  );
}

export default Imprimir;
