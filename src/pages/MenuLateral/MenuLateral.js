import React from 'react';
import './MenuLateral.css';
import Button from '@mui/material/Button';

function MenuLateral() {
  return (
    <div>
      <body>
        <div className="menu">
          <ul>
            <Button variant="outlined">Home</Button>
            <Button variant="outlined">Editais</Button>
            <Button variant="outlined">Atas</Button>
            <Button variant="outlined">Associados</Button>
            <Button variant="outlined">Ações Jurídicas</Button>
            <Button variant="outlined">Prestação de Contas</Button>
            <Button variant="outlined">Aniversariantes</Button>
            <Button variant="outlined">Comunicados</Button>
            <Button variant="outlined">Informativos</Button>
            <Button variant="outlined">Fale Conosco</Button>

          </ul>
        </div>

      </body>
    </div>
  );
}

export default MenuLateral;
