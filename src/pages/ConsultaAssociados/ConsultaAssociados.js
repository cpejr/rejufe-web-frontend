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
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAssociatesForConsult(setAllAssociates, setLoading, setDataFilter);
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
      <div className="containerConsultAssociate">
        <TableComponent
          rows={associates}
          titles={titles}
          print={false}
          search
          loading={loading}
          dataFilter={dataFilter}
        />
      </div>
    </div>
  );
}

export default ConsultaAssociados;
