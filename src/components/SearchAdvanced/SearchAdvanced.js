/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './SearchAdvanced.css';

function SearchAdvanced({
  handleClose, setData, rows, dados, dataFilter,
}) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  /*  const [filter] = useState([]); */

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

  function createData(name, cpf, status, allocation, acting, email) {
    return {
      name, cpf, status, allocation, acting, email,
    };
  }

  function returnData(name, cpf, status) {
    return {
      name, cpf, status,
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
  let auxFilterType = [];
  if (dados) {
    auxFilterType = dados?.filter(((item) => item.judicial_section?.includes(type)));
    auxFilterType.forEach((object) => {
      filterType.push(returnData(object.name, object.cpf, object.status));
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
    const filter = [];
    if (type !== '' && query !== '') {
      let add = 0;
      filterType?.forEach((obj) => {
        const auxFilter = filterName.filter(((item) => item.name.includes(obj.name)));
        if (auxFilter[0] !== undefined) {
          const filterResult = auxFilter[0];
          filter[add] = filterResult;
          add += 1;
        }
      });
      setData(filter);
      setType('');
      setQuery('');
    }
    if (query === '' && type === '') {
      setData(rows);
    }
    handleClose();
  };

  const handleClean = () => {
    setQuery('');
    setType('');
  };
  const body = (
    <div className="associate-search-container-modal">
      <div className="associate-search-text">
        <div className="associate-search-advanced-title"><p>Pesquisa Avançada</p></div>
      </div>
      <div className="associate-search-advanced-content">
        <div className="associate-search-advanced-labels">

          <label>Nome:</label>

          <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="associate-search-advanced-labels">

          <label> Seção Judiciária:</label>

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
          <div className="button-search-field-associate">
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
    </div>
  );
  return (
    <div>
      {body}
    </div>
  );
}

export default SearchAdvanced;
