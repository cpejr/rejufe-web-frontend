/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import './SearchAdvanced.css';

function SearchAdvancedAccount({
  handleClose, setData, rows,
}) {
  const [date, setDate] = useState('');
  const [query, setQuery] = useState('');

  function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, 'A');
    str = str.replace(/[àáâãäå]/, 'a');
    str = str.replace(/[ÙÚÛÜ]/, 'U');
    str = str.replace(/[úúûü]/, 'u');
    str = str.replace(/[ÈÉÊË]/, 'E');
    str = str.replace(/[éèêë]/, 'e');
    str = str.replace(/[íìîï]/, 'i');
    str = str.replace(/[ÍÌÎÏ]/, 'I');
    str = str.replace(/[óòôöõ]/, 'o');
    str = str.replace(/[ÓÒÔÖÕ]/, 'O');
    str = str.replace(/[Ç]/, 'C');
    str = str.replace(/[ç]/, 'c');

    // o resto

    return str.replace(/[^a-z0-9]/gi, '');
  }

  // eslint-disable-next-line max-len
  const filterTitle = rows?.filter(((item) => replaceSpecialChars(item?.title).toLowerCase().includes(replaceSpecialChars(query))));
  const filterDate = rows?.filter(((item) => item.date.includes(moment(date).format('MM-DD-YYYY'))));

  const handleData = () => {
    if (query !== '' && date === '') {
      setData(filterTitle);
      setQuery('');
    }
    if (date !== '' && query === '') {
      setData(filterDate);
      setDate('');
    }
    if (date !== '' && query !== '') {
      filterTitle?.forEach((obj) => {
        const filter = filterDate.filter(((item) => item.title.includes(obj.title)));
        setData(filter);
      });
      setDate('');
      setQuery('');
    }
    handleClose();
  };

  const handleClean = () => {
    setQuery('');
    setDate('');
  };

  const body = (
    <Box className="AcceptModal-ContainerModal">
      <div className="AcceptModal-text">
        <div className="AcceptModal-Question">Pesquisa Avançada</div>
      </div>
      <div className="AcceptModal-Buttons">
        <div className="AcceptModal-Bu">

          <label>Título:</label>

          <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="AcceptModal-Bu">

          <p> Data:</p>
          <input type="date" value={date} onChange={(e) => setDate(moment(e.target.value).format('DD-MM-YYYY'))} />
        </div>
        <div className="buttons">
          <div className="AcceptModal-button1">
            <button
              type="button"
              className="AcceptModal-ButtonCancel"
              onClick={() => {
                handleData();
              }}
            >
              <div className="AcceptModal-align">
                <p>Pesquisa Avançada</p>
              </div>
            </button>
          </div>
          <div className="AcceptModal-button2">
            <button
              className="AcceptModal-ButtonConfirm"
              type="button"
              onClick={handleClean}
            >
              <div className="AcceptModal-align">
                <p>Limpar</p>
              </div>
            </button>
          </div>
          <div className="AcceptModal-button3">
            <button type="button" className="AcceptModal-ButtonCancel" onClick={handleClose}>
              <div className="AcceptModal-align">
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

export default SearchAdvancedAccount;
