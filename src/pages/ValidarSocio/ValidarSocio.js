/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ValidarSocio.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/SearchAdvancedAssociate/TableSearchAssociate';

toast.configure();

function ValidarSocio() {
  const [associates, setAllAssociates] = useState([]);
  const [data, setAllData] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  function createData(name, cpf, status) {
    return {
      name, cpf, status,
    };
  }

  async function getAllAssociates() {
    setLoading(true);
    const auxData = [];
    const auxAssociate = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getExternalAssociates();
      console.log('🚀 ~ file: ValidarSocio.js ~ line 34 ~ getAllAssociates ~ allAssociates', allAssociates);
      allAssociates.forEach((object) => {
        associateId.push(object._id);
        auxAssociate.push(createData(object.name, object.cpf, object.status));
        auxData.push(object);
      });
      auxAssociate.sort();
      setId(associateId);
      setAllAssociates(auxAssociate);
      setAllData(auxData);
      setUse(false);
      setLoading(false);
    } catch (error) {
      history.push('/NotFound');
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
    'Nome',
    'Cpf',
    'Status',
  ];
  return (
    <div className="ValidateAssociate-container">
      <div className="ValidateAssociate-field">
        <div className="title-validateAssociate">
          <h1>
            {'Manutenção em associados '}
          </h1>
        </div>
        <div className="line-table-validateAssociate" />
        <TableComponent
          searchAdvanced
          setUse={setUse}
          dados={data}
          associateId={id}
          rows={associates}
          titles={titles}
          validate
          allAssociates
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ValidarSocio;
