/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './EditModal.css';

export default function EditModal(id) {
  const [associatesName, setAssociateName] = useState(id.associate.name);
  const [associateStatus, setAssociatesStatus] = useState(id.associate.status);
  const [associateCpf, setAssociateCpf] = useState(id.associate.cpf);

  async function handleNameChange(event) {
    setAssociateName(event.target.value);
  }

  async function handleStatusChange(event) {
    setAssociatesStatus(event.target.value);
  }

  async function handleCpfChange(event) {
    setAssociateCpf(event.target.value);
  }

  async function handleSubmit() {
    try {
      await managerService.updateAssociate(
        id.id,
        { name: associatesName, status: associateStatus, cpf: associateCpf },
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
      <div className="EditModal-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <div className="EditModal-Title">
        <p>Editar dados</p>
      </div>
      <div className="EditModal-campos">
        <div className="EditModal-text">
          Status:
        </div>
        <select className="EditModal-Select" placeholder="" require value={associateStatus} onChange={handleStatusChange}>
          <option value="A">A</option>
          <option value="E">E</option>
        </select>
      </div>
      <div className="EditModal-campos">
        <div className="EditModal-text">
          Nome:
        </div>
        <input className="EditModal-Input" placeholder="" require value={associatesName} onChange={handleNameChange} />
      </div>
      <div className="EditModal-campos">
        <div className="EditModal-text">
          CPF:
        </div>
        <input className="EditModal-Input" placeholder="" require value={associateCpf} onChange={handleCpfChange} />
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
        <EditIcon size={22} style={{ color: '#2F5C88', cursor: 'pointer' }} />
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
