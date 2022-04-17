/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
// import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import './EditActionModal.css';
import SingleFileUpload from '../SingleFileUpload/SingleFileUpload';

export default function EditAccountModal({
  id,
  action,
  setUse,
  archive1,
  archive2,
}) {
  console.log('🚀 ~ file: EditAccountModal.js ~ line 20 ~ account', action);
  const [dados, setDados] = useState(action);
  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  async function handleSubmit() {
    const formData = new FormData();
    Object.entries(dados).forEach((dado) => {
      if (dado[0] === 'archive_1' || dado[0] === 'archive_2') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      } else {
        formData.append(dado[0], dado[1]);
      }
    });
    try {
      await managerService.updateAction(id, formData);
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
  console.log('🚀 ~ file: EditActionModal.js ~ line 25 ~ handleChange ~ dados', dados);
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
        <select className="EditModal-Input" placeholder="" require value={dados?.type} onChange={(e) => handleChange(e.target.value, 'type')}>
          <option value="ADMINISTRATIVAS">ADMINISTATIVAS</option>
          <option value="JUDICIAIS">JUDICIAIS</option>
        </select>
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Número:
        </div>
        <input className="EditModal-Input" placeholder="" value={dados?.numberAction} onChange={(e) => handleChange(e.target.value, 'numberAction')} />
      </div>
      <div className="EditModal-field">
        <div className="EditModal-text">
          Descrição:
        </div>
        <input className="EditModal-Input" placeholder="" require value={dados?.description} onChange={(e) => handleChange(e.target.value, 'description')} />
        <div className="EditModal-archive-container">
          <div className="EditModal-archive-text">
            <div className="EditModal-text">
              Arquivo 1:
            </div>
            { }
            <div className="EditModal-archive">
              <SingleFileUpload id="archive_1" fileType=".pdf" dados={dados} archiveId={archive1} file={dados.archive_1} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
            </div>
          </div>
          <div className="EditModal-archive-text">
            <div className="EditModal-text">
              Arquivo 2:
            </div>
            <div className="EditModal-archive">
              <SingleFileUpload id="archive_2" fileType=".pdf" dados={dados} archiveId={archive2} file={dados.archive_2} setDados={(value, entrada) => handleChange(value, entrada)} label="Arquivo" update />
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
