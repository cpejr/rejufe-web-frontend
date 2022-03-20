import React from 'react';
import { Chart } from 'react-google-charts';
import TableComponent from '../dashboard/dashboardComponent';
import './ResultadoQuizzes.css';

export const options = {
  title: 'Quizz',
  chartArea: { width: '50%' },
  vAxis: {
    title: 'Opções',
  },
};

function GraphicQuizzes({
  toVote,
  quizz,
  alreadyVoted,
  associates,
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
    if (option.votes === 0) {
      changePercentual = 0;
    }
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
  console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 57 ~ names ~ names', names.length);

  return (
    <div className="content-card-quizzes">
      {votes[1] !== undefined && ( // só irá renderizar quando houver a inicialização dos votos
        <Chart
          chartType="BarChart"
          width="100%"
          height="50%"
          data={data}
          options={options}
        />
      )}
      {names.length > 0 && (
        <div className="content-table-quizzes">
          <TableComponent
            rows={names}
            titles={titles}
            order
          />
        </div>
      )}
      {names.length === 0 && (
        <div className="quizzes-already-voted">
          <p>Todas as pessoas já votaram!</p>
        </div>
      )}
    </div>
  );
}

export default GraphicQuizzes;
