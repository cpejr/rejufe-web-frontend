// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';

function Alternatives({ inputs, setInputs, initialErrorState }) {
  const [options, setOptions] = useState([
    { value1: '' },
    { value2: '' },
    { value3: '' },
    { value4: '' },
    { value5: '' },
    { value6: '' },
    { value7: '' },
    { value8: '' },
    { value9: '' },
    { value10: '' },
  ]);
  let alternatives;

  const setAlternatives = (remove) => {
    // eslint-disable-next-line array-callback-return
    alternatives = Object.values(options).map((option, index) => {
      if (index >= remove.index && options[index + 1] !== undefined) {
        console.log(index);
        console.log(option);
        console.log(options[index + 1]);
        setOptions({ ...options, [index]: options[index + 1] });
      }
    });
  };

  const handleDeleteAlternative = (remove) => {
    setInputs(inputs.filter((input) => input.name !== remove.name));
    setOptions({ ...options, [remove.index]: '' });
    let indexInput;
    // eslint-disable-next-line array-callback-return
    inputs.map((input) => {
      indexInput = inputs.indexOf(input);
      if (indexInput >= remove.index) {
        input.name = `Alternativa ${indexInput}`;
      }
    });

    setAlternatives(remove);
  };

  console.log(alternatives);
  console.log(options);

  function handleOptionChange(value, index) {
    setOptions({ ...options, [index]: value });
  }

  return (
    <div>
      {inputs?.map((input) => (
        <FormControl className="row-enquete">
          <div className="empty-div" />
          <InputLabel>
            {input.name}
          </InputLabel>
          <Input
            required
            error={initialErrorState.options}
            value={options[input.index].description}
            onChange={(e) => handleOptionChange(e.target.value, input.index)}
          />
          <div className="delete-button">
            <button
              type="button"
              className="delete-alternative"
              onClick={() => {
                handleDeleteAlternative(input);
              }}
            >
              <CloseIcon
                size={20}
                sx={[
                  {
                    color: '#264A6F',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: '#264A6F',
                      borderRadius: '5px',
                    },
                  },
                ]}
              />
            </button>
          </div>
        </FormControl>
      ))}
    </div>
  );
}

export default Alternatives;
