import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllBirthdays from '../../components/getAllBirthdays/getAllBirthdays';
import './Aniversariantes.css';

const titles = [
  '',
  '',
  'Data',
  'Nome',
  'Celular',
];

function Aniversariantes() {
  const [Birthdays, setAllBirthdays] = useState([]);
  const [id, setId] = useState([]);
  const [use, setUse] = useState(true);

  useEffect(() => {
    getAllBirthdays(setId, setAllBirthdays);
  }, [use]);

  return (
    <div>
      <div className="title-birthdays">
        <h1>
          Aniversariantes
        </h1>
      </div>
      <div className="line-table-birthdays" />
      <TableComponent
        setUse={setUse}
        id={id}
        rows={Birthdays}
        titles={titles}
        order
        search
      />
    </div>
  );
}

export default Aniversariantes;
