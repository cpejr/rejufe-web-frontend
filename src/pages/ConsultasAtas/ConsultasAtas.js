/* eslint-disable no-nested-ternary */
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

function ConsultaMinutes(data) {
  const { location } = data;
  console.log('🚀 ~ file: ConsultasAtas.js ~ line 19 ~ ConsultaMinutes ~ location', location);
  const dados = location?.state;
  const [minutes, setAllMinutes] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    getAllMinutesForConsult(setId, setAllMinutes, setLoading);
    if (dados !== undefined) { console.log('top'); setFiltered(true); }
  }, []);

  console.log('🚀 ~ file: ConsultasAtas.js ~ line 26 ~ ConsultaMinutes ~ filtered', filtered);

  console.log('🚀 555555555555555~ ConsultaMinutes ~ location', minutes);
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
        ) : filtered ? (
          <div className="container-consult-minutes">
            <TableComponent
              id={id}
              rows={dados?.data}
              titles={titles}
              searchMinutes
              printButton
              search
              renderButton
              route="/imprimir-atas-editais"
            />
          </div>
        ) : (
          <div className="container-consult-minutes">
            <TableComponent
              id={id}
              rows={minutes}
              titles={titles}
              searchMinutes
              printButton
              search
              renderButton
              route="/imprimir-atas-editais"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultaMinutes;
