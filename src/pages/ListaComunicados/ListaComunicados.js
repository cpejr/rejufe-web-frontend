import React, { useState, useEffect } from 'react';
import './ListaComunicados.css';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllAdministrationRecords from '../../components/AdmRegistrosNoticias/getAllAdministrationRecords';

const titles = [
  ' ',
  'Reg.',
  'Status',
  'Título',
  'Postado',
  'Seção',
  'Tipo',
];

function AdmRegistrosNoticias() {
  const [news, setAllAdministrationRecords] = useState([]);
  const [id, setId] = useState([]);
  const [newsSequentialId, setNewsSequentialId] = useState([]);

  useEffect(() => {
    getAllAdministrationRecords(setId, setAllAdministrationRecords, setNewsSequentialId);
  }, []);

  return (
    <div>
      <h1 className="titleAdministrationRecords"> Administração de Registros </h1>
      <div className="containerAdministrationRecords">
        <TableComponent id={id} newsSequentialId={newsSequentialId} rows={news} titles={titles} search />
      </div>
    </div>
  );
}

export default AdmRegistrosNoticias;
