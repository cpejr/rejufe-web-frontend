/* eslint-disable no-console */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import './RejectModal.css';
import * as managerService from '../../services/manager/managerService';

export default function RejectModal({ id, setUse }) {
  async function handleSubmit() {
    try {
      await managerService.deleteExternalAssociate(id);
      toast.success('Associado rejeitado!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setUse(true);
    } catch (error) {
      toast.error('Erro ao tentar rejeitar associado!', {
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
      <button type="button" className="RejectModal-RemoveGroup" onClick={handleOpen}>
        <CancelRoundedIcon style={{ color: 'red', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="RejectModal-ContainerModal">
          <div className="RejectModal-text">
            <div className="RejectModal-Question">Tem certeza que deseja rejeitar associado?</div>
          </div>
          <div className="RejectModal-Buttons">
            <div className="RejectModal-button1">
              <button type="button" className="RejectModal-ButtonCancel" onClick={handleClose}>
                <div className="RejectModal-align">
                  <p>Cancelar</p>
                  <span><HighlightOffIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} /></span>
                </div>
              </button>
            </div>
            <div className="RejectModal-button2">
              <button
                className="RejectModal-ButtonConfirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
                type="button"
              >
                <div className="RejectModal-align">
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
