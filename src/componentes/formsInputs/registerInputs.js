import React from 'react';
import TextField from "@mui/material/TextField";

function RegisterInputs({
  setDados, type, label, id, field, select, required, initialErrorState

}) {

  const handleChange = (e, entrada) => {
    const { value } = e.target;
    setDados(value, entrada);
  };

  return (
    <TextField 
    required={required}
    id={id}
    error={initialErrorState[`${id}`]}
    onChange={(e) => handleChange(e, id)}
    label={label}
    type={type}
    select={select}
    SelectProps={{
        native: true,
      }}
    variant="standard"
    >
        {field
        && field.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
          </option>
        ))}
    </TextField>
  );
}
export default RegisterInputs;
