/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './ConsultaAssociados.css';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';

function ConsultaAssociados() {
  const [associates, setAllAssociates] = useState([]);
  const [id, setId] = useState([]);

  function createData(name, cellPhoneNumber, status, allocation, acting, email) {
    return {
      name, cellPhoneNumber, status, allocation, acting, email,
    };
  }

  function compare(a, b) {
    const x = a.name.toUpperCase();
    const y = b.name.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1;
  }

  async function getAllAssociates() {
    const auxAssociate = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getAssociates();
      allAssociates.forEach((object) => {
        associateId.push(object._id);
        auxAssociate.push(createData(
          object.name,
          object.cell_phone_number,
          object.status,
          object.allocation,
          object.acting,
          object.email,
        ));
      });

      auxAssociate.sort(compare);
      setId(associateId);
      setAllAssociates(auxAssociate);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  useEffect(() => {
    getAllAssociates();
  }, []);

  const titles = [
    'Ficha',
    'Nome',
    'Celular',
    'Status',
    'Lotação',
    'Atuação',
    'Email',
  ];

  return (
    <div>
      <h1 className="titleConsultAssociate"> Associados Ativos </h1>
      <div className="container-administration">
        <TableComponent id={id} rows={associates} titles={titles} search />
      </div>
    </div>
  );
}

export default ConsultaAssociados;
