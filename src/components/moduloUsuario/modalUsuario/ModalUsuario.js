import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
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
      width: '100%',
    },
  },

}));

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

  console.log(users);

  console.log(value);

  const changeUserType = async () => {
    try {
      const response = await managerService.changeUserTypeById({
        type: 'administrador',
      }, value._id);
      console.log(response);
      setTypeChanged(true);
      toast('Tipo do usuário atualizado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível alterar o tipo do usuário!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="ContainerModalUsuario">
        <div className="Exit">
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
        <div className="Column">
          <div className="Title-user-module">
            <h1>Selecione o usuário que deseja tornar administrador</h1>
          </div>
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
                xs: 300,
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
        </div>
        <div className="Column">
          <div className="Title-user-module">
            <h1>Dados do usuário</h1>
          </div>
          {value ? (
            <div>
              <div className="Data-row">
                <h1>
                  Nome:
                </h1>
                <h1>
                  {value.name}
                </h1>
              </div>
              <div className="Data-row">
                <h1>
                  Status:
                </h1>
                <h1>
                  {value.status}
                </h1>
              </div>
              <div className="Data-row">
                <h1>
                  Perfil:
                </h1>
                <h1>
                  {value.type}
                </h1>
              </div>
            </div>
          ) : (
            <div className="Data-row">
              <h1>Nenhum usuário selecionado</h1>
            </div>
          )}
        </div>
        <div className="Row">
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
    <div>
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
