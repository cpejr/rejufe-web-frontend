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
          <p>Card Title</p>
          <KeyboardArrowDownIcon style={{ color: 'white' }} />
        </button>
      </div>
      {open === true ? (
        <GraphicQuizzes />
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
