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
      <h1 className="titleConsultAssociate"> Associados Ativos </h1>
      <div className="containerConsultAssociate">
        <TableComponent
          id={id}
          rows={associates}
          titles={titles}
          print={false}
          search
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ConsultaAssociados;
