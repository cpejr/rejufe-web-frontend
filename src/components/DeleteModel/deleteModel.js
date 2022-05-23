import React from 'react';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';

toast.configure();

function DeleteModel({ setOpen, id }) {
  const handleClose = () => {
    setOpen(false);
  };
  async function deleteModelById() {
    try {
      await managerService.deleteModel(id);
    } catch (error) {
      toast.error('Não foi possível deletar modelos', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }
  return (
    <button
      className="confirm-user-module-exclude"
      type="button"
      onClick={() => {
        deleteModelById();
        handleClose();
      }}
    >
      Confirmar
    </button>
  );
}

export default DeleteModel;
