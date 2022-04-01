import React, { useState } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CreateQuizz from './createQuizz';

function Alternatives({
  initialErrorState, dados, users, setError, setNewQuizz, voterSection,
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
    setInputs(inputs?.filter((input) => input !== inputs[inputs.length - 1]));
    setOptions({ ...options, [inputs.length - 1]: '' });
  };

  function handleOptionChange(value, index) {
    setOptions({ ...options, [index]: value });
  }

  const handleAddAlternative = () => {
    const alternativeNumber = inputs.length + 1;
    setInputs(inputs.concat([{ name: `Alternativa ${alternativeNumber}`, index: alternativeNumber - 1 }]));
  };

  return (
    <div className="alternative-inputs-quizz">
      {inputs?.map((input) => (
        <FormControl>
          <div className="empty-div-alternatives-modal-quizz" />
          <InputLabel
            shrink
            sx={{ fontSize: 22 }}
            className="input-forms-create-quizz"
          >
            {input.name}
          </InputLabel>
          <Input
            required
            error={initialErrorState.options}
            value={options[input.index].description}
            onChange={(e) => handleOptionChange(e.target.value, input.index)}
          />
          <div className="delete-button-modal-quizz">
            <button
              type="button"
              className="delete-alternative-modal-quizz"
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
        className="plus-button-modal-quizz"
        onClick={() => {
          handleAddAlternative();
        }}
      >
        <AddIcon
          size={40}
          sx={[
            {
              color: '#3A404C',
              marginRight: '5px',
              '&:hover': {
                color: 'white',
                backgroundColor: '#3A404C',
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
        inputs={inputs}
        setNewQuizz={setNewQuizz}
        voterSection={voterSection}
      />
    </div>
  );
}

export default Alternatives;
