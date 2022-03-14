import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import {
  FormControl, Button,
} from '@mui/material';
import GraphicQuizzes from '../GraphicResultQuizzes/ResultadoQuizzes';
import './Quizzes.css';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

function Quizzes({ quizz, associates, dateQuizz }) {
  const alreadyVoted = [];
  const toVote = [];
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  console.log(quizz);
  const openingDate = moment(quizz?.openingDate).format('YYYY-MM-DD');
  const closingDate = moment(quizz?.closingDate).format('YYYY-MM-DD');
  // const [selectedValue, setSelectedValue] = useState('');

  // const handleChange = (e) => {
  //   setSelectedValue(e.target.value);
  // };

  return (
    <div className="body-quizzes-card">
      <div className="card-quizzes">
        <button type="button" className="title-card-quizzes" onClick={handleOpen}>
          <p>
            {quizz?.title}
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
          <p>{quizz?.description}</p>
          {closingDate < dateQuizz ? (
            <GraphicQuizzes
              toVote={toVote}
              associates={associates}
              quizz={quizz?.options}
              alreadyVoted={alreadyVoted}
            />
          ) : (
            <div className="form-vote-quizz-container">
              <div className="empty-div-vote-quizzes" />
              <FormControl className="form-vote-quizzes-alternatives">
                <h2>alternativas</h2>
                {quizz?.options?.map((option) => (
                  <Button>{option.description}</Button>
                ))}
                <ConfirmModal />
              </FormControl>
              <div className="empty-div-vote-quizzes" />
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
