/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import formsNews from '../../components/formsData/formsNews';
import RegisterInputs from '../../components/formsInputs/registerInputs';
import { initialNewsState, initialNewsErrorState } from '../../components/initialStates/initialStates';
import checkNewsData from '../../components/checkData/checkNewsData/checkNewsData';
import * as managerService from '../../services/manager/managerService';
import './CadastrarNoticias.css';

toast.configure();

function CadastrarNoticias() {
  const [initialErrorState, setError] = useState(initialNewsErrorState);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(initialNewsState);
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

    Object.entries(dados).forEach((dado) => {
      if (dado[0] === 'archive_1' || dado[0] === 'archive_2' || dado[0] === 'photos') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      } else {
        if (checkNewsData(dado[0], dado[1])) {
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
      await managerService.createNews(formData);
      toast.success('Notícia criada com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/administracao-registros-noticias');
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
    <div className="register-news-container">
      <h1 className="register-news-title"><div className="register-news-text-margin">Cadastro de Notícia</div></h1>
      {formsNews?.map((line) => (
        <Box>
          <div className="register-news-text-field">
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
      <LoadingButton variant="contained" loading={loading} style={{ backgroundColor: '#1C3854', marginBottom: '5%' }} onClick={(e) => handleSubmit(e)}>Cadastrar Notícia</LoadingButton>
    </div>
  );
}

export default CadastrarNoticias;
