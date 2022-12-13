/* eslint-disable no-console */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import './RemoveQuizzModal.css';
import * as managerService from '../../services/manager/managerService';

export default function RemoveQuizzModal({ id }) {
  async function handleSubmit() {
    try {
      await managerService.deleteQuizz(id);
      toast.success('Quizz deletado!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      toast.error('Não foi possível deletar quizz', {
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
  return (
    <div>
      <button type="button" className="RemoveQuizzModal-RemoveGroup" onClick={handleOpen}>
        <DeleteIcon style={{ color: 'grey', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="RemoveQuizzModal-ContainerModal">
          <div className="RemoveQuizzModal-text">
            <div className="RemoveQuizzModal-Question">Tem certeza que deseja apagar o quizz?</div>
          </div>
          <div className="RemoveQuizzModal-Buttons">
            <div className="RemoveQuizzModal-button1">
              <button type="button" className="RemoveQuizzModal-ButtonCancel" onClick={handleClose}>
                <div className="RemoveQuizzModal-align">
                  <p>Cancelar</p>
                  <span><HighlightOffIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} /></span>
                </div>
              </button>
            </div>
            <div className="RemoveQuizzModal-button2">
              <button
                className="RemoveQuizzModal-ButtonConfirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
                type="button"
              >
                <div className="RemoveQuizzModal-align">
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
