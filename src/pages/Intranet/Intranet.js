import React, { useState } from 'react';
import MenuLateral from '../MenuLateral';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ListaComunicados from '../ListaComunicados/ListaComunicados';
import './Intranet.css';

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  return (
    <div>
      <div className="intranet-main-container">
        <div className="intranet-side-menu">
          <MenuLateral setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
        </div>
        {selectedButton === 'Comunicados' ? (
          <div className="intranet-dashboad-quizzes">
            <ListaComunicados />
          </div>
        ) : (
          <div />
        )}
      </div>
      <div>
        <BottomMenu />
      </div>
    </div>
  );
}

export default Intranet;
