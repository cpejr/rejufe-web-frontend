import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ListaComunicados.css';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllListaComunicados from '../../components/ListaComunicados/getAllListaComunicados';

const titles = [
  'Número',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function ListaComunicados() {
  const [communique, setAllCommunique] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllListaComunicados(setAllCommunique, history);
  }, []);

  return (
    <div>
      <h1 className="title-list-comunic"> Comunicados </h1>
      <div className="container-list-comunic">
        <TableComponent rows={communique} titles={titles} />
      </div>
    </div>
  );
}

export default ListaComunicados;
