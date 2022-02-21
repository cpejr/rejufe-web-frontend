/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@mui/icons-material/Edit';
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
    const body = {
      name: associatesName,
      status: associateStatus,
      cpf: associateCpf,
    };

    try {
      await managerService.updateAssociate(id.id, { name: body.name, status: body.status, cpf: body.cpf });
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
    <div className="paper">
      <div className="ContainerModal">
        <div className="Row">
          <h1>Editar grupo</h1>
        </div>
        <div className="Row">
          <div className="Ajust">
            <div className="Ajust.Col1">
              Status:
            </div>
            <input placeholder="" require value={associateStatus} onChange={handleStatusChange} />
          </div>
        </div>
        <div className="Row">
          <div className="Ajust">
            <div className="Ajust.Col1">
              Nome:
            </div>
            <input placeholder="" require value={associatesName} onChange={handleNameChange} />
          </div>
        </div>
        <div className="Row">
          <div className="Ajust">
            <div className="Ajust.Col1">
              CPF:
            </div>
            <input placeholder="" require value={associateCpf} onChange={handleCpfChange} />
          </div>
        </div>
        <button
          className="ButtonConfirm"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
            handleClose();
          }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <button className="EditGroup" onClick={handleOpen}>
        <EditIcon size={22} style={{ color: '#AAABB0', cursor: 'pointer' }} />
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
