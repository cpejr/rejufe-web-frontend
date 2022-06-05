/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import EditModelInputs from './EditModalInputs';
import './EditAtasModal.css';

export default function EditMinutesModal({
  id, minutes, setUse, archive1Id, archive2Id,
}) {
  console.log(minutes);
  const [dados, setDados] = useState(minutes);
  const [minutesNumber, setMinutesNumber] = useState(minutes.number);
  const [minutesType, setMinutesType] = useState(minutes.type);
  const [minutesDescription, setMinutesDescription] = useState(minutes.description);
  const history = useHistory();

  async function handleNumberChange(event) {
    setMinutesNumber(event.target.value);
  }

  async function handleTypeChange(event) {
    setMinutesType(event.target.value);
  }

  async function handleDescriptionChange(event) {
    setMinutesDescription(event.target.value);
  }

  const titles = [
    { label: 'Tipo', field: 'select' },
    { label: 'Número:', field: 'input' },
    { label: 'Descrição:', field: 'input' },
  ];

  async function handleSubmit() {
    try {
      await managerService.updateMinute(
        id,
        { number: minutesNumber, type: minutesType, description: minutesDescription },
      );
      toast.success('Dados editados!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setUse(true);
    } catch (error) {
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
    <Box className="EditMinutesModal-ContainerModal">
      <div role="button" tabIndex={0} className="EditMinutesModal-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <div className="EditMinutesModal-Title">
        <p>Editar dados</p>
      </div>
      <div className="EditMinutesModal-field">
        <div className="EditMinutesModal-text">
          Status:
        </div>
        <select className="EditMinutesModal-Select" placeholder="" require value={minutesType} onChange={handleTypeChange}>
          <option value="ATAS">ATAS</option>
          <option value="EDITAL">EDITAL</option>
        </select>
      </div>
      <div className="EditMinutesModal-field">
        <div className="EditMinutesModal-text">
          Número:
        </div>
        <input className="EditMinutesModal-Input" placeholder="" require value={minutesNumber} onChange={handleNumberChange} />
      </div>
      <div className="EditMinutesModal-field">
        <div className="EditMinutesModal-text">
          Descrição:
        </div>
        <input className="EditMinutesModal-Input" placeholder="" require value={minutesDescription} onChange={handleDescriptionChange} />
      </div>
      <EditModelInputs
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        dados={dados}
        setDados={setDados}
      />
      <button
        className="EditMinutesModal-ButtonConfirm"
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
      <button type="button" className="EditMinutesModal-EditGroup" onClick={handleOpen}>
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
