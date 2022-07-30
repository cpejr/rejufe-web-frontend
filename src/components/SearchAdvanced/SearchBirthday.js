/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import { toast } from 'react-toastify';
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
    console.log('🚀 ~ file: SearchBirthday.js ~ line 66 ~ handleData ~ auxFilterDay', auxFilterDay);
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
          <select data-size="2" className="birthday-search-advanced-select" setFilterType placeholder="" onChange={(e) => setDayInitial(e.target.value.toLowerCase())}>
            <option value=" "> </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <select className="birthday-search-advanced-select" setFilterType placeholder="" onChange={(e) => setMonthInitial(e.target.value.toLowerCase())}>
            <option value=" "> </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="birthday-search-buttons-align">
          <label>Término:</label>
          <select className="birthday-search-advanced-select" setFilterType placeholder="" onChange={(e) => setDayFinish(e.target.value.toLowerCase())}>
            <option value=" "> </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <select className="birthday-search-advanced-select" setFilterType placeholder="" onChange={(e) => setMonthFinish(e.target.value.toLowerCase())}>
            <option value=" "> </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
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
