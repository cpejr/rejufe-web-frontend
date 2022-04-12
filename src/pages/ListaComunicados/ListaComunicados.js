import React, { useState, useEffect } from 'react';
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
  const [comunications, setAllComunications] = useState([]);
  const [number, setnumber] = useState([]);

  useEffect(() => {
    getAllListaComunicados(setAllComunications, setnumber);
  }, []);

  return (
    <div>
      <h1 className="titleAdministrationRecords"> Comunicados </h1>
      <div className="containerAdministrationRecords">
        <TableComponent number={number} rows={comunications} titles={titles} search />
      </div>
    </div>
  );
}

export default ListaComunicados;
