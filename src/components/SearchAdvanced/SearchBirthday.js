/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import ptLocale from 'moment/locale/pt-br';
import * as managerService from '../../services/manager/managerService';
import './SearchBirthday.css';
import Day from '../consts/dayForData';
import Month from '../consts/monthData';

moment.locale('pt-br', [ptLocale]);

function SearchBirthday({
  handleClose, setData, rows,
}) {
  const [associates, setAllAssociates] = useState([]);
  const [dayInitial, setDayInitial] = useState('');
  const [monthInitial, setMonthInitial] = useState('');
  const [dayFinish, setDayFinish] = useState('');
  const [monthFinish, setMonthFinish] = useState('');
  const auxFilterDay = [];
  let count = 0;
  function compare(a, b) {
    const x = a.name.toUpperCase();
    const y = b.name.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1;
  }
  function createData(birth, name, cellPhoneNumber) {
    return {
      birth, name, cellPhoneNumber,
    };
  }
  async function getAllAssociates() {
    try {
      const auxAssociate = [];
      const allAssociates = await managerService.getAssociates();
      allAssociates.sort(compare);

      allAssociates.filter((associate) => associate.status === 'A').forEach((object) => {
        auxAssociate.push(createData(
          moment(object?.birth).format('DD/MM'),
          object.name,
          object.cell_phone_number,
        ));
      });

      setAllAssociates(auxAssociate);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }
  const compareDayInitial = `${dayInitial}`;
  const compareDayFinish = `${dayFinish}`;
  const compareMonthInitial = `${monthInitial}`;
  const compareMonthFinish = `${monthFinish}`;
  const convertDayInitial = parseInt(compareDayInitial, 10);
  const convertDayFinish = parseInt(compareDayFinish, 10);
  const convertMonthInitial = parseInt(compareMonthInitial, 10);
  const convertMonthFinish = parseInt(compareMonthFinish, 10);
  associates?.forEach((object) => {
    if (parseInt(object?.birth.substr(3, 4), 10) > convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) < convertMonthFinish) {
      auxFilterDay[count] = object;
      count += 1;
    }
    if (parseInt(object?.birth.substr(3, 4), 10) > convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) === convertMonthFinish) {
      if (parseInt(object?.birth.substr(0), 10) <= convertDayFinish) {
        auxFilterDay[count] = object;
        count += 1;
      }
    }
    if (parseInt(object?.birth.substr(3, 4), 10) === convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) < convertMonthFinish) {
      if (parseInt(object?.birth.substr(0), 10) >= convertDayInitial) {
        auxFilterDay[count] = object;
        count += 1;
      }
    }
    if (parseInt(object?.birth.substr(3, 4), 10) === convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) === convertMonthFinish) {
      if (parseInt(object?.birth.substr(0), 10) >= convertDayInitial && parseInt(object?.birth.substr(0), 10) <= convertDayFinish) {
        auxFilterDay[count] = object;
        count += 1;
      }
    }
  });
  function handleData() {
    setData(auxFilterDay);
    if (dayInitial === '' && monthInitial === '' && dayFinish === '' && monthFinish === '') {
      setData(rows);
    }
    if (convertMonthInitial > convertMonthFinish) {
      toast.error('Intervalo inválido!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
    if (convertMonthInitial === convertMonthFinish) {
      if (convertDayInitial > convertDayFinish) {
        toast.error('Intervalo inválido!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
    handleClose();
  }

  useEffect(() => {
    getAllAssociates();
  }, []);

  const body = (
    <Box className="birthday-search-advanced-container">
      <div className="birthday-search-advanced-text">
        <div className="birthday-search-advanced-title"><p>Insira um intervalo</p></div>
      </div>
      <div className="birthday-search-advanced-buttons">
        <div className="birthday-search-buttons-align">
          <p>Início:</p>
          <TextField
            select
            label="Dia"
            variant="standard"
            sx={{ m: 1, width: '55px' }}
            onChange={(e) => setDayInitial(e.target.value.toLowerCase())}
          >
            {Day.map((option) => (
              <MenuItem key={option.value} value={option.value} style={{ height: '36px' }}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Mês"
            variant="standard"
            sx={{ m: 1, width: '55px' }}
            onChange={(e) => setMonthInitial(e.target.value.toLowerCase())}
          >
            {Month.map((option) => (
              <MenuItem key={option.value} value={option.value} style={{ height: '36px' }}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="birthday-search-buttons-align">
          <p>Término:</p>
          <TextField
            select
            label="Dia"
            variant="standard"
            sx={{ m: 1, width: '55px' }}
            onChange={(e) => setDayFinish(e.target.value.toLowerCase())}
          >
            {Day.map((option) => (
              <MenuItem key={option.value} value={option.value} style={{ height: '36px' }}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Mês"
            variant="standard"
            sx={{ m: 1, width: '55px' }}
            onChange={(e) => setMonthFinish(e.target.value.toLowerCase())}
          >
            {Month.map((option) => (
              <MenuItem key={option.value} value={option.value} style={{ height: '36px' }}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="birthday-search-buttons-field">
          <div className="birthday-align-buttons">
            <button
              type="button"
              className="birthday-search-button-submit"
              onClick={() => {
                handleData();
              }}
            >
              <div className="button-search-align">
                <p>Pesquisa Avançada</p>
              </div>
            </button>
          </div>
          <div className="birthday-search-button-return">
            <button type="button" className="birthday-search-button-submit" onClick={handleClose}>
              <div className="button-search-align">
                <p>Voltar</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
  return (
    <div>
      {body}
    </div>
  );
}

export default SearchBirthday;
