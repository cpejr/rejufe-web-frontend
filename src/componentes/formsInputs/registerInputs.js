/* eslint-disable no-nested-ternary */
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function RegisterInputs({
  setDados,
  type,
  label,
  id,
  field,
  select,
  required,
  initialErrorState,
  mask,
  dados,
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
          sx={{ m: 1, width: '30ch' }}
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
          sx={{ m: 1, width: '30ch' }}
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
          sx={{ m: 1, width: '30ch' }}
        >
          {field.map((option) => (
            <MenuItem key={option.value} value={option.value} style={{ height: '36px' }}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      {!mask && !(type === 'date') && !select && (
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
          sx={{ m: 1, width: '30ch' }}
          helperText={initialErrorState[`${id}`] ? `Valor de ${label} inválido` : required ? 'Campo obrigatório' : ''}
        />
      )}
    </div>
  );
}
export default RegisterInputs;
