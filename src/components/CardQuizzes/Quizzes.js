/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as managerService from '../../services/manager/managerService';
import GraphicQuizzes from '../GraphicResultQuizzes/ResultadoQuizzes';
import './Quizzes.css';

function Quizzes({ quizz }) {
  const [open, setOpen] = useState(false);
  const [names, setName] = useState([]);
  const handleOpen = () => {
    setOpen(!open);
  };

  const index = 0;

  async function getAssociatesToVote() {
    try {
      const allAssociates = await managerService.getById(quizz.toVote[index]);
      console.log('🚀 ~ file: Quizzes.js ~ line 21 ~ getAssociatesToVote ~ TOVOTE', index);
      setName(allAssociates.name);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }

  useEffect(() => {
    getAssociatesToVote();
  }, []);

  console.log(names);

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
          <GraphicQuizzes quizz={quizz.options} alreadyVoted={quizz.alreadyVoted} />
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
