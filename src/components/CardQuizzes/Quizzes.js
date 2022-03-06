import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GraphicQuizzes from '../GraphicResultQuizzes/ResultadoQuizzes';
import './Quizzes.css';

function Quizzes() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="body">
      <div className="card">
        <button type="button" className="title-card" onClick={handleOpen}>
          <h1>Card Title</h1>
          <KeyboardArrowDownIcon style={{ color: 'white' }} />
        </button>
      </div>
      {open === true ? (
        <div className="description-card">
          <h1>
            É um fato conhecido de todos que um leitor se distrairá com o conteúdo de texto legível
            de uma página quando estiver examinando sua diagramação. A vantagem de usar Lorem Ipsum
            é que ele tem uma distribuição normal de letras, ao contrário de Conteúdo aqui, conteúdo
            aqui, fazendo com que ele tenha uma aparência similar a de um texto legível. Muitos
            softwares de publicação e editore
          </h1>
          <GraphicQuizzes />
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
