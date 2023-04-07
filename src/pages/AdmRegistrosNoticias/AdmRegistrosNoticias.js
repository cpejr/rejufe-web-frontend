import React, { useState, useEffect } from 'react';
import './AdmRegistrosNoticias.css';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import getAllAdministrationRecords from '../../components/AdmRegistrosNoticias/getAllAdministrationRecords';
import TableComponent from '../../components/dashboard/dashboardComponent';

const titles = [
  ' ',
  'Reg.',
  'Status',
  'Título',
  'Postado',
  'Tipo',
];

function AdmRegistrosNoticias() {
  const [news, setAllAdministrationRecords] = useState([]);
  const [id, setId] = useState([]);
  const [newsSequentialId, setNewsSequentialId] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllAdministrationRecords(setId, setAllAdministrationRecords, setNewsSequentialId, history, setLoading);
  }, []);

  return (
    <div>
      <div className="consultNoticePageField">
        <div className="title-adm-register-notice">
          <h1>
            {'Administração de Registros '}
          </h1>
        </div>
        <div className="line-table-adm-register-notice" />
      </div>
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
