import React from 'react';
import TableComponent from '../../components/dashboard/dashboardComponent';
import './Dashboard.css';

// A função e as 2 constantes abaixo tem único proposito de testar o componente TableComponent

function createData(_id, name, calories, fat, carbs, protein) {
  return {
    _id, name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData(41, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(63, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(85, 'Eclair', 262, 16.0, 24, 6.0),
];

const titles = [
  '',
  '_id',
  'Código',
  'Status',
  'Nome',
  'Cpf',
  'vapo',
];

function Dashboard() {
  return (
    <div className="main-dashboard-container">
      <h1>Dashboard</h1>
      <TableComponent rows={rows} titles={titles} edit />
    </div>
  );
}

export default Dashboard;
