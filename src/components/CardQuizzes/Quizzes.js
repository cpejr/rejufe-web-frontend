import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import { FormControl } from '@mui/material';
import ConfirmModal from '../confirmModal/ConfirmModal';
import GraphicQuizzes from '../GraphicResultQuizzes/GraficoQuizzes';
import './Quizzes.css';

function Quizzes({
  quizz, associates, dateQuizz, user, setVoted,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const openingDate = moment(quizz.openingDate).format('YYYY-MM-DD');
  const closingDate = moment(quizz.closingDate).format('YYYY-MM-DD');

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
        <div className="description-card-quizzes">
          <p>{quizz?.description}</p>
          {(closingDate < dateQuizz) || (quizz?.alreadyVoted?.includes(user?.id) || (user.type === 'administrador')) ? (
            <GraphicQuizzes
              toVote={quizz?.toVote}
              associates={associates}
              quizz={quizz?.options}
              alreadyVoted={quizz?.alreadyVoted}
              userType={user?.type}
            />
          ) : (
            <div className="form-vote-quizz-container">
              <FormControl className="form-content-vote-quizzes">
                <h2>Alternativas</h2>
                <ConfirmModal
                  quizz={quizz}
                  userId={user?.id}
                  setVoted={setVoted}
                />
              </FormControl>
            </div>
          )}
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
