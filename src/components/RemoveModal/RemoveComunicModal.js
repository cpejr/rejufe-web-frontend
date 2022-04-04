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
      toast.error('Erro ao tentar excluir comunicado/informativo!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      // eslint-disable-next-line no-console
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
      <button type="button" className="remove-comunic-modal-remove-group" onClick={handleOpen}>
        <DeleteIcon style={{ color: 'grey', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="remove-comunic-modal-container-modal">
          <div className="remove-comunic-modal-text">
            <div className="remove-comunic-modal-question">Tem certeza que deseja apagar comunicado?</div>
          </div>
          <div className="remove-comunic-modal-buttons">
            <div className="remove-comunic-modal-button1">
              <button type="button" className="remove-comunic-modal-button-cancel" onClick={handleClose}>
                <div className="remove-comunic-modal-align">
                  <p>Cancelar</p>
                  <span><HighlightOffIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} /></span>
                </div>
              </button>
            </div>
            <div className="remove-comunic-modal-button2">
              <button
                className="remove-comunic-modal-button-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
                type="button"
              >
                <div className="remove-comunic-modal-align">
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
