/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from '@material-ui/core/Modal';
import './SearchAtas.css';
import { useMediaQuery } from '@mui/material/';
import Box from '@mui/material/Box';

function SearchAtas({
  rows,
}) {
  // eslint-disable-next-line no-unused-vars
  const { register, setValue } = useForm();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [dados, setDados] = useState(rows);
  console.log('🚀 ~ file: SearchAtas.js ~ line 17 ~ type', type);
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [top, setData] = useState(rows);
  const matchesFont85 = useMediaQuery('(max-width:680px)');
  const matchesFont90 = useMediaQuery('(max-width:930px)');

  // eslint-disable-next-line no-unused-vars
  // let filter = [];
  const filterDescription = rows?.filter(((item) => item.description?.toLowerCase().includes(query)));
  const filterType = rows?.filter(((item) => item.type?.includes(type)));

  const [open, setOpen] = useState(false);
  const url = '/login';

  const handleOpen = () => {
    setOpen(true);
  };
  // const handleClean = () => {
  //   setType('');
  //   setQuery('');
  // };

  /* const handleData = () => {
    setData(filterDescription);
    const state = { top };
    console.log('🚀 ~ file: dashboardComponent.js ~ line 338 ~ tt', top);
    setOpen(false);
    history.push(state, '', url);
  }; */

  const handleClose = () => {
    setOpen(false);
  };

  console.log(query);

  console.log('🚀 ~ file: dashboardComponent.js ~ line 322 ~ filterType', filterType);
  console.log('🚀 ~ file: dashboardComponent.js ~ line 322 ~ filterType', filterDescription);

  console.log('🚀 ~ file: SearchAtas.js ~ line 88 ~ data', type, query);
  /*   useEffect(() => {
    setDados(filterDescription);
  }, [filterDescription]); */

  const buttonFontProps = {
    // eslint-disable-next-line no-nested-ternary
    style: matchesFont85
      ? {
        fontSize: '85%',
        backgroundColor: '#2574A9',
        color: 'white',
        padding: '6px',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          backgroundColor: '#2574A9',
          color: 'white',
        }
        : {
          fontSize: '100%',
          backgroundColor: '#2574A9',
          color: 'white',
        },
  };

  const body = (
    <Box className="AcceptModal-ContainerModal">
      <div className="AcceptModal-text">
        <div className="AcceptModal-Question">Pesquisa Avançada</div>
      </div>
      <div className="AcceptModal-Buttons">
        <div className="AcceptModal-Bu">

          <label>Descrição:</label>

          <input type="text" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="AcceptModal-Bu">

          <p> Tipo:</p>

          <select className="EditModal-Input" {...register('firstName')} placeholder="" onChange={(e) => setType(e.target.value)}>
            <option value="ATAS">ATAS</option>
            <option value="EDITAIS">EDITAIS</option>
          </select>
        </div>
        <div className="buttons">
          <div className="AcceptModal-button1">
            {/*   <button
              type="button"
              className="AcceptModal-ButtonCancel"
              onClick={() => {
                handleData();
              }} */}
            {/*    > */}
            <div className="AcceptModal-align">
              <Link to={{
                pathname: '/consulta-atas-editais',
                state: {
                  top,
                },
              }}
              >
                <p>Pesquisa Avançada</p>
              </Link>
            </div>
            {/*  </button> */}
          </div>
          <div className="AcceptModal-button2">
            <button
              className="AcceptModal-ButtonConfirm"
              onClick={() => setValue('firstName', '')}
              type="button"
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
      <Button
        {...buttonFontProps}
        sx={{
          marginRight: '15px',
          marginLeft: '15px',
        }}
        onClick={handleOpen} // botão para o modal
      >
        Pesquisa Avançada
        {/* TODO Implementar o botão de pesquisa avançada */}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default SearchAtas;
