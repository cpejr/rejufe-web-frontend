/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import formsAtas from '../../components/formsData/formsAtas';
import RegisterInputs from '../../components/formsInputs/registerInputs';
import { initialAtasState, initialAtasErrorState } from '../../components/initialStates/initialStates';
import checkAtasData from '../../components/checkComunicData/checkComunicData';
import * as managerService from '../../services/manager/managerService';
import './CadastrarAtas.css';

toast.configure();

function CadastrarAtas() {
  const [initialErrorState, setError] = useState(initialAtasErrorState);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(initialAtasState);
  const history = useHistory();

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const aux = initialErrorState;
    let checkError = 0;

    Object.entries(dados)?.forEach((dado) => {
      if (dado[0] === 'archive_1' || dado[0] === 'archive_2') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      } else {
        if (checkAtasData(dado[0], dado[1])) {
          checkError = 1;
          aux[dado[0]] = true;
        }
        formData.append(dado[0], dado[1]);
      }
    });

    if (checkError === 1) {
      setError({ ...aux });
      setLoading(false);
      return;
    }

    try {
      await managerService.createAtas(formData);
      toast.success('Atas/Edital criado com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/consulta-atas');
      setLoading(false);
    } catch (error) {
      toast.error('Preencha todos os campos corretamente!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="register-comunic-container">
      <h1 className="register-comunic-title"><div className="register-comunic-text-margin">Cadastro de Atas/Editais</div></h1>
      {formsAtas?.map((line) => (
        <Box>
          <div className="register-comunic-text-field">
            {line?.items?.map((item) => (
              <RegisterInputs
                type={item.type}
                fileType={item.fileType}
                id={item.id}
                label={item.label}
                field={item.field}
                select={item.select}
                required={item.required}
                setDados={(value, entrada) => handleChange(value, entrada)}
                mask={item.mask}
                initialErrorState={initialErrorState}
                dados={dados}
              />
            ))}
          </div>
        </Box>
      ))}
      <LoadingButton className="register-comunic-button" variant="contained" loading={loading} style={{ backgroundColor: '#1C3854', marginBottom: '5%' }} onClick={(e) => handleSubmit(e)}>Cadastrar Atas/Edital</LoadingButton>
    </div>
  );
}

export default CadastrarAtas;
