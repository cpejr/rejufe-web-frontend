/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './EditAccountModal.css';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';

export default function EditAccountModal({
  id,
  account,
  setUse,
  archive1,
}) {
  const [dados, setDados] = useState(account);
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
      await managerService.updateAccount(id, formData);
      toast.success('Dados editados!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setUse(true);
    } catch (error) {
      console.error(error);
      toast.error('Falha ao editar prestação de contas!!', {
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
    setDados({ ...dados, date: moment(account?.date, 'DD-MM-YYYY').format('YYYY-MM-DD') });
  }, []);

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
        <input className="EditModal-Input" placeholder="" require value={dados?.title} onChange={(e) => handleChange(e.target.value, 'title')} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Data:
        </div>
        <input type="date" className="EditModal-Input" placeholder="" value={dados?.date} onChange={(e) => handleChange(e.target.value, 'date')} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Descrição:
        </div>
        <input className="EditModal-Input" placeholder="" require value={dados?.description} onChange={(e) => handleChange(e.target.value, 'description')} />
        <div className="EditModal-text">
          Anexo:
        </div>
        { }
        <div className="EditModal-archive">
          <SingleFileUpload id="pdf" fileType=".pdf" dados={dados} archiveId={archive1} file={dados.pdf} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
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
