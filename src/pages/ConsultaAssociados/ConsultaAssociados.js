import React, { useState, useEffect } from 'react';
import './ConsultaAssociados.css';
import 'react-toastify/dist/ReactToastify.css';
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
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAssociatesForConsult(setId, setAllAssociates, setLoading);
  }, []);

  return (
    <div className="consultAssociatePage">
      <div className="consultAssociatePageField">
        <div className="title-consult-associates">
          <h1>
            {'Associados Ativos '}
          </h1>
        </div>
        <div className="line-table-consult-associates" />
      </div>
      {
        loading ? (
          <div className="loaderConsultAssociate">
            <CircularProgress />
          </div>
        ) : (
          <div className="containerConsultAssociate">
            <TableComponent id={id} rows={associates} titles={titles} print={false} search loading={loading} />
          </div>
        )
      }
    </div>
  );
}

export default ConsultaAssociados;
