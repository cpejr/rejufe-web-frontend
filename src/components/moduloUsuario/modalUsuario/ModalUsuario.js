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
    width: '60vw',
    height: '52vh',
    backgroundColor: 'white',
    border: '2px solid #609694',
    boxShadow: theme.palette.color4,
    padding: '2vh 1.5vw',
    ['@media (max-width:460px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
  },

}));

toast.configure();

export default function ModalAdmin({ rows }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const users = [];
  let i = 0;

  rows.forEach((user) => {
    users[i] = { label: user.name, id: user._id };
    i += 1;
  });

  const changeUserStatus = async () => {
    try {
      const response = await managerService.changeUserStatusById();
      console.log(response);
      setUsers(response);
      console.log(users);
    } catch (error) {
      toast.error('Credenciais inválidas!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  console.log(users[0]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="ContainerModal">
        <div className="Exit">
          <button
            className="Close"
            type="button"
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon size={30} />
          </button>
        </div>
        <div className="Row">
          <h1>Selecione o usuário que deseja tornar administrador</h1>
        </div>
        <div className="Row">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            sx={{ width: '40%' }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label="Users" />}
          />
        </div>
        <div className="Row">
          <button
            className="Confirm"
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
