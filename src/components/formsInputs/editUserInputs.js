import { React } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function EditUserInputs({
  setDados,
  type,
  label,
  id,
  field,
  select,
  mask,
  dados,
  disabled,
}) {
  const handleChange = (value, entrada) => {
    setDados(value, entrada);
  };
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {type === 'date' && (
        <TextField
          id={id}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          InputLabelProps={{ shrink: true }}
          type={type}
          variant="standard"
          sx={{ m: 1, width: '22ch' }}

        />
      )}
      {mask && (
        <TextField
          id={id}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(mask(e.target.value), id)}
          label={label}
          type={type}
          InputLabelProps={{
            shrink: true,
          }}
          select={select}
          variant="standard"
          sx={{ m: 1, width: '22ch' }}

        />
      )}
      {select && (
        <TextField
          id={id}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          type={type}
          select={select}
          SelectProps={{
            native: true,
          }}
          variant="standard"
          sx={{ m: 1, width: '22ch' }}
        >
          {field
            && field.map((option) => (
              <option key={option.value} value={option.value} style={{ height: '36px' }}>
                {option.label}
              </option>
            ))}
        </TextField>
      )}
      {!mask && !(type === 'date') && !select && (
        <TextField
          id={id}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={disabled}
          label={label}
          type={type}
          variant="standard"
          multiline
          sx={{ m: 1, width: '22ch' }}
        />
      )}
    </Box>
  );
}
export default EditUserInputs;
