import React from 'react';
import './Consultas.css';

function Consultas() {
  const handleWindowOpen = () => {
    window.open('/imprimir');
  };
  return (
    <div>
      <h1>Consultas</h1>
      <button
        type="button"
        className="open-window-button-consults"
        onClick={handleWindowOpen}
      >
        Imprimir
      </button>
    </div>
  );
}

export default Consultas;
