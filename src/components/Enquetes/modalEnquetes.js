import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
// import * as managerService from '../../../services/manager/managerService';
import './modalEnquetes.css';

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
    height: '55vh',
    backgroundColor: 'white',
    border: '2px solid #609694',
    boxShadow: theme.palette.color4,
    padding: '1% 1%',
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
    ['@media (max-width:1150px)']: { // eslint-disable-line no-useless-computed-key
      height: '45vh',
    },
  },

}));

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
    <div style={modalStyle} className={classes.paper}>
      <div className="ContainerModalUsuario">
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
          <h1>Insira as informações da nova enquete</h1>
        </div>
        <div className="Row">
          <h1>Título: </h1>
          <input />
        </div>
        <div className="Row">
          <h1>Data de início: </h1>
          <input type="date" />
        </div>
        <div className="Row">
          <h1>Data de fim: </h1>
          <input type="date" />
        </div>
        <div className="Row">
          <h1>Data de fim: </h1>
          <input type="date" />
        </div>
        <div className="Row">
          <h1>Alternativa 1: </h1>
          <input />
        </div>
        <div className="Row">
          <h1>Alternativa 2: </h1>
          <input />
        </div>
        <button type="button">
          <AddIcon />
        </button>
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
