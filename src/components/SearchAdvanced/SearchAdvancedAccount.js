/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import './SearchAdvancedAccount.css';

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
    <Box className="account-search-container-modal">
      <div className="account-search-text">
        <div className="account-search-advanced">Pesquisa Avançada</div>
      </div>
      <div className="account-search-advanced-content">
        <div className="account-search-advanced-labels">

          <label>Título:</label>

          <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="account-search-advanced-labels">

          <p> Data:</p>
          <input type="date" value={date} onChange={(e) => setDate(moment(e.target.value).format('DD-MM-YYYY'))} />
        </div>
        <div className="account-search-advanced-buttons-align">
          <div className="account-search-advanced-section-align">
            <button
              type="button"
              className="account-search-advanced-button-submit"
              onClick={() => {
                handleData();
              }}
            >
              <div className="account-search-advanced-button-align">
                <p>Pesquisa Avançada</p>
              </div>
            </button>
          </div>
          <div className="button-search-field">
            <button
              className="account-search-advanced-button-clean"
              type="button"
              onClick={handleClean}
            >
              <div className="account-search-advanced-button-align">
                <p>Limpar</p>
              </div>
            </button>
          </div>
          <div className="account-search-advanced-button-return">
            <button type="button" className="account-search-advanced-button-submit" onClick={handleClose}>
              <div className="account-search-advanced-button-align">
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
