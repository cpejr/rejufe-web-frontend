import React, { useState, useEffect } from 'react';
import './ConsultaAssociados.css';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';
import getAllAssociatesForConsult from '../../components/getAllAssociatesForConsult/getAllAssociatesForConsult';

const titles = [
  'Ficha',
  'Nome',
  'Celular',
  'Status',
  'Lotação',
  'Atuação',
  'Email',
];

function ConsultaAssociados() {
  const [associates, setAllAssociates] = useState([]);
  console.log('🚀 ~ file: ConsultaAssociados.js ~ line 20 ~ ConsultaAssociados ~ associates', associates);
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
          <TableComponent
            id={id}
            rows={associates}
            associates={associates}
            titles={titles}
            print={false}
            search
          />
        </div>
      )}
    </div>
  );
}

export default ConsultaAssociados;
