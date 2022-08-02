/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import './TermsConditionsModal.css';

toast.configure();

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
  },

}));

export default function TermsConditionsModal({ open, onClose }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.content}>
          <div className="TermsModal-container">
            <div role="button" tabIndex={0} className="TermsModal-cancel" onClick={onClose}>
              <CancelIcon />
            </div>
            <div className="TermsModal-text-box">
              <div className="TermsModal-title">
                <p>Termos de Serviço</p>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illo vel repellendus porro recusandae error sequi numquam assumenda id, excepturi aliquid iste repudiandae mollitia architecto, perspiciatis voluptate earum. Porro, asperiores.</p>
              <p>Obcaecati nam excepturi ad dolorem alias sed sunt ipsam ut quas, impedit eaque tenetur necessitatibus, architecto eveniet voluptate quam hic nesciunt. Quo exercitationem non deserunt amet, deleniti harum vitae quod!</p>
              <p>Dolores sint ex, dolore excepturi, commodi nostrum, sunt iusto nemo maiores voluptates quidem. Quaerat dolor explicabo sapiente excepturi optio rem nulla ad quos, eum sint, assumenda tenetur neque, non consectetur.</p>
              <p>Iusto, repellat tempore fugiat architecto ratione eaque assumenda rerum at et hic fugit molestiae eius nam tenetur asperiores natus! Ullam minima eaque, ipsum ut laudantium esse alias dolore facilis distinctio!</p>
              <p>Doloremque accusantium nobis ratione. Minus, omnis maxime iure eligendi praesentium excepturi laboriosam earum molestias nihil pariatur. Aut repellendus quibusdam, accusantium eligendi dolore unde praesentium ducimus a. Libero aliquam eos modi?</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
