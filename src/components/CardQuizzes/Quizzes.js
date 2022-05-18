/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import { FormControl } from '@mui/material';
import { CircularProgress } from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmModal from '../confirmModal/ConfirmModal';
import GraphicQuizzes from '../GraphicResultQuizzes/GraphicResultQuizzes';
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
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(false);
  }, [quizz.alreadyVoted]);

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
      {(open === true && quizz.privateResult === false) || (open === true && quizz.privateResult === true && closingDate < dateQuizz) || (open === true && quizz.privateResult === true && quizz?.toVote?.includes(user?.id) && user?.type === 'usuario') ? (
        <div className="description-card-quizzes">
          <p>{quizz?.description}</p>
          {loading ? (
            <div className="form-vote-quizz-container">
              <CircularProgress />
            </div>
          ) : (
            <>
              {(closingDate < dateQuizz) || (quizz?.alreadyVoted?.includes(user?.id) || (user?.type === 'administrador')) ? (
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
                      alreadyVoted={quizz?.alreadyVoted}
                      setLoading={setLoading}
                    />
                  </FormControl>
                </div>
              )}
              <div />
            </>

          )}
        </div>
      ) : (open === true && quizz.privateResult === true && user?.type === 'administrador') ? (
        <div className="unavaible-result">
          <div className="line-table-registers" />
          <div className="unavaible-result-text">
            <span><AccessTimeIcon /></span>
            Resultado indisponível, aguardando finalização da enquete
          </div>
        </div>
      ) : (open === true && quizz.privateResult === true && user?.type === 'usuario') ? (
        <div className="unavaible-result">
          <div className="line-table-registers" />
          <div className="unavaible-result-text">
            <div className="line-table-registers" />
            <span><AccessTimeIcon /></span>
            Você já votou nessa enquete, resultado parcial indisponível no momento
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Quizzes;
