import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import * as managerService from '../../services/manager/managerService';

export const options = {
  title: 'Quizz',
  chartArea: { width: '50%' },
  vAxis: {
    title: 'Opções',
  },
};
export const userName = [];

function GraphicQuizzes({ toVote, quizz, alreadyVoted }) {
  const [name, setName] = useState([]);
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

  let count = 0;

  // toVote.forEach(async (_id) => {
  //   const allAssociates = await managerService.getById(_id);
  //   userName[count] = allAssociates.name;
  //   count += 1;
  //   console.log(userName);
  // });

  useEffect(async () => {
    toVote.forEach(async (_id) => {
      const allAssociates = await managerService.getById(_id);
      userName[count] = allAssociates.name;
      count += 1;
      console.log(userName);
    });
    setName(userName);
  }, []);

  return (
    <div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="50%"
        data={data}
        options={options}
      />
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
