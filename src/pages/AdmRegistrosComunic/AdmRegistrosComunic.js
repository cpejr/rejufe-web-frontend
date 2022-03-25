/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import './AdmRegistrosComunic.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdmRegistrosComunic() {
  const [comunics, setAllComunics] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);

  function createData(type, number, description, archive_1, archive_2) {
    return {
      type, number, description, archive_1, archive_2,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllComunic() {
    const auxComunic = [];
    const comunicId = [];
    try {
      const allComunic = await managerService.getComunic();
      allComunic.forEach((object) => {
        auxComunic.push(createData(
          object.type,
          object.number,
          object.description,
          object.archive_1,
          object.archive_2,
        ));
      });
      allComunic.forEach((object) => {
        comunicId.push(createId(
          object._id,
        ));
      });
      auxComunic.sort();
      setId(comunicId);
      setAllComunics(auxComunic);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  useEffect(() => {
    getAllComunic();
  }, [use]);

  const titles = [
    '',
    'Tipo',
    'Número',
    'Descrição',
    'Arquivo 1',
    'Arquivo 2',
  ];

  return (
    <div className="container-administration-register">
      <div className="title-adm-registers">
        <h1>
          {'Manutenção em Comunicados e Informativos '}
        </h1>
      </div>
      <div className="line-table-registers" />
      <TableComponent setUse={setUse} comunicId={id} rows={comunics} titles={titles} editComunic />
    </div>
  );
}

export default AdmRegistrosComunic;
