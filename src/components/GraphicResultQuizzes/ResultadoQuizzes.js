import React, { useEffect } from 'react';
import { Chart } from 'react-google-charts';
// import * as managerService from '../../services/manager/managerService';

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
  console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 15 ~ GraphicQuizzes ~ associates', associates);
  const data = [
    ['Opções', 'Votos', { role: 'annotation' }],
  ];
  let index = 1;

  quizz?.forEach((option) => {
    const percentual = (option.votes / alreadyVoted.length);
    let changePercentual = (percentual * 100);
    changePercentual += '%';
    data[index] = [option.description, option.votes, changePercentual];
    index += 1;
  });

  const user = [];
  let count = 0;
  const name = [];

  toVote.forEach((_id) => {
    console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 47 ~ toVote.forEach ~ _id', _id);
    user[count] = associates?.filter((item) => item._id === _id);
    user[count].forEach((obj) => {
      name[count] = obj.name;
      console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 52 ~ user[count].forEach ~ produto.name', obj.name);
    });
    count += 1;
  });
  console.log('🚀 ~ file: ResultadoQuizzes.js ~ line 55 ~ toVote.forEach ~ toVote', name);

  useEffect(() => {
  }, [associates]);

  return (
    <div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="50%"
        data={data}
        options={options}
      />
      <p>Faltam votar:</p>
      {name?.map((title) => (
        <p>
          {title}
          ,
        </p>
      ))}
    </div>
  );
}

export default GraphicQuizzes;
