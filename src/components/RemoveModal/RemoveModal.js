/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import './RemoveModal.css';
import * as managerService from '../../services/manager/managerService';

export default function RemoveModal({ id }) {
  async function handleSubmit() {
    try {
      await managerService.deleteAssociate(id);
      toast.success('Usuario removido!', {
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
  return (
    <div>
      <button type="button" className="RemoveModal-RemoveGroup" onClick={handleOpen}>
        <DeleteIcon size={22} style={{ color: 'grey', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="RemoveModal-ContainerModal">
          <div className="RemoveModal-text">
            <div className="RemoveModal-Question">Tem certeza que deseja apagar usuário?</div>
          </div>
          <div className="RemoveModal-Buttons">
            <div className="RemoveModal-button1">
              <button type="button" className="RemoveModal-ButtonCancel" onClick={handleClose}>
                <div className="RemoveModal-alinhar">
                  <p>Cancelar</p>
                  <span><HighlightOffIcon size={22} style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} /></span>
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
                <div className="RemoveModal-alinhar">
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
