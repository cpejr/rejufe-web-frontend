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
  'Arquivo 1',
  'Arquivo 2',
];

function ListaEditais() {
  const [editais, setAllEditais] = useState([]);
  const [id, setId] = useState([]);
  const history = useHistory();
  const [user, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();

  useEffect(() => {
    getAllEditais(setId, setAllEditais, history, setUse, setArchive1Id, setArchive2Id);
  }, [user]);

  return (
    <div className="lista-editais-page">
      <h1 className="titulo-lista-editais"> Editais </h1>
      <div className="conteiner-lista-editais">
        <TableComponent
          setUse={setUse}
          id={id}
          rows={editais}
          titles={titles}
          print={false}
          searchMinutes
          archive1Id={archive1Id}
          archive2Id={archive2Id}
        />
      </div>
    </div>
  );
}

export default ListaEditais;
