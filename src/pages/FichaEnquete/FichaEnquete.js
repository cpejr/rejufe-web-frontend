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
    <div className="container-card-quizzes">
      <div className="title-card-quizzes">Título</div>
      <div className="description-card-quizzes">Descrição</div>
      <div className="content-card-quizzes">
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
  );
}

export default FichaEnquete;
