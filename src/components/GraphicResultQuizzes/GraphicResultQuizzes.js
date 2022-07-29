import React from 'react';
import { Chart } from 'react-google-charts';
import TableComponent from '../dashboard/dashboardComponent';
import './GraphicResultQuizzes.css';

function GraphicQuizzes({
  toVote,
  quizz,
  alreadyVoted,
  associates,
  userType,
}) {
  const data = [
    ['Opções', 'Votos', { role: 'annotation' }],
  ];
  const titles = [
    '',
    'Faltam Votar',
  ];
  const user = [];
  const name = [];
  const votes = [];
  let index = 1;

  quizz?.forEach((option) => {
    const percentual = (option.votes / alreadyVoted.length);
    let changePercentual = (percentual * 100);
    changePercentual += '%';
    data[index] = [option.description, option.votes, changePercentual];
    votes[index] = option.votes;
    index += 1;
  });
  let count = 0;

  toVote?.forEach((_id) => {
    user[count] = associates?.filter((item) => item._id === _id);
    user[count]?.forEach((obj) => {
      name[count] = obj.name;
    });
    count += 1;
  });
  const names = name?.map((value) => ({
    name: value,
  }));

  const options = {
    title: 'Quizz',
    chartArea: { width: '50%', height: '100%' },
    vAxis: {
      title: 'Opções',
    },
  };

  return (
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
      {userType === 'administrador' && toVote.length > 0 && (
        <div>
          <div className="title-quizzes-already-voted">
            <h2>
              {'Faltam Votar '}
            </h2>
          </div>
          <div className="line-quizzes-already-voted" />
          <div className="content-table-quizzes">
            <TableComponent
              rows={names}
              titles={titles}
              order
              renderButton={false}
            />
          </div>
        </div>
      )}
      {toVote.length === 0 && (
        <div className="quizzes-already-voted">
          <p>Todas as pessoas já votaram!</p>
        </div>
      )}
    </div>
  );
}

export default GraphicQuizzes;
