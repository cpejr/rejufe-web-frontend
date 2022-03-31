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
    height: theme.spacing(10),
    outline: 'none',
    marginBottom: '1%',
    marginRight: '4%',
    marginLeft: '4%',
  },
}));

function SingleFileUpload({
  id, fileType, dados, file, setDados, label, update,
}) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [actualFile, setActualFile] = useState();
  const [image, setImage] = useState();

  async function getFile() {
    try {
      const response = await managerService.getFileById(file);
      setActualFile(response);
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível obter arquivo', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  async function getImage() {
    try {
      const response = await managerService.getImageById(file);
      setImage(response);
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível obter imagem', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  function getDownloads() {
    try {
      managerService.download(file).then((response) => {
        FileSaver.saveAs(response, id);
      });
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível baixar o arquivo', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  if (update === true) {
    useEffect(() => {
      if (id === 'photos' && file !== '' && file !== undefined) {
        getImage();
      }
      if ((id === 'archive_1' || id === 'archive_2') && file !== undefined) {
        getFile();
      }
    }, [file]);
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
    setDados({ file: accFiles[0], url: URL.createObjectURL(accFiles[0]) }, id);
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
        </div>
      </Grid>
      {file && (
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
                  {update === true && label === 'Arquivo' && file !== 'undefined' ? (
                    <Button variant="primary" onClick={() => getDownloads()}>
                      Arquivo atual
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
            <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%' }} onClick={() => setDados(undefined, id)}>
              Remover Arquivo
            </Button>
          </div>
        </Grid>
      )}
    </Grid>
  );
}

export default SingleFileUpload;
