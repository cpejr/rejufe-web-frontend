import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import * as managerService from '../../services/manager/managerService';
import './ConfirmModal.css';

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
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: '30%',
    backgroundColor: 'white',
    border: '2px solid #609694',
    borderRadius: '8px',
    boxShadow: theme.palette.color4,
    padding: '1% 1%',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:1424px)']: {
      width: '38%',
    },
    ['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
      width: '45%',
    },
    ['@media (max-width:850px)']: { // eslint-disable-line no-useless-computed-key
      width: '55%',
    },
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
  },
}));

toast.configure();

export default function ConfirmModal({ quizz, userId, setVoted }) {
  let votes = 0;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const votedOptions = quizz?.options;
  const handleVote = (option, index) => {
    votedOptions[index] = { description: option.description, votes: option.votes + 1, _id: option._id };
  };

  const vote = async () => {
    const newAlreadyVoted = quizz?.alreadyVoted.concat(userId);
    const newToVote = quizz?.toVote?.filter((id) => id !== userId);
    try {
      await managerService.updateQuizz(quizz._id, {
        alreadyVoted: newAlreadyVoted,
        toVote: newToVote,
        options: votedOptions,
      });
      setVoted(votes);
      votes += 1;
      toast('Voto registrado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      toast.error('Não foi possível votar na enquete!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="exit-user-module-exclude">
        <button
          className="close-user-module-exclude"
          type="button"
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon
            size={30}
            sx={[
              {
                color: '#264A6F',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#264A6F',
                  borderRadius: '5px',
                },
              },
            ]}
          />
        </button>
      </div>
      <div className="container-exclude-user-module">
        <div className="title-user-module-exclude">
          <h1>Confirmação</h1>
        </div>
        <div className="content-user-module-exclude">
          <h1>Você tem certeza que deseja votar nessa alternativa?</h1>
        </div>
        <div className="user-module-exclude-buttons">
          <button
            className="confirm-user-module-exclude"
            type="button"
            onClick={() => {
              vote();
              handleClose();
            }}
          >
            Confirmar
          </button>
          <button
            className="cancel-user-module-exclude"
            type="button"
            onClick={() => {
              handleClose();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="alternatives-vote-quizzes">
      {quizz?.options?.map((option, index) => (
        <button
          type="button"
          onClick={() => {
            handleVote(option, index);
            handleOpen();
          }}
          className="vote-button-confirm-modal"
        >
          {option.description}
        </button>
      ))}
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
