/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './EditActionModal.css';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';

export default function EditActionModal({
  id,
  comunic,
  setUse,
  archive1,
  archive2,
}) {
  console.log(comunic);
  const [dados, setDados] = useState({});
  const [comunicNumber, setComunicNumber] = useState(comunic.number);
  const [comunicType, setComunicType] = useState(comunic.type);
  // eslint-disable-next-line no-unused-vars
  const [comunicDescription, setComunicDescription] = useState(comunic.description);
  console.log(comunic);

  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

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
      await managerService.updateAction(
        id,
        { numberAction: comunicNumber, type: comunicType, description: comunicDescription },
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
    <Box className="EditModal-ContainerModal">
      <div role="button" tabIndex={0} className="EditModal-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <div className="EditModal-Title">
        <p>Editar dados</p>
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Tipo:
        </div>
        <select className="EditModal-Select" placeholder="" require value={comunicType} onChange={handleTypeChange}>
          <option value="ADMINISTRATIVAS">ADMINISTATIVAS</option>
          <option value="JUDICIAIS">JUDICIAIS</option>
        </select>
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Número:
        </div>
        <input className="EditModal-Input" placeholder="" require value={comunicNumber} onChange={handleNumberChange} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Descrição:
        </div>
        <input className="EditModal-Input" placeholder="" require value={comunicDescription} onChange={handleDescriptionChange} />
        <div className="EditModal-archive-container">
          <div className="EditModal-archive-text">
            <div className="EditModal-text">
              Arquivo 1:
            </div>
            { }
            <div className="EditModal-archive">
              <SingleFileUpload id={archive1} fileType=".pdf" dados={dados} file={archive1} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
            </div>
          </div>
          <div className="EditModal-archive-text">
            <div className="EditModal-text">
              Arquivo 2:
            </div>
            <div className="EditModal-archive">
              <SingleFileUpload id={archive2} action={comunic} fileType=".pdf" dados={dados} file={archive2} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
            </div>
          </div>
        </div>
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
