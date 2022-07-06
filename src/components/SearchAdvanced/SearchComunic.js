/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import './SearchComunic.css';

function SearchComunic({
  handleClose, setData, rows,
}) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');

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

    return str.replace(/[^a-z0-9]/gi, '');
  }

  // eslint-disable-next-line max-len
  const filterDescription = rows?.filter(((item) => replaceSpecialChars(item?.description).toLowerCase().includes(replaceSpecialChars(query))));
  const filterType = rows?.filter(((item) => item.type?.includes(type)));

  const handleData = () => {
    if (query !== '' && type === '') {
      setData(filterDescription);
      setQuery('');
    }
    if (type !== '' && query === '') {
      setData(filterType);
      setType('');
    }
    if (type !== '' && query !== '') {
      filterType?.forEach((obj) => {
        const filter = filterDescription?.filter(((item) => item.type.includes(obj.type)));
        setData(filter);
      });
      setType('');
      setQuery('');
    }
    handleClose();
  };

  const handleClean = () => {
    setQuery('');
    setType('');
  };
  const body = (
    <Box className="comunic-search-container-modal">
      <div className="comunic-search-text">
        <div className="comunic-search-advanced"><p>Pesquisa Avançada</p></div>
      </div>
      <div className="comunic-search-advanced-content">
        <div className="comunic-search-advanced-labels">

          <label>Descrição:</label>

          <input type="text" setFilterValue onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="comunic-search-advanced-labels">

          <p> Tipo:</p>

          <select className="comunic-search-advanced-select" setFilterType placeholder="" onChange={(e) => setType(e.target.value)}>
            <option value=" "> </option>
            <option value="INFORMATIVO">INFORMATIVO</option>
            <option value="COMUNICADO">COMUNICADO</option>
          </select>
        </div>
        <div className="comunic-search-advanced-buttons-align">
          <div className="comunic-search-advanced-section-align">
            <button
              type="button"
              className="comunic-search-advanced-button-submit"
              onClick={() => {
                handleData();
              }}
            >
              <div className="comunic-search-advanced-button-align">
                <p>Pesquisa Avançada</p>
              </div>
            </button>
          </div>
          <div className="button-search-field-comunic">
            <button
              className="comunic-search-advanced-button-clean"
              type="button"
              onClick={handleClean}
            >
              <div className="comunic-search-advanced-button-align">
                <p>Limpar</p>
              </div>
            </button>
          </div>
          <div className="comunic-search-advanced-button-return">
            <button type="button" className="comunic-search-advanced-button-submit" onClick={handleClose}>
              <div className="comunic-search-advanced-button-align">
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

export default SearchComunic;
