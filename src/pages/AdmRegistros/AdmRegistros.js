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
  const [loading, setLoading] = useState(false);
  const sequentialId = true;

  async function getAllAssociates() {
    setLoading(true);
    const auxAssociate = [];
    try {
      const allAssociates = await managerService.getAssociates();
      allAssociates.forEach(({
        sequential_Id: seqId, _id, name, cpf, status, // Eslint exigiu
      }) => {
        auxAssociate.push({
          _id, seqId, name, cpf, status,
        });
      });
      setDados(allAssociates);
      auxAssociate.sort();
      setAllAssociates(auxAssociate);
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
