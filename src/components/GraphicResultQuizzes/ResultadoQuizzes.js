import React from 'react';
import { Chart } from 'react-google-charts';

export const data = [
  ['Opções', 'Votos'],
  ['Opção 1', 400],
  ['Opção 2', 100],
  ['Faltam Votar', 50],
];

export const options = {
  title: 'Quizz',
  chartArea: { width: '50%' },
  vAxis: {
    title: 'Opções',
  },
};

function GraphicQuizzes() {
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
