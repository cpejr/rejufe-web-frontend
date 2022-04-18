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
  const [id, setId] = useState([]);
  const [user, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();

  useEffect(() => {
    getAllListaComunicados(setAllCommunique, history, setId, setUse, setArchive1Id, setArchive2Id);
  }, [user]);

  return (
    <div>
      <h1 className="title-list-comunic"> Comunicados </h1>
      <div className="container-list-comunic">
        <TableComponent
          setUse={setUse}
          communiqueId={id}
          rows={communique}
          titles={titles}
          archive1Id={archive1Id}
          archive2Id={archive2Id}
        />
      </div>
    </div>
  );
}

export default ListaComunicados;
