import React, { useState, useEffect } from 'react';
import './ConsultaAssociados.css';
import 'react-toastify/dist/ReactToastify.css';
import ConsultAssociate from '../../components/ConsultaAssociados/ConsultAssociate';
import getAllAssociatesForConsult from '../../components/getAllAssociatesForConsult/getAllAssociatesForConsult';
import { formatAssociatesInfoUserRegister } from '../../utils/formatAssociatesInfo';

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
  const [dados, setDados] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAssociatesForConsult(setId, setAllAssociates, setLoading, setDados);
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
        <ConsultAssociate
          id={id}
          formatDataFunc={formatAssociatesInfoUserRegister}
          titles={titles}
          rows={associates}
          dados={dados}
          adminRegister={false}
          print={false}
          search
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ConsultaAssociados;
