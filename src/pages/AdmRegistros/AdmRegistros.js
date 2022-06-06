import React, { useState, useEffect } from 'react';
import './AdmRegistros.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function AdmRegistros() {
  const [associates, setAllAssociates] = useState([]);
  const [sequentialId, setSequentialId] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(false);

  function createData(name, cpf, status) {
    return {
      name, cpf, status,
    };
  }

  async function getAllAssociates() {
    setLoading(true);
    const auxAssociate = [];
    const associateCode = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getAssociates();
      allAssociates.forEach((object) => {
        associateCode.push(object.sequential_Id);
        associateId.push(object._id);
        auxAssociate.push(createData(object.name, object.cpf, object.status));
      });
      auxAssociate.sort();
      setId(associateId);
      setAllAssociates(auxAssociate);
      setSequentialId(associateCode);
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllAssociates();
  }, []);

  const titles = [
    '',
    'Código',
    'Nome',
    'Cpf',
    'Status',
  ];

  return (
    <div className="container-administration-register">
      <div className="title-adm-registers">
        <h1>
          {'Manutenção em associados '}
        </h1>
      </div>
      <div className="line-table-registers" />
      <TableComponent
        id={id}
        sequentialId={sequentialId}
        rows={associates}
        titles={titles}
        order
        loading={loading}
      />
    </div>
  );
}

export default AdmRegistros;
