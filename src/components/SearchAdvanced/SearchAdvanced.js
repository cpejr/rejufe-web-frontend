/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as managerService from '../../services/manager/managerService';
import './SearchAdvanced.css';

function SearchAdvanced({
  handleClose, setFilteredAssociates,
}) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');

  const handleClean = () => {
    setQuery('');
    setType('');
  };

  const handleData = async () => {
    const consultFlag = true; // Flag para pegar apenas os associados de status A e do tipo usuário
    const associates = await managerService.getAssociates(type, query, consultFlag);

    setFilteredAssociates(associates);

    handleClean();
    handleClose();
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
