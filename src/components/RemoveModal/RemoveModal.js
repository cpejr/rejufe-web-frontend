/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
// import api from '../../utils/api';
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
      <button className="RemoveGroup" onClick={handleOpen}>
        <DeleteIcon size={22} style={{ color: '#AA4545', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="paper">
          <div className="ContainerModal">
            <div className="Row">
              <div className="TitleModal">Apagar usuário</div>
            </div>
            <div className="Ajust">
              <div className="Row">
                <button className="ButtonCancel" onClick={handleClose}>Cancelar</button>
              </div>
              <div className="Row">
                <button
                  className="ButtonConfirm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    handleClose();
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
