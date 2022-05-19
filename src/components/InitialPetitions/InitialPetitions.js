import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../dashboard/dashboardComponent';
import './InitialPetitions.css';

toast.configure();

const titles = [
  'Número',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function InitialPetitions() {
  const [initialPetitions, setInitialPetitions] = useState([]);
  const [archive1Id, setArchive1Id] = useState([]);
  const [archive2Id, setArchive2Id] = useState([]);
  const [use, setUse] = useState(true);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  function createData(numberModels, description) {
    return {
      numberModels, description,
    };
  }

  async function getInitialPetitions() {
    const auxPetitions = [];
    const archive1Code = [];
    const archive2Code = [];
    const filter = 'PETIÇÕES INICIAIS';
    const field = 'type';

    try {
      const petitions = await managerService.getModels(field, filter);
      petitions.forEach((object) => {
        auxPetitions.push(createData(
          object.numberModels,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      setInitialPetitions(auxPetitions);
      setArchive1Id(archive1Code);
      setArchive2Id(archive2Code);
      setUse(false);
      setLoading(false);
    } catch (error) {
      history.push('/NotFound');
      toast.error('Não foi possível obter petições iniciais!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    getInitialPetitions();
  }, [use]);

  return (
    <div className="initial-petitions-menu-container">
      <div className="initial-petitions-menu-title">
        <h1>Petições Iniciais</h1>
      </div>
      <div className="line-table-initial-petitions-menu" />
      {loading ? (
        <div className="initial-petitions-loader">
          <CircularProgress sx={{ color: 'black' }} />
        </div>
      ) : (
        <TableComponent
          setUse={setUse}
          rows={initialPetitions}
          titles={titles}
          archive1Id={archive1Id}
          archive2Id={archive2Id}
        />
      )}
    </div>

  );
}

export default InitialPetitions;
