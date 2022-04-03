/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './EditAccountModal.css';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';

export default function EditAccountModal({
  id,
  comunic,
  setUse,
  archive1,
}) {
  const [dados, setDados] = useState({});
  const accountDateInitial = moment(comunic.date).format('YYYY-MM-DD');
  const [accountDate, setAccountDate] = useState(accountDateInitial);
  const [accountTitle, setAccountTitle] = useState(comunic.title);
  // eslint-disable-next-line no-unused-vars
  const [accountDescription, setAccountDescription] = useState(comunic.description);

  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  async function handleDateChange(event) {
    setAccountDate(event.target.value);
  }

  async function handleTitleChange(event) {
    setAccountTitle(event.target.value);
  }

  async function handleDescriptionChange(event) {
    setAccountDescription(event.target.value);
  }

  async function handleSubmit() {
    try {
      await managerService.updateAccount(
        id,
        { date: accountDate, title: accountTitle, description: accountDescription },
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
          Título:
        </div>
        <input className="EditModal-Input" placeholder="" require value={accountTitle} onChange={handleTitleChange} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Data:
        </div>
        <input type="date" className="EditModal-Input" placeholder="" require value={accountDate} onChange={handleDateChange} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Descrição:
        </div>
        <input className="EditModal-Input" placeholder="" require value={accountDescription} onChange={handleDescriptionChange} />
        <div className="EditModal-text">
          Arquivo 1:
        </div>
        { }
        <div className="EditModal-archive">
          <SingleFileUpload id={archive1} fileType=".pdf" dados={dados} file={archive1} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
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
