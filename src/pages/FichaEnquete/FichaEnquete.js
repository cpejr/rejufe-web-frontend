import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { Redirect, useParams } from 'react-router-dom';
import getQuizzesById from '../../components/getQuizzesById/getQuizzesById';
import './FichaEnquete.css';
import ConfirmModal from '../../components/confirmModal/ConfirmModal';
import { useAuth } from '../../providers/auth';

function FichaEnquete() {
  const [quizz, setQuizz] = useState({});
  const [graphData, setGraphData] = useState([]);
  const { userId, quizzId } = useParams();
  const { user: loggedUser } = useAuth();

  const options = {
    title: 'Quizz',
    chartArea: { width: '50%', height: '100%' },
    vAxis: {
      title: 'Opções',
    },
  };

  useEffect(() => {
    getQuizzesById(quizzId, setQuizz);
  }, []);

  useEffect(() => {
    const alreadyVotedQuantity = quizz?.alreadyVoted?.length;
    const graphInfo = [['Opções', 'Votos', { role: 'annotation' }]];

    const Data = quizz?.options?.reduce((acc, option) => {
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
  }, [quizz]);

  if (loggedUser.id !== userId) return <Redirect to="/NotFound" />;

  return (
    <div className="report-quizzes">
      <div className="container-report-quizzes">
        <div className="title-report-quizzes">DETALHES DA ENQUETE</div>
        <div className="alltitlequiz-report-quizzes">
          <div className="titlequiz-report-quizzes">Título</div>
          <div className="titleboxquiz-report-quizzes">{quizz?.title}</div>
        </div>
        <div className="descriptionquiz-report-quizzes">Descrição</div>
        <div className="descriptionboxquiz-report-quizzes">{quizz?.description}</div>
        <div className="chart-report-quizzes">Alternativas</div>
        <div className="content-alternatives-quizzes">
          <ConfirmModal
            quizz={quizz}
            userId={userId}
          />
        </div>
        <div className="chart-report-quizzes">Gráfico</div>
        <div className="content-report-quizzes">
          {quizz?.options?.length ? (
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
      </div>
    </div>
  );
}

export default FichaEnquete;
