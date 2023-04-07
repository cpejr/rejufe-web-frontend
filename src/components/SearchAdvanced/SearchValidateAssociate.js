/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import './SearchValidateAssociate.css';

function SearchAdvancedAssociate({
  handleClose, setData, rows, dados,
}) {
  const [allocation, setAllocation] = useState('');
  const [query, setQuery] = useState('');
  const [acting, setActing] = useState('');

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

  function createData(name, cpf, status) {
    return {
      name, cpf, status,
    };
  }

  const filterName = rows?.filter(((item) => replaceSpecialChars(item?.name).toLowerCase().includes(replaceSpecialChars(query))));
  const filterAllocation = dados?.filter(((item) => item.allocation?.includes(allocation)));
  const filterActing = dados?.filter(((item) => replaceSpecialChars(item?.acting).toLowerCase().includes(replaceSpecialChars(acting))));
  const auxAssociate = [];
  const auxAllocation = [];
  filterActing.forEach((object) => {
    auxAssociate.push(createData(object.name, object.cpf, object.status));
  });
  filterAllocation.forEach((object) => {
    auxAllocation.push(createData(object.name, object.cpf, object.status));
  });

  const handleData = () => {
    if (query !== '' && allocation === '' && acting === '') {
      setData(filterName);
      setQuery('');
    }
    if (allocation !== '' && query === '' && acting === '') {
      setData(auxAllocation);
      setAllocation('');
    }
    if (allocation === '' && query === '' && acting !== '') {
      setData(auxAssociate);
      setActing('');
    }
    if (allocation !== '' && query !== '' && acting === '') {
      filterAllocation?.forEach((obj) => {
        const filter = filterName.filter(((item) => item.allocation.includes(obj.allocation)));
        setData(filter);
      });
      setAllocation('');
      setQuery('');
    }
    if (allocation !== '' && query === '' && acting !== '') {
      filterAllocation?.forEach((obj) => {
        const filter = filterActing.filter(((item) => item.allocation.includes(obj.allocation)));
        const auxFilter = [];
        filter.forEach((object) => {
          auxFilter.push(createData(object.name, object.cpf, object.status));
        });
        setData(auxFilter);
      });
      setAllocation('');
      setActing('');
    }
    if (allocation === '' && query !== '' && acting !== '') {
      filterName?.forEach((obj) => {
        const filter = auxAssociate.filter(((item) => item.name.toLowerCase().includes(obj.name.toLowerCase())));
        setData(filter);
      });
      setQuery('');
      setActing('');
    }
    if (allocation !== '' && query !== '' && acting !== '') {
      filterActing?.forEach((obj) => {
        const filter = filterAllocation.filter(((item) => item.acting.includes(obj.acting)));
        filter?.forEach((object) => {
          // eslint-disable-next-line max-len
          const addOtherFilter = filterName.filter(((item) => item.name.toLowerCase().includes(object.name.toLowerCase())));
          setData(addOtherFilter);
        });
      });
      setQuery('');
      setActing('');
    }
    if (query === '' && allocation === '' && acting === '') {
      setData(rows);
    }
    handleClose();
  };

  const handleClean = () => {
    setQuery('');
    setAllocation('');
    setActing('');
  };

  const modalAssociate = (
    <Box className="validate-associate-search-container-modal">
      <div className="validate-associate-search-text">
        <div className="validate-associate-search-advanced"><p>Pesquisa Avançada</p></div>
      </div>
      <div className="validate-associate-search-advanced-content">
        <div className="validate-associate-search-advanced-labels">

          <label>Nome:</label>

          <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>

        <div className="validate-associate-search-advanced-labels">

          <label>Atuação:</label>

          <input type="text" value={acting} onChange={(e) => setActing(e.target.value.toLowerCase())} />
        </div>
        <div className="validate-associate-search-advanced-labels">

          <label> Lotação:</label>
          <select className="validate-associate-search-advanced-select" value={allocation} placeholder="" onChange={(e) => setAllocation(e.target.value)}>
            <option value=""> </option>
            <option value="TRF 5">TRF 5</option>
            <option value="AL">Alagoas</option>
            <option value="CE">Ceará</option>
            <option value="PB">Paraíba</option>
            <option value="PE">Pernambuco</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="SE">Sergipe</option>
          </select>
        </div>
        <div className="validate-associate-search-advanced-buttons-align">
          <div className="validate-associate-search-advanced-section-align">
            <button
              type="button"
              className="validate-associate-search-advanced-button-submit"
              onClick={() => {
                handleData();
              }}
            >
              <div className="validate-associate-search-advanced-button-align">
                <p>Pesquisa Avançada</p>
              </div>
            </button>
          </div>
          <div className="button-search-field">
            <button
              className="validate-associate-search-advanced-button-clean"
              type="button"
              onClick={handleClean}
            >
              <div className="validate-associate-search-advanced-button-align">
                <p>Limpar</p>
              </div>
            </button>
          </div>
          <div className="validate-associate-search-advanced-button-return">
            <button type="button" className="validate-associate-search-advanced-button-submit" onClick={handleClose}>
              <div className="validate-associate-search-advanced-button-align">
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
      {modalAssociate}
    </div>
  );
}

export default SearchAdvancedAssociate;
