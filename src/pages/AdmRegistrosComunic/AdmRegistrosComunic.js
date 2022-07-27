import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const [archive1Id, setArchive1Id] = useState();
  const [archive2Id, setArchive2Id] = useState();
  const history = useHistory();

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
    const archive1Codes = [];
    const archive2Codes = [];
    try {
      const allComunic = await managerService.getComunic();

      allComunic.forEach((object) => {
        auxComunic.push(createData(
          object.type,
          object.number,
          object.description,
        ));
        const archive1Code = object.archive_1;
        const archive2Code = object.archive_2;
        archive1Codes.push(!archive1Code || archive1Code === 'undefined' ? '' : archive1Code);
        archive2Codes.push(!archive2Code || archive2Code === 'undefined' ? '' : archive2Code);
      });
      allComunic.forEach((object) => {
        comunicId.push(createId(
          object._id,
        ));
      });

      auxComunic.sort();
      setId(comunicId);
      setAllComunics(auxComunic);
      setArchive1Id(archive1Codes);
      setArchive2Id(archive2Codes);
      setUse(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      history.push('/NotFound');
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
    <div className="container-administration-register-comunic">
      <div className="title-adm-registers-comunic">
        <h1>
          {'Manutenção em Comunicados e Informativos '}
        </h1>
      </div>
      <div className="line-table-registers-comunic" />
      <TableComponent
        setUse={setUse}
        comunicId={id}
        rows={comunics}
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        editComunic
      />
    </div>
  );
}

export default AdmRegistrosComunic;
