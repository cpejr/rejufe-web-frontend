import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import TableComponent from '../dashboard/dashboardComponent';
import './GraphicResultQuizzes.css';

toast.configure();

function GraphicQuizzes({
  _id,
  status,
  toVote,
  options,
  alreadyVoted,
  title,
  userType,
}) {
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadEmailSender, setLoadEmailSender] = useState(false);
  const [toVoteMembers, setToVoteMembers] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const graphInfo = [['Opções', 'Votos', { role: 'annotation' }]];
    const alreadyVotedQuantity = alreadyVoted?.length;

    const Data = options?.reduce((acc, option) => {
      const percentValue = alreadyVotedQuantity && 100 * (option.votes / alreadyVotedQuantity);
      const percent = `${percentValue.toFixed(2)}%`.replace('.', ',');

      acc.push([option.description, option.votes, percent]);
      return acc;
    }, graphInfo);

    setGraphData(Data);
  }, [options]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTable(true);
      try {
        const res = await managerService.getToVoteMembers(_id);
        const members = res && res.map(({ name }) => ({ name }));
        setToVoteMembers(members);
      } catch (err) {
        toast.error(`Erro ao listar os que associados que ainda não votaram na enquete ${title}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          onOpen: () => history.push('/NotFound'),
        });
      } finally {
        setLoadingTable(false);
      }
    };

    fetchData();
  }, []);

  const titles = ['', ''];
  const graphOptions = {
    title: 'Quizz',
    chartArea: { width: '50%', height: '100%' },
    vAxis: {
      title: 'Opções',
    },
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    setLoadEmailSender(true);
    try {
      await managerService.sendEmailToVoteMembers(_id);
      toast.success('E-mails enviados com sucesso', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (err) {
      toast.error('Houve um problema no envio dos e-mails. Tente mais tarde', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } finally {
      setLoadEmailSender(false);
    }
  };

  const loadingComponent = (
    <div className="loader-cards-quizzes">
      <CircularProgress size={35} color="inherit" />
    </div>
  );

  if (loadingTable) return loadingComponent;

  return (
    <div className="content-card-quizzes">
      <Chart
        chartType="BarChart"
        width="100%"
        height="50%"
        data={graphData}
        options={graphOptions}
        legendToggle
      />
      {userType === 'administrador' && toVote?.length > 0 && status === 'Em andamento' && (
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
