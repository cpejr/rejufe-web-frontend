/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import ptLocale from 'moment/locale/pt-br';
import './SearchBirthday.css';

moment.locale('pt-br', [ptLocale]);

function SearchBirthday({
  handleClose, setData, rows,
}) {
  const [dayInitial, setDayInitial] = useState('');
  const [monthInitial, setMonthInitial] = useState('');
  const [dayFinish, setDayFinish] = useState('');
  const [monthFinish, setMonthFinish] = useState('');
  const auxFilterDay = [];
  let count = 0;
  const auxFilterMonth = [];
  let add = 0;

  rows?.forEach((object) => {
    if (object?.birth.substr(0, 2) >= dayInitial && object?.birth.substr(0, 2) <= dayFinish) {
      auxFilterDay[count] = object;
    }
    count += 1;
  });
  auxFilterDay.forEach((object) => {
    if ((object?.birth.substr(3, 4) >= monthInitial) && (object?.birth.substr(3, 4) <= monthFinish)) {
      auxFilterMonth[add] = object;
    }
    add += 1;
  });
  function handleData() {
    setData(auxFilterMonth);
    handleClose();
  }

  const handleClean = () => {
    setDayInitial('');
    setMonthInitial('');
    setDayFinish('');
    setMonthFinish('');
  };
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
