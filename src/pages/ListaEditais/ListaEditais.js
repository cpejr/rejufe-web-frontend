import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ListaEditais.css';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';
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

  useEffect(() => {
    getAllEditais(setId, setAllEditais, history);
  }, []);

  return (
    <div className="lista-editais-page">
      <h1 className="titulo-lista-editais"> Associados Ativos </h1>
      <div className="conteiner-lista-editais">
        <TableComponent id={id} rows={editais} titles={titles} print={false} search />
      </div>
    </div>
  );
}

export default ListaEditais;
