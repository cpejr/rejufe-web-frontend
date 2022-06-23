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
    <Box className="AcceptModal-ContainerModal">
      <div className="AcceptModal-text">
        <div className="AcceptModal-Question">Pesquisa Avançada</div>
      </div>
      <div className="AcceptModal-Buttons">
        <div className="AcceptModal-Bu">

          <label>Nome:</label>

          <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="AcceptModal-Bu">

          <p> Seção Judiciária:</p>

          <select className="EditModal-Input" value={type} placeholder="" onChange={(e) => setType(e.target.value)}>
            <option value=" "> </option>
            <option value="SE">SE</option>
            <option value="AL">AL</option>
            <option value="PE">PE</option>
            <option value="PB">PB</option>
            <option value="RN">RN</option>
            <option value="CE">CE</option>
          </select>
        </div>
        <div className="buttons34">
          <div className="AcceptModal-button12">
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
          <div className="AcceptModal-button22">
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

export default SearchAdvanced;
