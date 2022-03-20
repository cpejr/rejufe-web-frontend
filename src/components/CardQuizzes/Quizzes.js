import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import GraphicQuizzes from '../GraphicResultQuizzes/ResultadoQuizzes';
import './Quizzes.css';

function Quizzes({ quizz, associates }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [date] = useState(new Date());
  const openingDate = moment(quizz.openingDate).format('YYYY-MM-DD');
  const closingDate = moment(quizz.closingDate).format('YYYY-MM-DD');
  const dateQuizz = moment(date).format('YYYY-MM-DD');

  return (
    <div className="body-quizzes-card">
      <div className="card-quizzes">
        <button type="button" className="title-card-quizzes" onClick={handleOpen}>
          <p>
            {quizz.title}
            {openingDate > dateQuizz ? (
              '  -  Não iniciada'
            ) : (
              <>
                <div />
                {closingDate < dateQuizz ? (
                  '  -  Finalizada'
                ) : (
                  '  -  Em andamento'
                )}
              </>
            )}
          </p>
          <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} />
        </button>
      </div>
      {open === true ? (
        <div className="description-card-quizzes">
          <p>{quizz.description}</p>
          <h1>
            {quizz.options.alternatives}
          </h1>
          <GraphicQuizzes
            toVote={quizz?.toVote}
            associates={associates}
            quizz={quizz?.options}
            alreadyVoted={quizz?.alreadyVoted}
          />
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
