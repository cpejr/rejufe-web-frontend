import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import * as managerService from '../../services/manager/managerService';
import formsNews from '../../components/formsData/formsNews';
import UpdateNews from '../../components/formsInputs/updateNews';
import { initialNewsErrorState } from '../../components/initialStates/initialStates';

toast.configure();

function EditarRegistrosNoticias(news) {
  const [loading, setLoading] = useState(true);
  const [initialErrorState, setError] = useState(initialNewsErrorState);
  const [dados, setDados] = useState({});
  const formData = new FormData();
  const history = useHistory();
  const [archiveIds, setArchiveIds] = useState({});

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  const { location } = news;
  const { id } = location.state;

  async function getRecord() {
    try {
      const response = await managerService.getNewsById(id);
      setDados({
        date: response.date,
        description: response.description,
        type: response.type,
        title: response.title,
      });
      setArchiveIds({ archive_1: response.archive_1, archive_2: response.archive_2, photos: response.photos });
    } catch (error) {
      toast.error('Não foi possível obter notícia', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    Object.entries(dados).forEach((dado) => {
      if (dado[0] === 'archive_1' || dado[0] === 'archive_2' || dado[0] === 'photos') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      } else {
        formData.append(dado[0], dado[1]);
      }
    });

    try {
      setLoading(true);
      await managerService.updateRecord(id, formData);
      toast('Notícia editada com sucesso', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/administracao-registros-noticias');
    } catch (error) {
      toast.error('Falha ao editar notícia!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecord();
  }, [news]);

  return (
    <div>
      <div className="register-news-container">
        <h1 className="register-news-title"><div className="register-news-text-margin">Editar Notícia </div></h1>
        {
          loading ? (
            <div className="form-vote-quizz-container">
              <CircularProgress style={{ height: '100%' }} />
            </div>
          ) : (
            <>
              {(formsNews?.map((line) => (
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
                        archiveIds={archiveIds}
                      />
                    ))}
                  </div>
                </Box>
              )))}
              <LoadingButton variant="contained" loading={loading} style={{ backgroundColor: '#1C3854', marginBottom: '5%' }} onClick={(e) => handleSubmit(e)}>Editar Notícia</LoadingButton>
            </>
          )
        }
      </div>
    </div>
  );
}

export default EditarRegistrosNoticias;
