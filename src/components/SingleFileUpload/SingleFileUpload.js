/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { Grid, makeStyles } from '@material-ui/core';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';
import FileSaver from 'file-saver';
import * as managerService from '../../services/manager/managerService';

toast.configure();

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: '50px',
    width: '100%',
    outline: 'none',
    marginBottom: '1%',
  },
}));
function SingleFileUpload({
  fileType, dados, file, setDados, label, update, archiveId, field,
}) {
  const classes = useStyles();
  const [image, setImage] = useState();
  const [updateImage, setUpdateImage] = useState(false);
  function example() { return image ? <img style={{ width: '95%' }} src={`data:image/jpeg;base64,${image}`} alt="" /> : null; }

  async function getImage() {
    try {
      const response = await managerService.getImageById(archiveId);
      setImage(response);
    } catch (error) {
      toast.error('Não foi possível obter imagem', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  function getDownloads() {
    try {
      managerService.download(archiveId).then((response) => {
        FileSaver.saveAs(response, field);
      });
    } catch (error) {
      toast.error('Não foi possível baixar o arquivo', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  if (update === true) {
    useEffect(() => {
      if (field === 'photos' && archiveId) {
        getImage();
      }
    }, [file, archiveId]);
  }

  const onDrop = useCallback((accFiles, rejFiles) => {
    if (rejFiles.length > 0) {
      toast.warn('Arquivo Inválido', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      return;
    }
    if (accFiles.length > 1) {
      toast.warn('Apenas um arquivo por vez', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      return;
    }
    setDados({ file: accFiles[0], url: URL.createObjectURL(accFiles[0]) }, field);
  }, [dados]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: [`${fileType}`],
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ marginBottom: '1%' }}>
      <Grid item style={{ width: '65%' }}>
        <div>
          {update === true && label === 'Imagem' && !updateImage && file !== '' && (
            <>
              {image && example()}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%',
                  }}
                  onClick={() => {
                    setUpdateImage(true);
                  }}
                >
                  Alterar imagem
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#1C3854', marginBottom: '5%', marginTop: '2%',
                  }}
                  onClick={() => {
                    setDados('', field);
                  }}
                >
                  Remover Imagem
                </Button>
              </div>
            </>
          )}
          {(file !== '' || updateImage) && (
            <>
              <div {...getRootProps({ className: classes.dropzone })}>
                <input {...getInputProps()} />
                <p>
                  Arraste e solte a/o
                  {' '}
                  {`${label}`}
                  {' '}
                  aqui
                </p>
              </div>
              {updateImage && (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%',
                  }}
                  onClick={() => {
                    setUpdateImage(false);
                  }}
                >
                  cancelar
                </Button>
              )}
            </>
          )}
          {update === true && archiveId !== undefined && dados.pdf === undefined && label === 'Arquivo' && (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            }}
            >
              {(file === undefined || file === archiveId) && archiveId && (
                <>
                  <Button
                    style={{
                      alignItems: 'center', justifyContent: 'center', marginTop: '2%', width: '100%',
                    }}
                    variant="primary"
                    onClick={() => getDownloads()}
                  >
                    Baixar arquivo atual
                    {' '}
                    <PictureAsPdfIcon style={{ marginLeft: '1%' }} />
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%',
                    }}
                    onClick={() => {
                      setDados('', field);
                    }}
                  >
                    Remover Arquivo
                  </Button>
                </>
              )}
              <div />
            </div>
          )}
          {file === '' && (
            <>
              <h3 style={{ fontFamily: 'Roboto', fontWeight: '100', marginTop: '2%' }}>Confirme para remover o arquivo/imagem</h3>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%',
                }}
                onClick={() => {
                  setDados(archiveId, field);
                }}
              >
                cancelar
              </Button>
            </>
          )}
          {typeof file === 'object' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', marginTop: '3%', marginBottom: '1%',
                }}
              >
                {file?.file?.path}
                {' '}
                {label === 'Arquivo' && (
                  <PictureAsPdfIcon />
                )}
              </div>
              {label === 'Arquivo' ? (
                <>
                  <PictureAsPdfIcon />
                  <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados(undefined, field)}>
                    Remover Arquivo
                  </Button>
                </>
              ) : (
                <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados(undefined, field)}>
                  Remover Imagem
                </Button>
              )}
            </div>
          )}
          {dados.pdf && (
            <div div className="file-upload-download-file">
              <div className="register-news-align-test">
                {file?.file?.path}
                {' '}
                <PictureAsPdfIcon />
              </div>
              <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados(undefined, 'pdf')}>
                Remover Arquivo
              </Button>
            </div>
          )}

        </div>
      </Grid>
    </Grid>
  );
}

export default SingleFileUpload;
