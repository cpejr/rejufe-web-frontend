import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
// import * as managerService from '../../../services/manager/managerService';
import './modalEnquetes.css';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

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
      <div className="container-modal-enquete">
        <div className="exit-enquete">
          <button
            className="close-enquete"
            type="button"
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon size={30} />
          </button>
        </div>
        <div className="title-modal-enquete">
          <InputLabel>Insira as informações da nova enquete</InputLabel>
        </div>
        <div className="fields-enquete">
          <div className="column-enquete">
            <div className="row-enquete">
              <InputLabel>Título</InputLabel>
              <Input />
            </div>
            <div className="row-enquete">
              <InputLabel>Data de início </InputLabel>
              <Input type="Date" />
            </div>
            <div className="row-enquete">
              <InputLabel>Data de fim </InputLabel>
              <Input type="Date" />
            </div>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="column-enquete">
            <div className="row-enquete">
              <InputLabel>Alternativa 1 </InputLabel>
              <Input />
            </div>
            <div className="row-enquete">
              <InputLabel>Alternativa 2 </InputLabel>
              <Input />
            </div>
            <button type="button">
              <AddIcon />
            </button>
            <div className="row-enquete">
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
