/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './EditComunicModal.css';

export default function EditComunicModal({ id, comunic, setUse }) {
  const [comunicNumber, setComunicNumber] = useState(comunic.number);
  const [comunicType, setComunicType] = useState(comunic.type);
  const [comunicDescription, setComunicDescription] = useState(comunic.description);
  const history = useHistory();

  async function handleNumberChange(event) {
    setComunicNumber(event.target.value);
  }

  async function handleTypeChange(event) {
    setComunicType(event.target.value);
  }

  async function handleDescriptionChange(event) {
    setComunicDescription(event.target.value);
  }

  async function handleSubmit() {
    try {
      await managerService.updateComunic(
        id,
        { number: comunicNumber, type: comunicType, description: comunicDescription },
      );
      toast.success('Dados editados!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setUse(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      history.push('/NotFound');
    }
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Box className="edit-comunic-modal-container-modal">
      <div role="button" tabIndex={0} className="edit-comunic-modal-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <div className="edit-comunic-modal-title">
        <p>Editar dados</p>
      </div>
      <div className="edit-comunic-modal-field">
        <div className="edit-comunic-modal-text">
          Status:
        </div>
        <select className="edit-comunic-modal-select" placeholder="" require value={comunicType} onChange={handleTypeChange}>
          <option value="COMUNICADO">COMUNICADO</option>
          <option value="INFORMATIVO">INFORMATIVO</option>
        </select>
      </div>
      <div className="edit-comunic-modal-field">
        <div className="edit-comunic-modal-text">
          Número:
        </div>
        <input className="edit-comunic-modal-input" placeholder="" require value={comunicNumber} onChange={handleNumberChange} />
      </div>
      <div className="edit-comunic-modal-field">
        <div className="edit-comunic-modal-text">
          Descrição:
        </div>
        <input className="edit-comunic-modal-input" placeholder="" require value={comunicDescription} onChange={handleDescriptionChange} />
      </div>
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
    </Box>
  );
  return (
    <div>
      <button type="button" className="edit-comunic-modal-edit-group" onClick={handleOpen}>
        <EditIcon style={{ size: '10', color: '#2F5C88', cursor: 'pointer' }} />
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
