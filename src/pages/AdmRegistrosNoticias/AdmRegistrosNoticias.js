import React, { useState, useEffect } from 'react';
import './AdmRegistrosNoticias.css';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllAdministrationRecords(setId, setAllAdministrationRecords, setNewsSequentialId, setLoading);
  }, []);

  return (
    <div>
      <h1 className="titleAdministrationRecords"> Administração de Registros Notícias </h1>
      <div className="containerAdministrationRecords">
        <TableComponent
          id={id}
          newsSequentialId={newsSequentialId}
          rows={news}
          titles={titles}
          search
          loading={loading}
        />
      </div>
    </div>
  );
}

export default AdmRegistrosNoticias;
