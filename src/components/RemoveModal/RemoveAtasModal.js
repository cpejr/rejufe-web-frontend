/* eslint-disable no-console */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import './RemoveAtasModal.css';
import * as managerService from '../../services/manager/managerService';

export default function RemoveMinutesModal({ id, setUse }) {
  async function handleSubmit() {
    try {
      await managerService.deleteMinute(id);
      toast.success('Atas/Edital Excluído!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setUse(true);
    } catch (error) {
      toast.error('Erro ao tentar deletar atas/edital!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
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
  return (
    <div>
      <button type="button" className="RemoveMinutesModal-RemoveGroup" onClick={handleOpen}>
        <DeleteIcon style={{ color: 'grey', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="RemoveMinutesModal-ContainerModal">
          <div className="RemoveMinutesModal-text">
            <div className="RemoveMinutesModal-Question">Tem certeza que deseja apagar atas/edital?</div>
          </div>
          <div className="RemoveMinutesModal-Buttons">
            <div className="RemoveMinutesModal-button1">
              <button type="button" className="RemoveMinutesModal-ButtonCancel" onClick={handleClose}>
                <div className="RemoveMinutesModal-align">
                  <p>Cancelar</p>
                  <span><HighlightOffIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} /></span>
                </div>
              </button>
            </div>
            <div className="RemoveMinutesModal-button2">
              <button
                className="RemoveMinutesModal-ButtonConfirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
                type="button"
              >
                <div className="RemoveMinutesModal-align">
                  <p>Confirmar</p>
                  <span><CheckCircleOutlineIcon size={22} style={{ color: '10c500', cursor: 'pointer', marginLeft: '5px' }} /></span>
                </div>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
