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
    <div className="consultAtasPage">
      <div className="ConsultAtas-field">
        <div className="title-ConsultAtas">
          <h1>
            {'Consulta em Atas e Editais '}
          </h1>
        </div>
        <div className="line-table-ConsultAtas" />
        {loading ? (
          <div className="loaderConsultAtas">
            <CircularProgress />
          </div>
        ) : (
          <div className="containerConsultAtas">
            <TableComponent id={id} rows={atas} titles={titles} print={false} searchAtas />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultaAtas;
