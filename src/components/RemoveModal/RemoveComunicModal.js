/* eslint-disable no-console */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import './RemoveComunicModal.css';
import * as managerService from '../../services/manager/managerService';

export default function RejectModal({ id, setUse }) {
  async function handleSubmit() {
    try {
      await managerService.deleteComunic(id);
      toast.success('Comunicado Excluído!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setUse(true);
    } catch (error) {
      toast.error('Erro ao tentar rejeitar sócio!', {
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
      <button type="button" className="RemoveComunicModal-RemoveGroup" onClick={handleOpen}>
        <DeleteIcon style={{ color: 'grey', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="RemoveComunicModal-ContainerModal">
          <div className="RemoveComunicModal-text">
            <div className="RemoveComunicModal-Question">Tem certeza que deseja apagar comunicado?</div>
          </div>
          <div className="RemoveComunicModal-Buttons">
            <div className="RemoveComunicModal-button1">
              <button type="button" className="RemoveComunicModal-ButtonCancel" onClick={handleClose}>
                <div className="RemoveComunicModal-align">
                  <p>Cancelar</p>
                  <span><HighlightOffIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} /></span>
                </div>
              </button>
            </div>
            <div className="RemoveComunicModal-button2">
              <button
                className="RemoveComunicModal-ButtonConfirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
                type="button"
              >
                <div className="RemoveComunicModal-align">
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
