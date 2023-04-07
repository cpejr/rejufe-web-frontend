/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import { FormControl, useMediaQuery } from '@mui/material';
import { CircularProgress } from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmModal from '../confirmModal/ConfirmModal';
import DateQuizzes from '../DateQuizzes/DateQuizzes';
import RemoveQuizzModal from '../RemoveModal/RemoveQuizzModal';
import GraphicQuizzes from '../GraphicResultQuizzes/GraphicResultQuizzes';
import './Quizzes.css';

function Quizzes({
  quizz, dateQuizz, user, setVoted, filter, setDeletedQuizz,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const openingDate = moment(quizz?.openingDate);
  const closingDate = moment(quizz?.closingDate);

  const [loading, setLoading] = useState();

  if (openingDate.isAfter(dateQuizz)) quizz.status = 'Não iniciada';
  else if (closingDate.isBefore(dateQuizz)) quizz.status = 'Finalizada';
  else quizz.status = 'Em andamento';

  const matches = useMediaQuery('(max-width:411px)');

  const cellFontProps = {
    sx: matches
      && {
      display: 'none',
    },
  };

  useEffect(() => {
    setLoading(false);
  }, [quizz?.alreadyVoted]);

  return (
    <div className="body-quizzes-card">
      {filter !== 'Em andamento' && filter !== 'Finalizada' && quizz?.status === 'Não iniciada' && (
        <div className="card-quizzes">
          <button type="button" className="title-card-quizzes" onClick={handleOpen}>
            {user?.type === 'administrador' && (
              <RemoveQuizzModal id={quizz._id} setDeletedQuizz={setDeletedQuizz} />
            )}
            <p>
              {' '}
              {quizz?.title}
            </p>
            <div className="tagg-status-quizz">
              <DateQuizzes status="init" />
            </div>
            <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} {...cellFontProps} />
          </button>
        </div>
      )}
      {filter !== 'Em andamento' && filter !== 'Não iniciada' && quizz?.status === 'Finalizada' && (
        <div className="card-quizzes">
          <button type="button" className="title-card-quizzes" onClick={handleOpen}>
            {user?.type === 'administrador' && (
              <RemoveQuizzModal id={quizz._id} setDeletedQuizz={setDeletedQuizz} />
            )}
            <p>
              {' '}
              {quizz?.title}
            </p>
            <div className="tagg-status-quizz">
              <DateQuizzes status="finished" />
            </div>
            <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} {...cellFontProps} />
          </button>
        </div>
      )}
      {filter !== 'Finalizada' && filter !== 'Não iniciada' && quizz?.status === 'Em andamento' && (
      <div className="card-quizzes">
        <button type="button" className="title-card-quizzes" onClick={handleOpen}>
          {user?.type === 'administrador' && (
            <RemoveQuizzModal id={quizz._id} setDeletedQuizz={setDeletedQuizz} />
          )}
          <p>
            {' '}
            {quizz?.title}
          </p>
          <div className="tagg-status-quizz">
            <DateQuizzes status="progress" />
          </div>
          <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} {...cellFontProps} />
        </button>
      </div>
              )}
      {(open === true && quizz?.privateResult === false) || (open === true && quizz?.privateResult === true && closingDate.isBefore(dateQuizz)) || (open === true && quizz?.privateResult === true && quizz?.toVote?.includes(user?.id) && user?.type === 'usuario') ? (
        <div className="description-card-quizzes">
          <p>{quizz?.description}</p>
          {loading ? (
            <div className="form-vote-quizz-container">
              <CircularProgress />
            </div>
          ) : (
            <>
              {closingDate.isBefore(dateQuizz) || (quizz?.alreadyVoted?.includes(user?.id) || (user?.type === 'administrador')) ? (
                <GraphicQuizzes
                  {...quizz}
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
      ) : (open === true && quizz?.privateResult === true && user?.type === 'administrador') ? (
        <div className="unavaible-result">
          <div className="line-table-registers" />
          <div className="unavaible-result-text">
            <span><AccessTimeIcon /></span>
            Resultado indisponível, aguardando finalização da enquete
          </div>
        </div>
      ) : (open === true && quizz?.privateResult === true && user?.type === 'usuario') ? (
        <div className="unavaible-result">
          <div className="line-table-registers" />
          <div className="unavaible-result-text">
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
