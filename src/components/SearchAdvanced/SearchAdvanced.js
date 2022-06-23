/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import './SearchAdvanced.css';

function SearchAdvanced({
  handleClose, setData, rows, dados, dataFilter,
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

    // o resto

    return str.replace(/[^a-z0-9]/gi, '');
  }

  function createData(name, cpf, status, allocation, acting, email) {
    return {
      name, cpf, status, allocation, acting, email,
    };
  }

  // eslint-disable-next-line max-len
  const filterName = rows?.filter(((item) => replaceSpecialChars(item?.name).toLowerCase().includes(replaceSpecialChars(query))));
  const filterType = [];
  if (dataFilter) {
    let auxFilterType = [];
    auxFilterType = dataFilter?.filter(((item) => item.judicial_section?.includes(type)));
    auxFilterType.forEach((object) => {
      filterType.push(createData(
        object.name,
        object.cell_phone_number,
        object.status,
        object.allocation,
        object.acting,
        object.email,
      ));
    });
  }
  if (dados) {
    let auxFilterType = [];
    auxFilterType = dados?.filter(((item) => item.allocation?.includes(type)));
    auxFilterType.forEach((object) => {
      filterType.push(createData(object.name, object.cpf, object.status));
    });
  }
  const handleData = () => {
    if (query !== '' && type === '') {
      setData(filterName);
      setQuery('');
    }
    if (type !== '' && query === '') {
      setData(filterType);
      setType('');
    }
    if (type !== '' && query !== '') {
      filterType?.forEach((obj) => {
        const filter = filterName.filter(((item) => item.allocation.includes(obj.type)));
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
    <Box className="associate-search-container-modal">
      <div className="associate-search-text">
        <div className="associate-search-advanced">Pesquisa Avançada</div>
      </div>
      <div className="associate-search-advanced-content">
        <div className="associate-search-advanced-labels">

          <label>Nome:</label>

          <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="associate-search-advanced-labels">

          <p> Seção Judiciária:</p>

          <select className="associate-search-advanced-select" value={type} placeholder="" onChange={(e) => setType(e.target.value)}>
            <option value=" "> </option>
            <option value="SE">SE</option>
            <option value="AL">AL</option>
            <option value="PE">PE</option>
            <option value="PB">PB</option>
            <option value="RN">RN</option>
            <option value="CE">CE</option>
          </select>
        </div>
        <div className="associate-search-advanced-buttons-align">
          <div className="associate-search-advanced-section-align">
            <button
              type="button"
              className="associate-search-advanced-button-submit"
              onClick={() => {
                handleData();
              }}
            >
              <div className="associate-search-advanced-button-align">
                <p>Pesquisa Avançada</p>
              </div>
            </button>
          </div>
          <div className="button-search-field">
            <button
              className="associate-search-advanced-button-clean"
              type="button"
              onClick={handleClean}
            >
              <div className="associate-search-advanced-button-align">
                <p>Limpar</p>
              </div>
            </button>
          </div>
          <div className="associate-search-advanced-button-return">
            <button type="button" className="associate-search-advanced-button-submit" onClick={handleClose}>
              <div className="associate-search-advanced-button-align">
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

export default SearchAdvanced;
