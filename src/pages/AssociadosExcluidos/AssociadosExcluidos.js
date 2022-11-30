import React, { useState, useEffect } from 'react';
import './AssociadosExcluidos.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

toast.configure();

function ExcludedAssociates() {
  const [associates, setAllAssociates] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [loading, setLoading] = useState(false);

  function createData(status, name, cpf) {
    return {
      status, name, cpf,
    };
  }
  function createId(_id) {
    return _id;
  }

  async function getAllAssociates() {
    setLoading(true);
    const auxAssociate = [];
    const AssociatesId = [];
    try {
      const allAssociates = await managerService.getExcludedAssociate('E');
      allAssociates.forEach((object) => {
        auxAssociate.push(createData(
          object.status,
          object.name,
          object.cpf,
        ));
      });
      allAssociates.forEach((object) => {
        AssociatesId.push(createId(
          object._id,
        ));
      });
      auxAssociate.sort();
      setId(AssociatesId);
      setAllAssociates(auxAssociate);
      setUse(false);
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllAssociates();
  }, [use]);

  const titles = [
    '',
    'Status',
    'Nome',
    'Cpf',
  ];

  return (
    <div className="ExcludedAssociate-container">
      <div className="ExcludedAssociate-field">
        <div className="title-ExcludedAssociate">
          <h1>
            {'Manutenção em associados '}
          </h1>
        </div>
        <div className="line-table-ExcludedAssociate" />
        <TableComponent
          setUse={setUse}
          associateId={id}
          rows={associates}
          titles={titles}
          edit
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ExcludedAssociates;
