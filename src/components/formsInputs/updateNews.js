/* eslint-disable no-nested-ternary */
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';

function UpdateNews({
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
}) {
  console.log('🚀 ~ file: updateNews.js ~ line 20 ~ fileType', fileType);
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
          InputLabelProps={{ shrink: true }}
          type={type}
          variant="standard"
          sx={{ m: 1, width: '30ch' }}
          helperText={initialErrorState[`${id}`] ? `Valor de ${label} inválido` : required ? `${label}: obrigatório` : ''}
        />
      )}
      {mask && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(mask(e.target.value), id)}
          type={type}
          select={select}
          variant="standard"
          sx={{ m: 1, width: '30ch' }}
          helperText={initialErrorState[`${id}`] ? `Valor de ${label} inválido` : required ? `${label}: obrigatório` : ''}
        />
      )}
      {select && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`] !== undefined ? dados[`${id}`] : ' '}
          onChange={(e) => handleChange(e.target.value, id)}
          type={type}
          select={select}
          label={label}
          variant="standard"
          helperText={`Selecione uma opção de ${label}`}
          sx={{ m: 1, width: '30ch' }}
        >
          {field.map((option) => (
            <MenuItem key={option.value} value={option.value} style={{ height: '36px' }}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      {!mask && !(type === 'date') && !(type === 'file') && !(type === 'empty') && !select && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          type={type}
          variant="standard"
          multiline
          sx={{ m: 1, width: '30ch' }}
          helperText={initialErrorState[`${id}`] ? `Valor de ${label} inválido` : required ? `${label}: obrigatório` : ''}
        />
      )}
      {type === 'empty' && (
        <div />
      )}
      {type === 'file' && (
        <SingleFileUpload id={id} field="archive_1" fileType={fileType} dados={dados} file={dados[`${id}`]} setDados={setDados} label={label} update />
      )}
    </div>
  );
}
export default UpdateNews;
