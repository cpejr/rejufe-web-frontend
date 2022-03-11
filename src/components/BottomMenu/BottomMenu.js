import React from 'react';
import './BottomMenu.css';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import flagAlagoas from '../../images/flagAlagoas.png';
import flagCeara from '../../images/flagCeara.png';
import flagParaiba from '../../images/flagParaiba.png';
import flagPernambuco from '../../images/flagPernambuco.png';
import flagRioGrandeDoNorte from '../../images/flagRioGrandeDoNorte.png';
import flagSergipe from '../../images/flagSergipe.png';

function BottomMenu() {
  return (
    <div className="containerBottomMenu">
      <div className="boxBottomMenu">
        <div className="buttonsBottomMenu">
          <button type="button" className="buttonBottomMenu">
            <GavelRoundedIcon className="iconBottomMenu" />
            Requerimentos Administrativos
          </button>

          <button type="button" className="buttonBottomMenu">
            <FilePresentRoundedIcon className="iconBottomMenu" />
            Petições Iniciais
          </button>

          <button type="button" className="buttonBottomMenu">
            <FeedRoundedIcon className="iconBottomMenu" />
            Jurisprudência
          </button>
        </div>

        <div className="flagsBottomMenu">
          <img src={flagAlagoas} alt="Bandeira Alagoas" />
          <img src={flagPernambuco} alt="Bandeira Pernambuco" />
          <img src={flagCeara} alt="Bandeira Ceara" />
          <img src={flagParaiba} alt="Bandeira Paraiba" />
          <img src={flagRioGrandeDoNorte} alt="Bandeira RioGrandeDoNorte" />
          <img src={flagSergipe} alt="Bandeira Sergipe" />
        </div>
      </div>
    </div>
  );
}

export default BottomMenu;
