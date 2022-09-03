import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import TableComponent from '../../components/dashboard/dashboardComponent';
import './FichaEnquete.css';

toast.configure();

function GraphicQuizzes({
  toVote,
  quizzId,
  quizz,
  alreadyVoted,
  associates,
  userType,
}) {
  const [loadEmailSender, setLoadEmailSender] = useState(false);
  const [toVoteMembers, setToVoteMembers] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const graphInfo = [['Opções', 'Votos', { role: 'annotation' }]];

    const Data = quizz.reduce((acc, option) => {
      const alreadyVotedQuantity = alreadyVoted?.length;
      const percentValue = alreadyVotedQuantity && 100 * (option.votes / alreadyVotedQuantity);
      const percent = `${percentValue.toFixed(2).replace('.', ',')}%`;

      acc.push([option.description, option.votes, percent]);
      return acc;
    }, graphInfo);

    setGraphData(Data);
  }, [quizz]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await managerService.getToVoteMembers(quizzId);
        const members = res && res.map((member) => ({ name: member.name }));
        setToVoteMembers(members);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // const data = [
  //   ['Opções', 'Votos', { role: 'annotation' }],
  // ];
  const titles = ['', ''];
  // const user = [];
  // const name = [];
  // const votes = [];
  // let index = 1;

  // quizz?.forEach((option,) => {
  //   const percentual = (option.votes / alreadyVoted.length);
  //   let changePercentual = (percentual * 100);
  //   changePercentual += '%';
  //   data[index] = [option.description, option.votes, changePercentual];
  //   votes[index] = option.votes;
  //   index += 1;
  // });
  // let count = 0;

  // toVote?.forEach((_id) => {
  //   user[count] = associates?.filter((item) => item._id === _id);
  //   user[count]?.forEach((obj) => {
  //     name[count] = obj.name;
  //   });
  //   count += 1;
  // });

  // const names = name?.map((value) => ({
  //   name: value,
  // }));

  const options = {
    title: 'Quizz',
    chartArea: { width: '50%', height: '100%' },
    vAxis: {
      title: 'Opções',
    },
  };
  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      setLoadEmailSender(true);
      await managerService.sendEmailToVoteMembers(quizzId);
      toast.success('E-mails enviados com sucesso', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoadEmailSender(false);
    } catch (err) {
      console.error(err);
      toast.error('Houve um problema no envio dos e-mails. Tente mais tarde', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoadEmailSender(false);
    }
  };

  return (
    <div className="content-card-quizzes">
      {quizz[0]?.votes ? (
        <Chart
          chartType="BarChart"
          width="100%"
          height="50%"
          data={graphData}
          options={options}
          legendToggle
        />
      ) : ''}
      {userType === 'administrador' && toVote?.length > 0 && (
        <div>
          <div className="title-quizzes-already-voted">
            <h2>{'Faltam Votar '}</h2>
          </div>
          <div className="line-quizzes-already-voted" />
          <div className="content-table-quizzes">
            <TableComponent
              rows={toVoteMembers}
              titles={titles}
              order
              renderButton={false}
            />
          </div>
          <div className="send-email-to-vote-members">
            <button
              type="button"
              onClick={sendEmail}
              disabled={loadEmailSender}
            >
              Enviar e-mails
            </button>
          </div>
        </div>
      )}
      {toVote?.length === 0 && (
        <div className="quizzes-already-voted">
          <p>Todas as pessoas já votaram!</p>
        </div>
      )}
    </div>
  );
}

export default GraphicQuizzes;
