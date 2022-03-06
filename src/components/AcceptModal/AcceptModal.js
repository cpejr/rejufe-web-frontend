/* eslint-disable no-console */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import './AcceptModal.css';
import * as managerService from '../../services/manager/managerService';

export default function AcceptModal({ id, setUse }) {
  async function handleSubmit() {
    try {
      await managerService.deleteAssociate(id);
      toast.success('Sócio aceito!', {
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
  return (
    <div>
      <button type="button" className="RemoveModal-RemoveGroup" onClick={handleOpen}>
        <CheckCircleRoundedIcon style={{ color: 'green', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="RemoveModal-ContainerModal">
          <div className="RemoveModal-text">
            <div className="RemoveModal-Question">Tem certeza que deseja aceitar sócio?</div>
          </div>
          <div className="RemoveModal-Buttons">
            <div className="RemoveModal-button1">
              <button type="button" className="RemoveModal-ButtonCancel" onClick={handleClose}>
                <div className="RemoveModal-align">
                  <p>Cancelar</p>
                  <span><HighlightOffIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} /></span>
                </div>
              </button>
            </div>
            <div className="RemoveModal-button2">
              <button
                className="RemoveModal-ButtonConfirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
                type="button"
              >
                <div className="RemoveModal-align">
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
