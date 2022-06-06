import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ListaEditais.css';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllEditais from '../../components/getAllEditais/getAllEditais';
import FichaAtas from '../FichaAtas/FichaAtas';

const titles = [
  '',
  'Número',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function ListaEditais({ intranet }) {
  const [editais, setAllEdicts] = useState([]);
  const [id, setId] = useState([]);
  const history = useHistory();
  const [user, setUse] = useState(true);
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();
  const [showForms, setShowForms] = useState(false);
  const [atasId, setAtasId] = useState();

  useEffect(() => {
    getAllEditais(setId, setAllEdicts, history, setUse, setArchive1Id, setArchive2Id);
  }, [user, showForms]);

  if (intranet) {
    return (
      (!showForms ? (
        <div>
          <div className="title-list-edicts">
            <h1>
              {'Editais '}
            </h1>
          </div>
          <div className="container-list-edicts" />
          <TableComponent
            setUse={setUse}
            id={id}
            rows={editais}
            titles={titles}
            print={false}
            searchMinutesIntranet
            setShowForms={setShowForms}
            setAtasId={setAtasId}
            archive1Id={archive1Id}
            archive2Id={archive2Id}
          />
        </div>
      ) : (
        <div>
          <FichaAtas atasId={atasId} setShowForms={setShowForms} />
        </div>
      ))
    );
  }
  return (
    <div>
      <div className="title-list-edicts">
        <h1>
          {'Editais '}
        </h1>
      </div>
      <div className="container-list-edicts" />
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
  );
}

export default ListaEditais;
