import React from 'react';
import './BottomMenu.css';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';

function BottomMenu() {
  return (
    <div className='containerBottomMenu'>
      <div className='boxBottomMenu'>
        <button type='button' className='buttonBottomMenu'>
          <GavelRoundedIcon className='iconBottomMenu' />
          Requerimentos Administrativos
        </button>

        <button type='button' className='buttonBottomMenu'>
          <FilePresentRoundedIcon className='iconBottomMenu' />
          Petições Iniciais
        </button>

        <button type='button' className='buttonBottomMenu'>
          <FeedRoundedIcon className='iconBottomMenu' />
          Jurisprudência
        </button>
      </div>
    </div>
  );
}

export default BottomMenu;
