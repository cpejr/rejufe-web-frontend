// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CreateQuizz from './createQuizz';

function Alternatives({
  initialErrorState, dados, users, setError,
}) {
  const [inputs, setInputs] = useState([
    {
      name: 'Alternativa 1',
      index: 0,
    },
  ]);

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

  const handleDeleteAlternative = (remove) => {
    if (remove.index !== inputs.length - 1) {
      return;
    }
    setInputs(inputs.filter((input) => input !== inputs[inputs.length - 1]));
    setOptions({ ...options, [inputs.length - 1]: '' });
  };

  console.log(options);

  function handleOptionChange(value, index) {
    setOptions({ ...options, [index]: value });
  }

  const handleAddAlternative = () => {
    const alternativeNumber = inputs.length + 1;
    setInputs(inputs.concat([{ name: `Alternativa ${alternativeNumber}`, index: alternativeNumber - 1 }]));
  };

  return (
    <div className="alternative-inputs-enquete">
      {inputs?.map((input) => (
        <FormControl>
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
      <button
        type="button"
        className="plus-enquete"
        onClick={() => {
          handleAddAlternative();
        }}
      >
        <AddIcon
          size={30}
          sx={[
            {
              color: '#264A6F',
              marginRight: '5px',
              '&:hover': {
                color: 'white',
                backgroundColor: '#264A6F',
                borderRadius: '5px',
              },
            },
          ]}
        />
        Adicionar alternativa
      </button>
      <CreateQuizz
        dados={dados}
        initialErrorState={initialErrorState}
        users={users}
        setError={setError}
        options={options}
      />
    </div>
  );
}

export default Alternatives;
