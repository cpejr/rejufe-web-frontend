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

  async function getAllAssociates() {
    const auxAssociate = [];
    const associateId = [];
    try {
      const allAssociates = await managerService.getAssociates();
      console.log('🚀 ~ file: ConsultaAssociados.js ~ line 25 ~ getAllAssociates ~ allAssociates', allAssociates);
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
      auxAssociate.sort();
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
    <div className="container-administration">
      <TableComponent id={id} rows={associates} titles={titles} search />
    </div>
  );
}

export default ConsultaAssociados;
