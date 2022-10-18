/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import ptLocale from 'moment/locale/pt-br';
import { Chart } from 'react-google-charts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import {
  FormControl, useMediaQuery,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CircularProgress } from '@material-ui/core';
import { useAuth } from '../../providers/auth';
import * as managerService from '../../services/manager/managerService';
import Quizzes from '../../components/CardQuizzes/Quizzes';
import ConfirmModal from '../../components/confirmModal/ConfirmModal';
import DateQuizzes from '../../components/DateQuizzes/DateQuizzes';
import GraphicQuizzes from '../../components/GraphicResultQuizzes/GraphicResultQuizzes';
import getQuizzesById from '../../components/getQuizzesById/getQuizzesById';
import ModalEnquete from '../../components/Enquetes/modalEnquetes';
import './FichaEnquete.css';

moment.locale('pt-br', [ptLocale]);

function FichaEnquete() {
  const { user } = useAuth();
  const [newQuizz, setNewQuizz] = useState(false);
  const [associates, setAssociates] = useState([]);
  const history = useHistory();
  const [voted, setVoted] = useState();
  const [toVote, setToVote] = useState([]);
  const dateQuizz = moment(new Date()).format('YYYY-MM-DD, HH:mm');
  const [quizzs, setQuizz] = useState({});
  const [loading, setLoading] = useState();
  const [graphData, setGraphData] = useState([]);
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };

  console.log(quizzs);

  const matches = useMediaQuery('(max-width:411px)');

  const cellFontProps = {
    sx: matches
        && {
          display: 'none',
        },
  };

  const nowDate = moment(dateQuizz).format('YYYY-MM-DD');
  const nowHour = moment(dateQuizz).format('HH:mm');
  const openingDate = moment(quizzs?.openingDate).format('YYYY-MM-DD');
  const closingDate = moment(quizzs?.closingDate).format('YYYY-MM-DD');
  const openingHour = moment(quizzs?.openingDate).format('HH:mm');
  const closingHour = moment(quizzs?.closingDate).format('HH:mm');

  if (openingDate > nowDate || (openingDate === nowDate && openingHour >= nowHour)) {
    quizzs.status = 'Não iniciada';
  } else if (closingDate < nowDate || (closingDate === nowDate && closingHour <= nowHour)) {
    quizzs.status = 'Finalizada';
  } else {
    quizzs.status = 'Em andamento';
  }

  useEffect(() => {
    setLoading(false);
  }, [quizzs?.alreadyVoted]);

  const options = {
    title: 'Quizz',
    chartArea: { width: '50%', height: '100%' },
    vAxis: {
      title: 'Opções',
    },
  };

  useEffect(() => {
    getQuizzesById('634cc7a0ee02ea1c7569b02c', setQuizz);
  }, []);

  useEffect(() => {
    const alreadyVotedQuantity = quizzs?.alreadyVoteds?.length;
    const graphInfo = [['Opções', 'Votos', { role: 'annotation' }]];

    const Data = quizzs?.options?.reduce((acc, option) => {
      if (alreadyVotedQuantity) {
        const percentValue = 100 * (option.votes / alreadyVotedQuantity);
        // eslint-disable-next-line prefer-template
        const percent = (percentValue.toFixed(2) + '%').replace('.', ',');

        acc.push([option.description, option.votes, percent]);
      } else {
        acc.push([option.description, option.votes, '0.00%']);
      }

      return acc;
    }, graphInfo);

    setGraphData(Data);
  }, [quizzs]);

  async function getAllAQuizzes() {
    try {
      const response = await managerService.getQuizzes(dateQuizz);
      const allAssociates = await managerService.getAssociates();
      setAssociates(allAssociates);
      setQuizz(response);
      setLoading(false);
    } catch (error) {
      history.push('/NotFound');
      toast.error('Não foi possível obter quizzes!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  async function getToVoteQuizzes() {
    try {
      const response = await managerService.getToVoteQuizzes(user?.id, dateQuizz);
      setToVote(response);
      setLoading(false);
    } catch (error) {
      history.push('/NotFound');
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    if (user?.type === 'administrador') {
      getAllAQuizzes();
    } else {
      getToVoteQuizzes();
    }
  }, [voted, newQuizz]);

  return (
    <div className="report-quizzes">
      <div className="container-report-quizzes">
        <div className="title-report-quizzes">DETALHES DA ENQUETE</div>
        <div className="alltitlequiz-report-quizzes">
          <div className="titlequiz-report-quizzes">Título</div>
          <div className="titleboxquiz-report-quizzes">{quizzs?.title}</div>
        </div>
        <div className="descriptionquiz-report-quizzes">Descrição</div>
        <div className="descriptionboxquiz-report-quizzes">{quizzs?.description}</div>
        <div className="chart-report-quizzes">Gráfico</div>
        <div className="content-report-quizzes">
          {quizzs?.options?.length ? (
            <Chart
              chartType="BarChart"
              width="100%"
              height="50%"
              data={graphData}
              options={options}
              legendToggle
            />
          ) : ''}
        </div>

        <div className="body-quizzes-card">

          <div className="card-quizzes">
            <button type="button" className="title-card-quizzes" onClick={handleOpen}>
              <p>
                {' '}
                {quizzs?.title}
              </p>
              <div className="tagg-status-quizz">
                <DateQuizzes status="init" />
              </div>
              <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} {...cellFontProps} />
            </button>
          </div>
          <div className="card-quizzes">
            <button type="button" className="title-card-quizzes" onClick={handleOpen}>
              <p>
                {' '}
                {quizzs?.title}
              </p>
              <div className="tagg-status-quizz">
                <DateQuizzes status="finished" />
              </div>
              <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} {...cellFontProps} />
            </button>
          </div>
          <div className="card-quizzes">
            <button type="button" className="title-card-quizzes" onClick={handleOpen}>
              <p>
                {' '}
                {quizzs?.title}
              </p>
              <div className="tagg-status-quizz">
                <DateQuizzes status="progress" />
              </div>
              <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} {...cellFontProps} />
            </button>
          </div>
          {(open === true && quizzs?.privateResult === false) || (open === true && quizzs?.privateResult === true && closingDate < dateQuizz) || (open === true && quizzs?.privateResult === true && quizzs?.toVote?.includes(user?.id) && user?.type === 'usuario') ? (
            <div className="description-card-quizzes">
              <p>{quizzs?.description}</p>
              {loading ? (
                <div className="form-vote-quizz-container">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {(closingDate < nowDate || (closingDate === nowDate && closingHour <= nowHour)) || (quizzs?.alreadyVoted?.includes(user?.id) || (user?.type === 'administrador')) ? (
                    <GraphicQuizzes
                      toVote={quizzs?.toVote}
                      associates={associates}
                      quizz={quizzs?.options}
                      alreadyVoted={quizzs?.alreadyVoted}
                      userType={user?.type}
                    />
                  ) : (
                    <div className="form-vote-quizz-container">
                      <FormControl className="form-content-vote-quizzes">
                        <h2>Alternativas</h2>
                        <ConfirmModal
                          quizz={quizzs}
                          userId={user?.id}
                          setVoted={setVoted}
                          alreadyVoted={quizzs?.alreadyVoted}
                          setLoading={setLoading}
                        />
                      </FormControl>
                    </div>
                  )}
                  <div />
                </>

              )}
            </div>
          ) : (open === true && quizzs?.privateResult === true && user?.type === 'administrador') ? (
            <div className="unavaible-result">
              <div className="line-table-registers" />
              <div className="unavaible-result-text">
                <span><AccessTimeIcon /></span>
                Resultado indisponível, aguardando finalização da enquete
              </div>
            </div>
          ) : (open === true && quizzs?.privateResult === true && user?.type === 'usuario') ? (
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

        <div className="container-cards-quizzes">
          <div className="filter-create-cards-quizzes">
            {user?.type === 'administrador' && (
            <ModalEnquete setNewQuizz={setNewQuizz} />
              )}
          </div>
          {loading ? (
            <div className="loader-cards-quizzes">
              <CircularProgress size={35} color="inherit" />
            </div>
            ) : (
              <>
                {user?.type === 'administrador' ? (
                  quizzs?.map((quizz) => (
                    <Quizzes
                      quizz={quizz}
                      associates={associates}
                      dateQuizz={dateQuizz}
                      user={user}
                      setVoted={setVoted}
                    />
                  ))
                ) : (
                  toVote?.map((quizz) => (
                    <Quizzes
                      quizz={quizz}
                      associates={associates}
                      dateQuizz={dateQuizz}
                      user={user}
                      setVoted={setVoted}
                    />
                ))
              )}
                <div />
              </>
          )}
        </div>
      </div>
    </div>

  );
}

export default FichaEnquete;
