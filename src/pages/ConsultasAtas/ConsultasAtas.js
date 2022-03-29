import React, { useState, useEffect } from 'react';
import './ConsultaAtas.css';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllAtasForConsult from '../../components/getAllAtasForConsult/getAllAtasForConsult';

const titles = [
  '',
  'Número',
  'Tipo',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function ConsultaAtas() {
  const [atas, setAllAtas] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAtasForConsult(setId, setAllAtas, setLoading);
  }, []);

  return (
    <div className="consult-atas-page">
      <div className="consult-atas-field">
        <div className="title-consult-atas">
          <h1>
            {'Consulta em Atas e Editais '}
          </h1>
        </div>
        <div className="line-table-consult-atas" />
        {loading ? (
          <div className="loader-consult-atas">
            <CircularProgress />
          </div>
        ) : (
          <div className="container-consult-atas">
            <TableComponent id={id} rows={atas} titles={titles} print={false} searchAtas />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultaAtas;
