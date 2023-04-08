/* eslint-disable radix */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import './ConfirmModal.css';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import * as managerService from '../../services/manager/managerService';

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
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      width: '75%',
    },
  },
}));

toast.configure();

export default function ConfirmModal({
  quizz, userId, setVoted,
}) {
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const vote = async () => {
    const newAlreadyVoted = quizz?.alreadyVoted.concat(userId);
    const newToVote = quizz?.toVote?.filter((id) => id !== userId);
    const newOptions = quizz?.options.map((option) => (
      selectedOptionId === option._id ? { ...option, votes: option.votes + 1 } : option
    ));
    try {
      await managerService.updateQuizz(quizz._id, {
        alreadyVoted: newAlreadyVoted,
        toVote: newToVote,
        options: newOptions,
      });

      if (setVoted) setVoted((prev) => !prev); // Forçar um useEffect de um componente pai --> Não sei pq fizeram assim

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

  const handleVote = async () => {
    const userAlreadyVoted = quizz?.alreadyVoted?.includes(userId);
    if (userAlreadyVoted) {
      toast.error('Você já votou nessa enquete!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else {
      setLoading(true);
      // await managerService.updateVotes(quizz._id, selectedOption);
      await vote();
    }

    handleClose();
    setLoading(false);

    history.push('/intranet');
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
        {
          loading ? (
            <div className="loader-cards-quizzes">
              <CircularProgress size={35} color="inherit" />
            </div>
          ) : (
            <div className="user-module-exclude-buttons">
              <button
                className="confirm-user-module-exclude"
                type="button"
                onClick={handleVote}
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
          )
        }
      </div>
    </div>
  );
  return (
    <div className="alternatives-vote-quizzes">
      {quizz?.options?.map((option) => (
        <button
          key={option._id}
          type="button"
          onClick={() => {
            handleOpen();
            setSelectedOptionId(option._id);
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
