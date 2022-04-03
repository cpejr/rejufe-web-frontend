/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
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
      console.error(error);
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
    <Box className="EditComunicModal-ContainerModal">
      <div role="button" tabIndex={0} className="EditComunicModal-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <div className="EditComunicModal-Title">
        <p>Editar dados</p>
      </div>
      <div className="EditComunicModal-field">
        <div className="EditComunicModal-text">
          Status:
        </div>
        <select className="EditComunicModal-Select" placeholder="" require value={comunicType} onChange={handleTypeChange}>
          <option value="COMUNICADO">COMUNICADO</option>
          <option value="INFORMATIVO">INFORMATIVO</option>
        </select>
      </div>
      <div className="EditComunicModal-field">
        <div className="EditComunicModal-text">
          Número:
        </div>
        <input className="EditComunicModal-Input" placeholder="" require value={comunicNumber} onChange={handleNumberChange} />
      </div>
      <div className="EditComunicModal-field">
        <div className="EditComunicModal-text">
          Descrição:
        </div>
        <input className="EditComunicModal-Input" placeholder="" require value={comunicDescription} onChange={handleDescriptionChange} />
      </div>
      <button
        className="EditComunicModal-ButtonConfirm"
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
      <button type="button" className="EditComunicModal-EditGroup" onClick={handleOpen}>
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
