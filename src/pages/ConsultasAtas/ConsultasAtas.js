import React, { useState, useEffect } from 'react';
import './ConsultaAtas.css';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllMinutesForConsult from '../../components/getAllAtasForConsult/getAllAtasForConsult';

const titles = [
  '',
  'Número',
  'Tipo',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function ConsultaMinutes() {
  const [minutes, setAllMinutes] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMinutesForConsult(setId, setAllMinutes, setLoading);
  }, []);

  return (
    <div className="consult-minutes-page">
      <div className="consult-minutes-field">
        <div className="title-consult-minutes">
          <h1>
            {'Consulta em Atas e Editais '}
          </h1>
        </div>
        <div className="line-table-consult-minutes" />
        {loading ? (
          <div className="loader-consult-minutes">
            <CircularProgress />
          </div>
        ) : (
          <div className="container-consult-minutes">
            <TableComponent id={id} rows={minutes} titles={titles} print={false} searchMinutes />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultaMinutes;
