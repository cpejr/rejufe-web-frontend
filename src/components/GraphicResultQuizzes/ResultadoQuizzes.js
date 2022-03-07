import React from 'react';
import { Chart } from 'react-google-charts';

export const options = {
  title: 'Quizz',
  chartArea: { width: '50%' },
  vAxis: {
    title: 'Opções',
  },
};

function GraphicQuizzes({ quizz }) {
  const data = [
    ['Opções', 'Votos'],
  ];
  let index = 1;

  quizz?.forEach((option) => {
    console.log(option);
    data[index] = [option.description, option.votes];
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
