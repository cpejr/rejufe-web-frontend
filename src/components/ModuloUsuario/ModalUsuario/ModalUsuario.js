import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';

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
      width: '60vw',
      height: '52vh',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #609694',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 1.5),
      ['@media (max-width:460px)']: { // eslint-disable-line no-useless-computed-key
        width: '100%',
      },
    },
  
  }));
  
  toast.configure();
  
export default function ModalAdmin({ store, setStores }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ContainerModal>
        <Exit>
          <ButtonExit onClick={() => {
            handleClose();
          }}
          >
            <IoMdClose size={30} style={{ color: ({ theme }) => theme.colors.mediumGreen }} />
          </ButtonExit>
        </Exit>
        <Row>
          <TitleModal>Dados da loja</TitleModal>
        </Row>
        <Row>
          <Ajust>
          </Ajust>
        </Row>
        <Row>
          <ButtonConfirm onClick={() => {
            updateApprovedStore(store.firebase_id_store);
            handleClose();
          }}
          >
            Aprovar loja
          </ButtonConfirm>
          <ButtonDelete onClick={() => {
            deleteStore(store.firebase_id_store);
            handleClose();
          }}
          >
            Recusar loja
          </ButtonDelete>
        </Row>
      </ContainerModal>
    </div>
  );
  return (
    <div>
      <SeeData onClick={handleOpen}>
        Ver dados
      </SeeData>
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
