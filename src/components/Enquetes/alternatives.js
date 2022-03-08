// eslint-disable-next-line no-unused-vars
import React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';

function Alternatives({ inputs, setInputs, initialErrorState }) {
  const [options, setOptions] = useState([
    {
      value1: '',
    },
    {
      value2: '',
    },
    {
      value3: '',
    },
    {
      value4: '',
    },
    {
      value5: '',
    },
    {
      value6: '',
    },
    {
      value7: '',
    },
    {
      value8: '',
    },
    {
      value9: '',
    },
    {
      value10: '',
    },
  ]);

  const handleDeleteAlternative = (remove) => {
    const indexRemoved = inputs.indexOf(remove);
    setInputs(inputs.filter((input) => input.name !== remove.name));
    let indexInput;
    // eslint-disable-next-line array-callback-return
    inputs.map((input) => {
      indexInput = inputs.indexOf(input);
      if (indexInput >= indexRemoved) {
        input.name = `Alternativa ${indexInput}:`;
      }
    });
  };

  function handleOptionChange(value, field) {
    setOptions({ ...options, [field]: value });
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
            value={options[input.index].description}
            onChange={(e) => handleOptionChange(e.target.value)}
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
