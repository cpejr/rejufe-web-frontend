import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
          <p>{quizz.title}</p>
          <KeyboardArrowDownIcon style={{ color: 'white' }} />
        </button>
      </div>
      {open === true ? (
        <div />
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
