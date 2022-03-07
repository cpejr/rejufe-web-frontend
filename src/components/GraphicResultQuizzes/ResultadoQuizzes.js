import React from 'react';
import { Chart } from 'react-google-charts';

export const options = {
  title: 'Quizz',
  chartArea: { width: '50%' },
  vAxis: {
    title: 'Opções',
  },
};

function GraphicQuizzes({ quizz, alreadyVoted }) {
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

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="70%"
      data={data}
      options={options}
    />
  );
}

export default GraphicQuizzes;