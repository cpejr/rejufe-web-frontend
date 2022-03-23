import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import * as managerService from '../../services/manager/managerService';
import formsNews from '../../components/formsData/formsNews';
import UpdateNews from '../../components/formsInputs/updateNews';
import { initialNewsErrorState } from '../../components/initialStates/initialStates';

toast.configure();

function EditarRegistrosNoticias(news) {
  const [loading, setLoading] = useState(false);
  const [initialErrorState, setError] = useState(initialNewsErrorState);
  const [dados, setDados] = useState({});
  const history = useHistory();

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  const { location } = news;
  const { id } = location.state;

  async function getRecord() {
    try {
      const response = await managerService.getNewsById(id);
      setDados(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível obter notícia', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const body = {
        section: dados.section,
        type: dados.type,
        title: dados.title,
        description: dados.description,
        archive_1: dados.archive_1,
        archive_2: dados.archive_2,
        photos: dados.photos,
        status: dados.status,
        send_site: dados.send_site,
      };
      await managerService.updateRecord(body, id);
      toast('Usuário editado com sucesso', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/administracao-registros-noticias');
    } catch (error) {
      toast.error('Falha ao editar notícia!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      setLoading(false);
    }
    setLoading(false);
  }
  console.log('🚀 ~ file: EditarRegistrosNoticias.js ~ line 59 ~ handleSubmit ~  id', id);
  useEffect(() => {
    getRecord();
  }, [news]);

  return (
    <div>
      <div className="register-news-container">
        <h1 className="register-news-title"><div className="register-news-text-margin">Editar Notícia </div></h1>
        {formsNews?.map((line) => (
          <Box>
            <div className="register-news-text-field">
              {line?.items?.map((item) => (
                <UpdateNews
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
        <LoadingButton variant="contained" loading={loading} style={{ backgroundColor: '#1C3854', marginBottom: '5%' }} onClick={(e) => handleSubmit(e)}>Editar Notícia</LoadingButton>
      </div>
    </div>
  );
}

export default EditarRegistrosNoticias;
