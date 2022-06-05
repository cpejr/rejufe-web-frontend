/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';
import EditModelInputs from './EditModalInputs';
import './EditAtasModal.css';

export default function EditMinutesModal({
  id, minutes, setUse, archive1Id, archive2Id, page,
}) {
  console.log(minutes);
  const [dados, setDados] = useState(minutes);
  const history = useHistory();
  const formData = new FormData();

  const titles = [
    { label: 'Tipo', field: 'select' },
    { label: 'Número:', field: 'input' },
    { label: 'Descrição:', field: 'input' },
  ];

  async function handleSubmit() {
    Object.entries(dados).forEach((dado) => {
      if (dado[0] === 'archive_1' || dado[0] === 'archive_2') {
        dado[1] = dado[1] ? dado[1]?.file : '';
        formData.append(dado[0], dado[1]);
      } else {
        formData.append(dado[0], dado[1]);
      }
    });

    try {
      await managerService.updateMinute(id, formData);
      toast.success('Dados editados!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setUse(true);
    } catch (error) {
      history.push('/NotFound');
      toast.error('Não foi possível fazer uma edição', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    setDados(minutes);
  }, [page]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Box className="EditMinutesModal-ContainerModal">
      <div role="button" tabIndex={0} className="EditMinutesModal-cancel" onClick={handleClose}>
        <CancelIcon />
      </div>
      <EditModelInputs
        titles={titles}
        archive1Id={archive1Id}
        archive2Id={archive2Id}
        dados={dados}
        setDados={setDados}
      />
      <button
        className="EditMinutesModal-ButtonConfirm"
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
      <button type="button" className="EditMinutesModal-EditGroup" onClick={handleOpen}>
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
