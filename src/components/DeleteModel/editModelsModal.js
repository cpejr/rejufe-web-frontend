/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './editModelsModal.css';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';

export default function EditModel({
  id, model,
}) {
  console.log(model);
  const [modelDescription, setModelDescription] = useState(model?.description);
  const [modelType, setModelType] = useState(model?.type);
  const [modelNumber, setModelNumber] = useState(model?.numberModel);

  async function handleDescriptionChange(event) {
    setModelDescription(event.target.value);
  }

  async function handleTypeChange(event) {
    setModelType(event.target.value);
  }

  async function handleNumberChange(event) {
    setModelNumber(event.target.value);
  }

  async function handleSubmit() {
    try {
      await managerService.updateModel(
        id,
        { description: modelDescription, type: modelType, number: modelNumber },
      );
      toast.success('Dados editados!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
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
    <Box className="EditModal-ContainerModal">
      <div role="button" tabIndex={0} className="EditModal-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <div className="EditModal-Title">
        <p>Editar dados</p>
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Número:
        </div>
        <input className="EditModal-Input" placeholder="" require value={modelNumber} onChange={handleNumberChange} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Descrição:
        </div>
        <input className="EditModal-Input" placeholder="" require value={modelDescription} onChange={handleDescriptionChange} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Tipo:
        </div>
        <select className="EditModal-Select" placeholder="" require value={modelType} onChange={handleTypeChange}>
          <option value="REQUERIMENTOS ADMINISTRATIVOS">REQUERIMENTOS ADMINISTRATIVOS</option>
          <option value="PETIÇÕES INICIAIS">PETIÇÕES INICIAIS</option>
          <option value="JURISPRUDÊNCIA">JURISPRUDÊNCIA</option>
        </select>
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Arquivo1:
        </div>
        <SingleFileUpload />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Arquivo2:
        </div>
        <SingleFileUpload />
      </div>
      <button
        className="EditModal-ButtonConfirm"
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
      <button type="button" className="EditModal-EditGroup" onClick={handleOpen}>
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
