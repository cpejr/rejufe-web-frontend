import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
// import * as managerService from '../../../services/manager/managerService';
import './modalEnquetes.css';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material';

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
    width: '25%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: theme.palette.color4,
    padding: '1% 1%',
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

toast.configure();

export default function ModalEnquete() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
              <Input />
            </FormControl>
            <FormControl>
              <InputLabel>Data de início </InputLabel>
              <Input type="Date" />
            </FormControl>
            <FormControl>
              <InputLabel>Data de fim </InputLabel>
              <Input type="Date" />
            </FormControl>
            <h1>Alternativas:</h1>
            <FormControl className="row-enquete">
              <InputLabel>Alternativa 1 </InputLabel>
              <Input />
            </FormControl>
            <FormControl className="row-enquete">
              <InputLabel>Alternativa 2 </InputLabel>
              <Input />
            </FormControl>
            <button type="button" className="plus-enquete">
              <AddIcon
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
            <div className="end-page-enquete">
              <button
                className="confirm-enquete"
                type="button"
                onClick={() => {
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
