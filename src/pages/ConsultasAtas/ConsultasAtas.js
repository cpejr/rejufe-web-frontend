import React, { useState, useEffect } from 'react';
import './ConsultaAtas.css';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';
import getAllAssociatesForConsult from '../../components/getAllAssociatesForConsult/getAllAssociatesForConsult';

const titles = [
  '',
  'Número',
  'Tipo',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function ConsultaAtas() {
  const [associates, setAllAssociates] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAssociatesForConsult(setId, setAllAssociates, setLoading);
  }, []);

  return (
    <div className="consultAssociatePage">
      <h1 className="titleConsultAssociate"> Associados Ativos </h1>
      {loading ? (
        <div className="loaderConsultAssociate">
          <CircularProgress />
        </div>
      ) : (
        <div className="containerConsultAssociate">
          <TableComponent id={id} rows={associates} titles={titles} print={false} search />
        </div>
      )}
    </div>
  );
}

export default ConsultaAtas;
