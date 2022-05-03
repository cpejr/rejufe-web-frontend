import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from '../../components/dashboard/dashboardComponent';

function InitialPetitions() {
  const getInitialPetitions() {
    try {
      const response = await managerService.get

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="initial-petitions-container">
      <h1>Petições Iniciais</h1>
      <TableComponent />
    </div>

  );
}

export default InitialPetitions;
