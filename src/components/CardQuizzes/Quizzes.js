import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Quizzes.css';
import moment from 'moment';

function Quizzes({ quizz }) {
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
              ':  não iniciada'
            ) : (
              <>
                <div />
                {closingDate < dateQuizz ? (
                  ':  finalizada'
                ) : (
                  ':  em andamento'
                )}
              </>
            )}
          </p>
          <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} />
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
