/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, makeStyles, Button } from '@material-ui/core';
import './CadastrarNoticias.css';

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
  },
}));

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}

function CadastrarNoticias() {
  const [files, setFiles] = useState([]);
  const classes = useStyles();

  function onDelete(file) {
    setFiles((curr) => curr.filter((fw) => fw.preview !== file));
  }

  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({
      file, preview: URL.createObjectURL(file), errors: [], id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*', 'video/*', '.pdf'],
    maxSize: 300 * 1024, // 300KB
  });

  function handleSubmit() {
    const formData = new FormData();

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append(file.file.name, file.file);
      });
    }

    formData.append('img', 'vapinho do irineu');

    // eslint-disable-next-line no-restricted-syntax
    for (const key of formData.entries()) {
      console.log(`${key[0]}, ${key[1]}`);
    }

    console.log('🚀 ~ file: CadastrarNoticias.js ~ line 57 ~ files.forEach ~ formData', formData);
    // try {
    //   await api.post('/product', formData);
    //   setAtt(!att);
    //   notification.open({
    //     message: 'Sucesso!',
    //     description:
    //       'O registro do produto foi concluído com sucesso.',
    //     className: 'ant-notification',
    //     top: '100px',
    //     style: {
    //       width: 600,
    //     },
    //   });
    //   closeModal();
    // } catch (error) {
    //   console.error(error);
    //   notification.open({
    //     message: 'Erro!',
    //     description:
    //       'Erro ao cadastrar o produto',
    //     className: 'ant-notification',
    //     top: '100px',
    //     style: {
    //       width: 600,
    //     },
    //   });
    // }
  }

  return (
    <Grid item>
      <div className="App">
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p>Arraste e solte os arquivos aqui</p>
        </div>
        {files.map((file) => (
          <div key={file.name}>
            <div>
              <img src={file.preview} style={{ width: '200px' }} alt="preview" />
              <Button size="small" onClick={() => onDelete(file.preview)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button size="small" onClick={() => handleSubmit()}>
          Teste
        </Button>

      </div>
    </Grid>
  );
}

export default CadastrarNoticias;
