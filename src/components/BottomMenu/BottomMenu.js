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

function BottomMenu({ setSelectedButton, selectedButton }) {
  const defineBackgroundColor = (buttonType) => (selectedButton === buttonType
    ? 'buttonSelectedBottomMenu'
    : 'buttonBottomMenu');
  return (
    <div className="containerBottomMenu">
      <div className="boxBottomMenu">
        <div className="buttonsBottomMenu">
          <button type="button" key="buttonAdminRequirement" className={defineBackgroundColor('Requerimentos Administrativos')} onClick={() => setSelectedButton('Requerimentos Administrativos')}>
            <GavelRoundedIcon className="iconBottomMenu" />
            Requerimentos Administrativos
          </button>
          <button type="button" key="buttonPetitions" className={defineBackgroundColor('Petições')} onClick={() => setSelectedButton('Petições Iniciais')}>
            <FilePresentRoundedIcon className="iconBottomMenu" />
            Petições Iniciais
          </button>
          <button type="button" key="buttonJurisprudence" className={defineBackgroundColor('Jurisprudência')} onClick={() => setSelectedButton('Jurisprudência')}>
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
