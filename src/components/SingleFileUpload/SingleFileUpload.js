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
    outline: 'none',
    marginBottom: '1%',
    marginRight: '4%',
    marginLeft: '4%',
  },
}));
const useStyle = makeStyles(() => ({
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%',
    marginRight: '4%',
    marginLeft: '4%',
  },
}));

function SingleFileUpload({
  fileType, dados, file, setDados, label, update, archiveId, field,
}) {
  const classes = useStyles();
  const buttonArchive = useStyle();
  // eslint-disable-next-line no-unused-vars
  const [actualFile, setActualFile] = useState();
  const [image, setImage] = useState();

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
      if (field === 'photos' && file !== '' && file !== undefined) {
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
    maxSize: 300 * 1024, // 300KB
  });

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ marginBottom: '1%' }}>
      <Grid item>
        <div>
          <div {...getRootProps({ className: classes.dropzone })}>
            <input {...getInputProps()} />
            {update === true && label === 'Imagem' && file !== '' ? (
              <img src={`data:image;base64,${image}`} style={{ width: '125px' }} alt="" />
            ) : (
              <p>
                Arraste e solte a/o
                {' '}
                {`${label}`}
                {' '}
                aqui
              </p>
            )}
          </div>
          {update === true && archiveId !== undefined && dados.pdf === undefined && (
            <div {...buttonArchive.dropzone}>
              {file === undefined && (
                <>
                  <Button style={{ alignItems: 'center', justifyContent: 'center', marginTop: '2%' }} variant="primary" onClick={() => getDownloads()}>
                    Baixar arquivo atual
                    {' '}
                    <PictureAsPdfIcon />
                  </Button>
                  <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados('', field)}>
                    Remover Arquivo
                  </Button>
                </>
              )}
              <div />
            </div>
          )}
          {dados.pdf && (
            <div {...buttonArchive.dropzone}>
              <div className="register-news-align-test">
                {file?.file?.path}
                {' '}
                <PictureAsPdfIcon />
              </div>
              <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados('', 'pdf')}>
                Remover Arquivo
              </Button>
            </div>
          )}

        </div>
      </Grid>
      {
        file && dados.pdf === undefined && (
          <Grid item>
            <div key={file.url}>
              {label === 'Imagem'
                ? (
                  <div>
                    <img src={file.url} style={{ width: '200px' }} alt="preview" />
                  </div>
                )
                : (
                  <>
                    {update === true && archiveId !== undefined ? (
                      <Button variant="primary" onClick={() => getDownloads()}>
                        Download
                        {' '}
                        <PictureAsPdfIcon />
                      </Button>
                    ) : (
                      <div className="register-news-align-test">
                        {file?.file?.path}
                        {' '}
                        <PictureAsPdfIcon />
                      </div>
                    )}
                    <div />
                  </>
                )}
              <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados(undefined, field)}>
                Remover Arquivo
              </Button>
            </div>
          </Grid>
        )
      }
    </Grid>
  );
}

export default SingleFileUpload;
