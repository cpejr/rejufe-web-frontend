import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../dashboard/dashboardComponent';

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
  const history = useHistory();

  function createData(numberModels, description) {
    return {
      numberModels, description,
    };
  }

  async function getInitialPetitions() {
    const auxPetitions = [];
    const archive1Code = [];
    const archive2Code = [];

    try {
      const response = await managerService.getModels();
      const petitions = response.filter((model) => model.type === 'PETIÇÕES INICIAIS');
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
    } catch (error) {
      console.log(error);
      history.push('/NotFound');
    }
  }

  useEffect(() => {
    getInitialPetitions();
  }, []);

  return (
    <div className="initial-petitions-container">
      <h1>Petições Iniciais</h1>
      <TableComponent rows={initialPetitions} titles={titles} archive1Id={archive1Id} archive2Id={archive2Id} />
    </div>

  );
}

export default InitialPetitions;
