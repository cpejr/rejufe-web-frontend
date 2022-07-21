import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import RegisterInputs from '../../components/formsInputs/registerInputs';
import { initialModelsState, initialModelsErrorState } from '../../components/initialStates/initialStates';
import checkModelsData from '../../components/checkModelsData/checkModelsData';
import * as managerService from '../../services/manager/managerService';
import './CadastrarModelos.css';
import formsModels from '../../components/formsData/formsModels';

toast.configure();

function CadastrarModelos() {
  const [initialErrorState, setError] = useState({ ...initialModelsErrorState });
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState({ ...initialModelsState });
  const history = useHistory();

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const aux = { ...initialErrorState };
    let checkError = 0;

    Object.entries(dados)?.forEach(([key, value]) => {
      if (key === 'archive_1' || key === 'archive_2') {
        value = value ? value?.file : '';
        formData.append(key, value);
      } else {
        if (checkModelsData(key, value)) {
          checkError = 1;
          aux[key] = true;
        }
        formData.append(key, value);
      }
    });
    try {
      await managerService.createModels(formData);
      toast.success('Modelo criado com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/administracao-registros-modelos');
      setLoading(false);
    } catch (error) {
      toast.error('Preencha todos os campos corretamente!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });

      if (checkError === 1) {
        setError({ ...aux });
        setLoading(false);
        return;
      }
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="register-models-container">
      <h1 className="register-models-title"><div className="register-models-text-margin">Cadastro de Modelos</div></h1>
      {formsModels?.map((line) => (
        <Box>
          <div className="register-models-text-field">
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
                initialErrorState={initialErrorState}
                dados={dados}
              />
            ))}
          </div>
        </Box>
      ))}
      <LoadingButton className="register-models-button" variant="contained" loading={loading} style={{ backgroundColor: '#1C3854', marginBottom: '5%' }} onClick={(e) => handleSubmit(e)}>Cadastrar Modelos</LoadingButton>
    </div>
  );
}

export default CadastrarModelos;
