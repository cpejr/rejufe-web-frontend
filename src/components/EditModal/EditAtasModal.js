/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import * as managerService from '../../services/manager/managerService';
import EditModelInputs from './EditModalInputs';
import './EditAtasModal.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
  },
  content: {
    position: 'absolute',
    width: '40%',
    backgroundColor: 'white',
    maxHeight: '95%',
    borderRadius: '8px',
    boxShadow: theme.palette.color4,
    padding: '1% 1%',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:900px)']: {
      width: '60%',
    },
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      width: '80%',
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
  },

}));

export default function EditMinutesModal({
  id, minutes, setUse, archive1Id, archive2Id, page, numbers,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [dados, setDados] = useState(minutes);
  const notNumbers = numbers.filter((number) => number !== minutes?.number);
  const history = useHistory();
  const formData = new FormData();

  console.log(minutes);
  console.log(notNumbers);

  const titles = [
    { label: 'Tipo', field: 'select' },
    { label: 'Número:', field: 'input' },
    { label: 'Descrição:', field: 'input' },
  ];

  const select = [
    'ATAS',
    'EDITAIS',
  ];

  async function handleSubmit() {
    if (notNumbers.find((number) => number === dados.number)) {
      toast.error('O número da ata/edital já está sendo utilizado', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else {
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
        setDados(minutes);
        setUse(true);
      } catch (error) {
        history.push('/NotFound');
        toast.error('Não foi possível fazer uma edição', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    }
  }

  useEffect(() => {
    setDados(minutes);
  }, [page, minutes]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.content}>
      <div className="EditMinutesModal-ContainerModal">
        <div role="button" tabIndex={0} className="EditMinutesModal-cancel" onClick={handleClose}>
          <CancelIcon />
        </div>
        <div className="EditModal-minutes-title">
          <p>Editar dados</p>
        </div>
        <EditModelInputs
          dados={dados}
          setDados={setDados}
          archive1Id={archive1Id}
          archive2Id={archive2Id}
          titles={titles}
          select={select}
          setUse={setUse}
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
      </div>
    </div>
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
