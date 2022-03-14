import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import {
  FormControl, FormControlLabel, FormLabel, RadioGroup, Radio,
} from '@mui/material';
import GraphicQuizzes from '../GraphicResultQuizzes/ResultadoQuizzes';
import './Quizzes.css';

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
          {closingDate > dateQuizz ? (
            <GraphicQuizzes
              toVote={toVote}
              associates={associates}
              quizz={quizz?.options}
              alreadyVoted={alreadyVoted}
            />
          ) : (
            <>
              <h1>
                <FormControl>
                  <FormLabel id="-radio-buttons-group-label">Alternativas</FormLabel>
                  <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {quizz?.options?.map((option) => (
                      <FormControlLabel
                        value={option.description}
                        control={<Radio />}
                        label={option.description}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </h1>
              <div />
            </>
          )}
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
