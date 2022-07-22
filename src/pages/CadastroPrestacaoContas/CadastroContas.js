/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import formsContas from '../../components/formsData/formsContas';
import RegisterInputs from '../../components/formsInputs/registerInputs';
import { initialAccountabilityState, initialAccountabilityErrorState } from '../../components/initialStates/initialStates';
import checkContasData from '../../components/checkInfosData/checkContasData';
import * as managerService from '../../services/manager/managerService';
import './CadastroContas.css';

toast.configure();

function CadastroContas() {
  const [initialErrorState, setError] = useState(initialAccountabilityErrorState);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(initialAccountabilityState);
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
      if (dado[0] === 'archive_1') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      }
      if (checkContasData(dado[0], dado[1])) {
        checkError = 1;
        aux[dado[0]] = true;
      }
      formData.append(dado[0], dado[1]);
    });
    if (checkError === 1) {
      setError({ ...aux });
      setLoading(false);
      return;
    }
    try {
      await managerService.createAccountability(formData);
      toast.success('Conta criada com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/administracao-registros-acoes');
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
    <div className="register-accountability-container">
      <h1 className="register-accountability-title"><div className="register-accountability-text-margin">Cadastrar Prestação de Contas</div></h1>
      {formsContas?.map((line) => (
        <Box>
          <div className="register-accountability-text-field">
            {line?.items?.map((item) => (
              <RegisterInputs
                type={item.type}
                fileType={item.fileType}
                id={item.id}
                label={item.label}
                field={item.field}
                required={item.required}
                setDados={(value, entrada) => handleChange(value, entrada)}
                initialErrorState={initialErrorState}
                dados={dados}
              />
            ))}
          </div>
        </Box>
      ))}
      <LoadingButton className="register-accountability-button" variant="contained" loading={loading} style={{ backgroundColor: '#1C3854', marginBottom: '5%' }} onClick={(e) => handleSubmit(e)}>Cadastrar Conta</LoadingButton>
    </div>
  );
}

export default CadastroContas;
