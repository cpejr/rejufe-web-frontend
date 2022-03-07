import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
import './modalEnquetes.css';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import * as managerService from '../../services/manager/managerService';
import { initialQuizzState, initialQuizzErrorState } from './initialQuizzStates';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: '40%',
    backgroundColor: 'white',
    maxHeight: '95%',
    borderRadius: '8px',
    boxShadow: theme.palette.color4,
    padding: '1% 1%',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:900px)']: {
      width: '60%',
    },
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
    ['@media (max-width:1150px)']: { // eslint-disable-line no-useless-computed-key
    },
  },

}));

const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '5%',
          height: '50px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: '80%',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#264A6F',
          fontWeight: '600',
        },
      },
    },
  },
});

// let alternative = 2;

toast.configure();

export default function ModalEnquete() {
  const users = [];
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState([
    {
      name: 'Alternativa 1',
      index: 0,
    },
  ]);
  // const [options, setOptions] = useState([]);

  const [dados, setDados] = useState(initialQuizzState);
  const [initialErrorState, setError] = useState(initialQuizzErrorState);

  const alternatives = [
    {
      description: 'Julia ',
      votes: 1,
    },
    {
      description: 'Nikole',
      votes: 2,
    },
    {
      description: 'Davi',
      votes: 3,
    },
    {
      description: 'Monique',
      votes: 4,
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [voterSection, setVoterSection] = useState([]);
  const handleSectionChange = (event) => {
    const {
      target: { value },
    } = event;
    setVoterSection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const sections = [
    'SE',
    'AL',
    'PE',
    'PB',
    'RN',
    'CE',
  ];

  const handleAddAlternative = () => {
    const alternativeNumber = inputs.length + 1;
    setInputs(inputs.concat([{ name: `Alternativa ${alternativeNumber}`, index: alternativeNumber - 1 }]));
  };

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

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  // function handleOptionChange(value) {
  //   setOptions(options.concat([{ description: value, votes: 0 }]));
  // }

  const getUsers = async () => {
    if (voterSection.some((elem) => elem === 'Todos os associados')) {
      try {
        const response = await managerService.getAllUsers();
        let count = 0;
        console.log(response);
        response.forEach((user) => {
          users[count] = user._id;
          count += 1;
        });
        console.log(users);
      } catch (error) {
        console.log(error);
        toast.error('Não foi possível obter usuários!!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } else if (voterSection.length !== 0) {
      try {
        const response = await managerService.getUsersBySection(voterSection);
        let count = 0;
        console.log(response);
        response.forEach((user) => {
          console.log(user.id);
          users[count] = user._id;
          count += 1;
        });
      } catch (error) {
        console.log(error);
        toast.error('Não foi possível obter usuários!!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
  };

  const createQuizz = async () => {
    const aux = initialErrorState;
    let checkError = 0;

    if (dados.title?.length === 0) {
      aux.title = true;
      checkError = 1;
      toast.error('Título inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (dados.openingDate?.length === 0) {
      aux.openingDate = true;
      checkError = 1;
      toast.error('Data inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (dados.closingDate?.length === 0) {
      aux.closingDate = true;
      checkError = 1;
      toast.error('Data inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (users?.length === 0) {
      aux.toVote = true;
      checkError = 1;
      toast.error('Sessão inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    // if (dados.title?.length === 0) {
    //   aux.title = true;
    //   checkError = 1;
    //   toast.error('Título inválido!!', {
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     autoClose: 5000,
    //   });
    // }

    if (checkError === 1) {
      setError({ ...aux });
      return;
    }

    try {
      console.log('oi');
      const body = {
        title: dados.title,
        toVote: users,
        openingDate: dados.openingDate,
        closingDate: dados.closingDate,
        // eslint-disable-next-line object-shorthand
        options: alternatives,
      };
      console.log(body);
      const response = await managerService.createQuizz(body);
      console.log(response);
      toast.success('Enquete criada com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível criar enquete!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [voterSection]);

  const body = (
    <ThemeProvider theme={theme}>
      <div style={modalStyle} className={classes.paper}>
        <div className="container-modal-enquete">
          <div className="exit-enquete">
            <button
              className="close-enquete"
              type="button"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon
                size={30}
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
          <div className="title-modal-enquete">
            <h1>Insira as informações da nova enquete</h1>
          </div>
          <div className="form-enquete">
            <FormControl>
              <InputLabel>Título</InputLabel>
              <Input
                required
                error={initialErrorState.title}
                value={dados.title}
                onChange={(e) => handleChange(e.target.value, 'title')}
                // eslint-disable-next-line no-nested-ternary
              />
            </FormControl>
            <FormControl>
              <InputLabel>Descrição</InputLabel>
              <Input
                required
                error={initialErrorState.description}
                value={dados.description}
                onChange={(e) => handleChange(e.target.value, 'description')}
                // eslint-disable-next-line no-nested-ternary
              />
            </FormControl>
            <FormControl>
              <InputLabel>Data de início </InputLabel>
              <Input
                required
                error={initialErrorState.openingDate}
                type="Date"
                value={dados.openingDate}
                onChange={(e) => handleChange(e.target.value, 'openingDate')}
                // eslint-disable-next-line no-nested-ternary
                helperText={initialErrorState.openingDate ? 'Valor de data inválida' : ''}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Data de fim </InputLabel>
              <Input
                required
                error={initialErrorState.closingDate}
                type="Date"
                value={dados.closingDate}
                onChange={(e) => handleChange(e.target.value, 'closingDate')}
                // eslint-disable-next-line no-nested-ternary
                helperText="Valor inválido"
              />
            </FormControl>
            <FormControl>
              <InputLabel id="select-voter">Selecione quem irá votar</InputLabel>
              <Select
                required
                error={initialErrorState.toVote}
                labelId="select-voter"
                id="multiple-chip"
                value={voterSection}
                onChange={handleSectionChange}
                multiple
                input={<Input id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  selected.some((elem) => elem === 'Todos os associados') ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip key="Todos os associados" label="Todos os associados" />
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )

                )}
                // eslint-disable-next-line no-nested-ternary
                helperText={initialErrorState.toVote ? 'Valor de sessão inválida' : ''}
              >
                <MenuItem key="Todos os associados" value="Todos os associados">Todos os associados</MenuItem>
                {sections.map((section) => (
                  <MenuItem
                    key={section}
                    value={section}
                  >
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {inputs?.map((input) => (
              <FormControl className="row-enquete">
                <div className="empty-div" />
                <InputLabel>
                  {input.name}
                </InputLabel>
                <Input
                  required
                  error={initialErrorState.options}
                  // value={options[input.index].description}
                  // onChange={(e) => handleOptionChange(e.target.value)}
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
            <div className="end-page-enquete">
              <button
                className="confirm-enquete"
                type="submit"
                onClick={() => {
                  createQuizz();
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
      >
        Criar
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
