import React from 'react';
import TextField from '@mui/material/TextField';

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
          SelectProps={{
            native: true,
          }}
          type={type}
          select={select}
          variant="standard"
          sx={{ m: 1, width: '30ch' }}
        >
          {field
            && field.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
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
        />
      )}
    </div>
  );
}
export default RegisterInputs;
