import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import * as managerService from '../../../services/manager/managerService';
import './modalUsuario.css';

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
    width: '30%',
    backgroundColor: 'white',
    border: '2px solid #609694',
    borderRadius: '8px',
    boxShadow: theme.palette.color4,
    padding: '1% 1%',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:1424px)']: {
      width: '38%',
    },
    ['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
      width: '45%',
    },
    ['@media (max-width:850px)']: { // eslint-disable-line no-useless-computed-key
      width: '55%',
    },
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      width: '70%',
    },
    ['@media (max-width:538px)']: { // eslint-disable-line no-useless-computed-key
      width: '75%',
    },
    ['@media (max-width:450px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
  },

}));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 330,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

toast.configure();

export default function ModalAdmin({ users, setTypeChanged }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const changeUserType = async () => {
    try {
      await managerService.changeUserTypeById({
        type: 'administrador',
      }, value._id);
      setTypeChanged(true);
      toast('Tipo do associado atualizado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      toast.error('Não foi possível alterar o tipo do associado', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="Container-modal-user-module">
        <div className="Exit-user-module">
          <button
            className="Close-user-module"
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
        <div className="Column-user-module">
          <div className="Title-user-module">
            <h1>Selecione o associado que deseja tornar administrador</h1>
          </div>
          <ThemeProvider theme={theme}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setTypeChanged(false);
                setValue(newValue);
              }}
              disablePortal
              id="clear-on-escape"
              clearOnEscape
              options={users}
              getOptionLabel={(option) => option.user}
              sx={{
                width: {
                  xs: 260,
                  sm: 300,
                  md: 350,
                  lg: 350,
                  xl: 400,
                },
                marginBottom: '3%',
                marginTop: '2%',
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} label="Users" />}
            />
          </ThemeProvider>
        </div>
        <div className="Column-user-module">
          <div className="Title-user-module">
            <h1>Dados do associado</h1>
          </div>
          {value ? (
            <div>
              <div className="Data-row-user-module">
                <h1>
                  Nome:
                </h1>
                <h1>
                  {value?.name}
                </h1>
              </div>
              <div className="Data-row-user-module">
                <h1>
                  Status:
                </h1>
                <h1>
                  {value?.status}
                </h1>
              </div>
              <div className="Data-row-user-module">
                <h1>
                  Perfil:
                </h1>
                <h1>
                  {value?.type}
                </h1>
              </div>
              <div className="Data-row-user-module">
                <h1>
                  Atuação:
                </h1>
                <h1>
                  {value?.acting}
                </h1>
              </div>
              <div className="Data-row-user-module">
                <h1>
                  Seção:
                </h1>
                <h1>
                  {value?.allocation}
                </h1>
              </div>
            </div>
          ) : (
            <div className="Data-row-user-module">
              <h1>Nenhum associado selecionado</h1>
            </div>
          )}
        </div>
        <div>
          <button
            className="Confirm-user-module"
            type="button"
            onClick={() => {
              changeUserType();
              handleClose();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="Modal-open-button-user-module">
      <button
        type="button"
        onClick={handleOpen}
      >
        Novo
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
