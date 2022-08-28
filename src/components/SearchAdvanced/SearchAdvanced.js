/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './SearchAdvanced.css';

function SearchAdvanced({
  handleClose, setData, dados, adminRegister, setIds, setSequentialIds,
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

  const handleData = () => {
    const initialValueFilteredData = {
      ids: [],
      senquentialIds: [],
      associates: [],
    };

    const filteredData = dados?.reduce((acc, associate) => {
      if (
        type
        && !(associate.judicial_section?.includes(type))
      ) {
        return acc;
      }

      if (
        query
        && !(replaceSpecialChars(associate?.name).toLowerCase().includes(replaceSpecialChars(query)))
      ) {
        return acc;
      }

      acc.ids.push(associate._id);
      acc.senquentialIds.push(associate.sequential_Id);

      if (adminRegister) {
        acc.associates.push({
          name: associate.name,
          cpf: associate.cpf,
          status: associate.status,
        });
      } else {
        acc.associates.push({
          name: associate.name,
          cell_phone_number: associate.cell_phone_number,
          status: associate.status,
          allocation: associate.allocation,
          acting: associate.acting,
          email: associate.email,
        });
      }

      return acc;
    }, initialValueFilteredData);

    setData(filteredData.associates);

    if (adminRegister) {
      setIds(filteredData.ids);
      setSequentialIds(filteredData.senquentialIds);
    }

    setQuery('');
    setType('');

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
