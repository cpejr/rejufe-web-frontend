import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ListaEditais.css';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllEditais from '../../components/getAllEditais/getAllEditais';

const titles = [
  '',
  'Número',
  'Descrição',
];

function ListaEditais() {
  const [editais, setAllEditais] = useState([]);
  const [id, setId] = useState([]);
  const history = useHistory();
  const [user, setUse] = useState(true);

  useEffect(() => {
    getAllEditais(setId, setAllEditais, history);
  }, [user]);

  return (
    <div className="lista-editais-page">
      <h1 className="titulo-lista-editais"> Associados Ativos </h1>
      <div className="conteiner-lista-editais">
        <TableComponent setUse={setUse} edictsId={id} rows={editais} titles={titles} print={false} searchMinutes />
      </div>
    </div>
  );
}

export default ListaEditais;
