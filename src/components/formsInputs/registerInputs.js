/* eslint-disable no-nested-ternary */
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';
import TextEditor from '../TextEditor/TextEditor';
import './registerInputs.css';

function RegisterInputs({
  setDados,
  type,
  fileType,
  label,
  id,
  field,
  select,
  required,
  initialErrorState,
  mask,
  dados,
  news,
}) {
  const handleChange = (value, entrada) => {
    setDados(value, entrada);
  };

  return (
    <div>
      {type === 'date' && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          InputLabelProps={{ shrink: true }}
          type={type}
          variant="standard"
          sx={{ m: 1, width: '70%' }}
          helperText={initialErrorState[`${id}`] ? `Valor de ${label} inválido` : required ? 'Campo obrigatório' : ''}
        />
      )}
      {mask && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(mask(e.target.value), id)}
          label={label}
          type={type}
          select={select}
          variant="standard"
          sx={{ m: 1, width: '70%' }}
          helperText={initialErrorState[`${id}`] ? `Valor de ${label} inválido` : required ? 'Campo obrigatório' : ''}
        />
      )}
      {select && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          type={type}
          select={select}
          variant="standard"
          helperText={`Selecione uma opção de ${label}`}
          sx={{ m: 1, width: '70%' }}
        >
          {field.map((option) => (
            <MenuItem key={option.value} value={option.value} style={{ height: '36px' }}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      {!mask && !(type === 'date') && !(type === 'file') && !(type === 'empty') && !select && (
        <>
          {news && label === 'Descrição' ? (
            <div className="news-description-field">
              <h3>Descrição *</h3>
              <TextEditor id={id} setDados={setDados} dados={dados} />
            </div>
          ) : (
            <TextField
              required={required}
              id={id}
              error={initialErrorState[`${id}`]}
              value={dados[`${id}`]}
              onChange={(e) => handleChange(e.target.value, id)}
              label={label}
              type={type}
              variant="standard"
              multiline
              sx={{ m: 1, width: '70%' }}
              helperText={initialErrorState[`${id}`] ? `Valor de ${label} inválido` : required ? 'Campo obrigatório' : ''}
            />
          )}
          <div />
        </>
      )}
      {type === 'empty' && (
        <div />
      )}
      {type === 'file' && (
        <SingleFileUpload
          field={field}
          fileType={fileType}
          file={dados[`${field}`]}
          dados={dados}
          setDados={setDados}
          label={label}
        />
      )}
    </div>
  );
}
export default RegisterInputs;
