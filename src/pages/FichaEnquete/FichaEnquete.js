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
        <div className="alltitlequiz-report-quizzes">
          <div className="titlequiz-report-quizzes">Título</div>
          <div className="titleboxquiz-report-quizzes">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
        </div>
        <div className="descriptionquiz-report-quizzes">Descrição</div>
        <div className="descriptionboxquiz-report-quizzes">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys</div>
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
