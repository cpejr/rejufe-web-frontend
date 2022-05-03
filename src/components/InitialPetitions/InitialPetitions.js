import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

const titles = [
  '',
  'Número',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function InitialPetitions() {
  const [initialPetitions, setInitialPetitions] = useState([]);
  const history = useHistory();

  async function getInitialPetitions() {
    try {
      const response = await managerService.getModels();
      setInitialPetitions(response.filter((model) => model.type === 'PETIÇÕES INICIAIS'));
    } catch (error) {
      console.log(error);
      history.push('/NotFound');
    }
  }

  console.log(initialPetitions);

  useEffect(() => {
    getInitialPetitions();
  }, []);

  return (
    <div className="initial-petitions-container">
      <h1>Petições Iniciais</h1>
      <TableComponent rows={initialPetitions} titles={titles} />
    </div>

  );
}

export default InitialPetitions;
