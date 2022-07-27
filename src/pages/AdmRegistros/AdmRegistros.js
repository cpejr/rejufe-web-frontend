import React, { useState, useEffect } from 'react';
import './AdmRegistros.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';

toast.configure();

function AdmRegistros() {
  const [associates, setAllAssociates] = useState([]);
  const [dados, setDados] = useState([]);
  const [sequentialId, setSequentialId] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAllAssociates() {
    setLoading(true);
    const auxAssociate = [];
    const associateCode = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getAssociates();
      allAssociates.forEach(({
        sequential_Id, _id, name, cpf, status,
      }) => {
        associateCode.push(sequential_Id);
        associateId.push(_id);
        auxAssociate.push({ name, cpf, status });
      });
      console.log(allAssociates);
      setDados(allAssociates);
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
        dados={dados}
        rows={associates}
        titles={titles}
        order
        loading={loading}
        print={false}
      />
    </div>
  );
}

export default AdmRegistros;
