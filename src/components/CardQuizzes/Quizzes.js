/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GraphicQuizzes from '../GraphicResultQuizzes/ResultadoQuizzes';
import './Quizzes.css';

function Quizzes({ quizz }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="body">
      <div className="card">
        <button type="button" className="title-card" onClick={handleOpen}>
          <h1>{quizz.title}</h1>
          <KeyboardArrowDownIcon style={{ color: 'white' }} />
        </button>
      </div>
      {open === true ? (
        <div className="description-card">
          <h1>
            {quizz.options.alternatives}
          </h1>
          <GraphicQuizzes quizz={quizz.options} />
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
