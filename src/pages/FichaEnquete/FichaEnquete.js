import React, {
// useEffect,
} from 'react';
import { Chart } from 'react-google-charts';
// import getQuizzesById from '../../components/getQuizzesById/getQuizzesById';
import './FichaEnquete.css';

function FichaEnquete() {
  const data = [
    ['Opções', 'Votos', { role: 'annotation' }],
  ];

  const votes = [];

  const options = {
    title: 'Quizz',
    chartArea: { width: '50%', height: '100%' },
    vAxis: {
      title: 'Opções',
    },
  };

  // useEffect(() => {
  //   getQuizzesById(quizzesId, setQuizzes);
  // }, []);

  return (
    <div className="report-quizzes">
      <div className="container-report-quizzes">
        <div className="title-report-quizzes">DETALHES DA ENQUETE</div>
        <div className="titlequiz-report-quizzes">Título</div>
        <div className="descriptionquiz-report-quizzes">Descrição</div>
        <div className="chart-report-quizzes">Gráfico</div>
        <div className="content-report-quizzes">
          {votes[1] !== undefined && (
            <Chart
              chartType="BarChart"
              width="100%"
              height="50%"
              data={data}
              options={options}
              legendToggle
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FichaEnquete;
