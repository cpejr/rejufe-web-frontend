/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import ptLocale from 'moment/locale/pt-br';
import * as managerService from '../../services/manager/managerService';
import './SearchBirthday.css';

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
  const auxFilterMonth = [];
  function createData(birth, name, cellPhoneNumber) {
    return {
      birth, name, cellPhoneNumber,
    };
  }
  async function getAllAssociates() {
    try {
      const auxAssociate = [];
      const allAssociates = await managerService.getAssociates();
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
  // eslint-disable-next-line no-unused-vars
  associates?.forEach((object) => {
    if (parseInt(object?.birth.substr(3, 4), 10) > convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) < convertMonthFinish) {
      auxFilterDay[count] = object;
    }
    if (parseInt(object?.birth.substr(3, 4), 10) > convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) === convertMonthFinish) {
      // eslint-disable-next-line max-len
      if (parseInt(object?.birth.substr(0), 10) <= convertDayFinish) {
        auxFilterDay[count] = object;
      }
    }
    if (parseInt(object?.birth.substr(3, 4), 10) === convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) < convertMonthFinish) {
      // eslint-disable-next-line max-len
      if (parseInt(object?.birth.substr(0), 10) >= convertDayInitial) {
        auxFilterDay[count] = object;
      }
    }
    const test = object?.birth.substr(3, 4);
    console.log('🚀 ~ file: SearchBirthday.js ~ line 57 ~ associates?.forEach ~ test', test);
    console.log('🚀 ~ file: SearchBirthday.js ~ l555 ~ associates?.forEach ~ object?.birth.substr(0, 1)', parseInt(test, 10));
    if (parseInt(object?.birth.substr(3, 4), 10) === convertMonthInitial && parseInt(object?.birth.substr(3, 4), 10) === convertMonthFinish) {
    // eslint-disable-next-line max-len
      if (parseInt(object?.birth.substr(0), 10) >= convertDayInitial && parseInt(object?.birth.substr(0), 10) <= convertDayFinish) {
        auxFilterDay[count] = object;
      }
    }
    count += 1;
  });
  function handleData() {
    setData(auxFilterDay);
    console.log('🚀 ~ file: SearchBirthday.js ~ line 66 ~ handleData ~ auxFilterDay', auxFilterDay);
    console.log('🚀 ~ file: SearchBirthday.js ~ line 52 ~ handleData ~ auxFilterMonth', auxFilterMonth);
    if (dayInitial === '' && monthInitial === '' && dayFinish === '' && monthFinish === '') {
      setData(rows);
    }

    handleClose();
  }

  const handleClean = () => {
    setDayInitial('');
    setMonthInitial('');
    setDayFinish('');
    setMonthFinish('');
  };

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

          <label>Início:</label>

          <input type="text" setFilterValue onChange={(e) => setDayInitial(e.target.value.toLowerCase())} />
          <input type="text" setFilterValue onChange={(e) => setMonthInitial(e.target.value.toLowerCase())} />
        </div>
        <div className="birthday-search-buttons-align">
          <label>Término:</label>

          <input type="text" setFilterValue onChange={(e) => setDayFinish(e.target.value.toLowerCase())} />
          <input type="text" setFilterValue onChange={(e) => setMonthFinish(e.target.value.toLowerCase())} />
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
          <div className="birthday-search-button-field">
            <button
              className="birthday-search-button-clean"
              type="button"
              onClick={handleClean}
            >
              <div className="button-search-align">
                <p>Limpar</p>
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
