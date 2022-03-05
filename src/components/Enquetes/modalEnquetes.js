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
import { initialQuizzState } from '../../componentes/initialStates/initialQuizzStates';

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
    { name: 'Alternativa 1' },
  ]);
  const [dados, setDados] = useState(initialQuizzState);
  // const [options, setOptions] = useState([]);

  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  const options = [
    { alternativa: 'Julia ' },
    { alternativa: 'Nikole' },
  ];
  // function handleOptionsChange(value, field) {
  //   setOptions({ ...options, [field]: value });
  // }

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
    setInputs(inputs.concat([{ name: `Alternativa ${alternativeNumber}` }]));
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

  const getUsers = async () => {
    if (voterSection.some((elem) => elem === 'Todos os associados')) {
      try {
        const response = await managerService.getAllUsers();
        let count = 0;
        response.forEach((user) => {
          users[count] = user.id;
          count += 1;
        });
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
        response.forEach((user) => {
          console.log(user.id);
          users[count] = user.id;
          count += 1;
        });
      } catch (error) {
        toast.error('Não foi possível obter usuários!!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
  };

  console.log(dados);

  const createQuizz = async () => {
    try {
      console.log('oi');
      const body = {
        title: dados.title,
        toVote: users,
        openingDate: dados.openingDate,
        closingDate: dados.closingDate,
        // eslint-disable-next-line object-shorthand
        options: options,
      };
      await managerService.createQuizz(body);
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
                value={dados.title}
                onChange={(e) => handleChange(e.target.value, 'title')}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Data de início </InputLabel>
              <Input
                required
                type="Date"
                value={dados.openingDate}
                onChange={(e) => handleChange(e.target.value, 'openingDate')}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Data de fim </InputLabel>
              <Input
                required
                type="Date"
                value={dados.closingDate}
                onChange={(e) => handleChange(e.target.value, 'closingDate')}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="select-voter">Selecione quem irá votar</InputLabel>
              <Select
                required
                labelId="select-voter"
                id="multiple-chip"
                value={voterSection}
                onChange={handleSectionChange}
                multiple
                input={<Input id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  // selected.filter('Todos os associados') ? (
                  //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  //     <Chip key="Todos os associados" label="Todos os associados" />
                  //   </Box>
                  // ) : (
                  //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  //     {selected.map((value) => (
                  //       <Chip key={value} label={value} />
                  //     ))}
                  //   </Box>
                  // )
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
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
                  value={dados.options}
                  onChange={(e) => handleChange(e.target.value, 'options')}
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
                  handleClose();
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
