/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import './AdmRegistrosComunic.css';
import { toast } from 'react-toastify';
import FileSaver from 'file-saver';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdmRegistrosComunic() {
  const [comunics, setAllComunics] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [actualFile, setActualFile] = useState();
  const [fileId, setFileId] = useState();
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();

  function createData(type, number, description) {
    return {
      type, number, description,
    };
  }

  function createId(_id) {
    return _id;
  }

  async function getAllComunic() {
    const auxComunic = [];
    const comunicId = [];
    const archive1Code = [];
    const archive2Code = [];
    try {
      const allComunic = await managerService.getComunic();
      allComunic.forEach((object) => {
        auxComunic.push(createData(
          object.type,
          object.number,
          object.description,
        ));
        archive1Code.push(object.archive_1);
        archive2Code.push(object.archive_2);
      });
      allComunic.forEach((object) => {
        comunicId.push(createId(
          object._id,
        ));
      });
      auxComunic.sort();
      setId(comunicId);
      setAllComunics(auxComunic);
      setArchive1Id(archive1Code);
      setArchive2Id(archive2Code);
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
      <TableComponent setUse={setUse} comunicId={id} rows={comunics} titles={titles} archive1Id={archive1Id} archive2Id={archive2Id} editComunic />
    </div>
  );
}

export default AdmRegistrosComunic;