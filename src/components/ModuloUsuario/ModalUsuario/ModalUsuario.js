import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import './modulUsuario.css';

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

export default function ModalAdmin() {
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
          <h1>Dados da loja</h1>
        </div>
        <div className="Row">
          <h1>Busca</h1>
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
