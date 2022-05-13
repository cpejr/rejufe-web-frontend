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
  id, model, archive1Id, archive2Id,
}) {
  const [dados, setDados] = useState(model);

  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  async function handleSubmit() {
    const formData = new FormData();
    Object.entries(dados).forEach((dado) => {
      if (dado[0] === 'pdf') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      } else {
        formData.append(dado[0], dado[1]);
      }
    });

    try {
      await managerService.updateModel(id, formData);
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
    <Box className="EditModal-model-container">
      <div role="button" tabIndex={0} className="EditModal-model-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <div className="EditModal-model-title">
        <p>Editar dados</p>
      </div>
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Número:
        </div>
        <input className="EditModal-model-input" placeholder="" require value={dados?.numberModel} onChange={(e) => handleChange(e.target.value, 'numberModel')} />
      </div>
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Descrição:
        </div>
        <input className="EditModal-model-input" placeholder="" require value={dados?.description} onChange={(e) => handleChange(e.target.value, 'description')} />
      </div>
      <div className="EditModal-model-field">
        <div className="EditModal-model-text">
          Tipo:
        </div>
        <select className="EditModal-model-select" placeholder="" require value={dados?.Type} onChange={handleChange}>
          <option value="REQUERIMENTOS ADMINISTRATIVOS">REQUERIMENTOS ADMINISTRATIVOS</option>
          <option value="PETIÇÕES INICIAIS">PETIÇÕES INICIAIS</option>
          <option value="JURISPRUDÊNCIA">JURISPRUDÊNCIA</option>
        </select>
      </div>
      <div className="EditModal-model-files">
        <div className="EditModal-model-field">
          <div className="EditModal-model-text">
            Arquivo1:
          </div>
          <SingleFileUpload id="pdf" fileType=".pdf" dados={dados} archiveId={archive1Id} file={dados.pdf} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
        </div>
        <div className="EditModal-model-field">
          <div className="EditModal-model-text">
            Arquivo2:
          </div>
          <SingleFileUpload id="pdf" fileType=".pdf" dados={dados} archiveId={archive2Id} file={dados.pdf} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
        </div>

      </div>
      <button
        className="EditModal-model-buttonConfirm"
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
      <button type="button" className="EditModal-model-editGroup" onClick={handleOpen}>
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
