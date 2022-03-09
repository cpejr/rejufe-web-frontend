/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GraphicQuizzes from '../GraphicResultQuizzes/ResultadoQuizzes';
import './Quizzes.css';

function Quizzes({ quizz, associates }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="body">
      <div className="card">
        <button type="button" className="title-card" onClick={handleOpen}>
          <p>{quizz.title}</p>
          <KeyboardArrowDownIcon style={{ color: 'white' }} />
        </button>
      </div>
      {open === true ? (
        <div className="description-card">
          <p>{quizz.description}</p>
          <h1>
            {quizz.options.alternatives}
          </h1>
          <GraphicQuizzes
            toVote={quizz.toVote}
            associates={associates}
            quizz={quizz.options}
            alreadyVoted={quizz.alreadyVoted}
          />
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
