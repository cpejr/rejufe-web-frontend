/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import * as managerService from '../../services/manager/managerService';
import EditModelInputs from './EditModalInputs';
import './EditComunicModal.css';

toast.configure();

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
    justifyContent: 'stretch',
  },
  content: {
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
      width: '80%',
    },
  },

}));

export default function EditComunicModal({
  id, comunic, archive1Id, archive2Id, setUse, page,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [dados, setDados] = useState(comunic);
  const history = useHistory();
  const formData = new FormData();

  const titles = [
    { label: 'Status:', field: 'select' },
    { label: 'Número:', field: 'input' },
    { label: 'Descrição:', field: 'input' },
  ];

  const select = [
    'COMUNICADO',
    'INFORMATIVO',
  ];

  async function handleSubmit() {
    Object.entries(dados).forEach((dado) => {
      if (dado[0] === 'archive_1' || dado[0] === 'archive_2') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      } else {
        formData.append(dado[0], dado[1]);
      }
    });

    try {
      await managerService.updateComunic(id, formData);
      toast.success('Dados editados!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setDados(comunic);
      setUse(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      history.push('/NotFound');
      toast.error('Não foi possível editar o comunicado/informativo', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setDados(comunic);
  }, [page, comunic]);

  const body = (
    <div style={modalStyle} className={classes.content}>
      <div className="edit-comunic-modal-container-modal">
        <div role="button" tabIndex={0} className="edit-comunic-modal-cancel" onClick={handleClose}>
          <CancelIcon />
        </div>
        <div className="edit-comunic-modal-title">
          <p>Editar dados</p>
        </div>
        <EditModelInputs
          dados={dados}
          setDados={setDados}
          archive1Id={archive1Id}
          archive2Id={archive2Id}
          titles={titles}
          select={select}
          setUse={setUse}
        />
        <button
          className="edit-comunic-modal-ButtonConfirm"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
            handleClose();
          }}
          type="button"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <button type="button" className="edit-comunic-modal-edit-group" onClick={handleOpen}>
        <EditIcon style={{ color: '#2F5C88', cursor: 'pointer' }} />
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
