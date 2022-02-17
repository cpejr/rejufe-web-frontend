import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { IoMdClose } from 'react-icons/io';
import api from '../../../utils/api';

const ContainerModal = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
height: 100%;
flex-direction:column;
@media(max-width:860px){
  width:100%;
}
`;

const Row = styled.div`
display:flex;
align-items:center;
justify-content:center;
width: 100%;
height: 70%;
`;

const TitleModal = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
font-family:Roboto;
font-weight: bold;
font-size:24px;
margin-bottom:1%;
margin-top:-2%;
@media(max-width:860px){
        width:100%;
        font-size:18px;
    } 
`;

const Ajust = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
margin-bottom:5%;
`;

Ajust.Col1 = styled.h3`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
width:40%;
font-family:Roboto;
@media(max-width:860px){
        width:100%;
        font-size:16px;
    } 
`;

const ButtonConfirm = styled.button`
    display: flex;
    height: 30px;
    width: 100px;
    font-family: Roboto;
    font-size: 13px;
    font-weight: 500;
    margin-right: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.darkGreen};
    border: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.darkGreen};
    border-radius: 5px;
    align-items: center;
    transform: translate(0%,-50%);
    justify-content: center;
    text-align: center;
    cursor: pointer;
    :hover{
    background-color: ${({ theme }) => theme.colors.darkGreen};
    color: ${({ theme }) => theme.colors.background};
    border: solid;
    border-color: ${({ theme }) => theme.colors.darkGreen};
    }
    @media(max-width:860px){
        width:150px;
    } 
`;
const ButtonExit = styled.button`
    display: flex;
    height: 30px;
    width: 30px;
    font-family: Roboto;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.darkGreen};
    border: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.darkGreen};
    border-radius: 5px;
    align-items: center;
    transform: translate(0%,-50%);
    justify-content: center;
    text-align: center;
    cursor: pointer;
    :hover{
    background-color: ${({ theme }) => theme.colors.darkGreen};
    color: ${({ theme }) => theme.colors.background};
    border: solid;
    border-color: ${({ theme }) => theme.colors.darkGreen};
    }
`;

const ButtonDelete = styled.button`
    display:flex;
    height: 30px;
    width: 100px;
    font-family: Roboto;
    font-size: 13px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.background};
    color: #773344;
    border: solid;
    border-width: 1px;
    border-color: #773344;
    border-radius: 5px;
    align-items: center;
    transform: translate(0%,-50%);
    justify-content: center;
    text-align: center;
    cursor: pointer;
    :hover{
    background-color: #773344;
    color: ${({ theme }) => theme.colors.background};
    border: solid;
    border-color: #773344;
    }
    @media(max-width:860px){
        width:150px;
    } 
`;

const SeeData = styled.button`
  display:flex;
    align-items:center;
    justify-content:center;
    font-family: Roboto;
    font-size: 100%;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.mediumGreen};
    border: 0;
    cursor:pointer;
    outline:none;
    @media(max-width:1000px){
      display:flex;
    align-items:center;
    justify-content:center;
    font-size:14px;
}
`;

const Exit = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:right;
  width:100%;
`;

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
  const [aprove, setAprove] = useState();
  const [open, setOpen] = useState(false);

  function handleSendEmail(name, email, aproved) {
    fetch('/api/mail/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        name,
        email,
        aproved,
      }),
    });
  }

  async function getWaitingStores() {
    try {
      const response = await api.get('store');
      setStores([...response.data].filter((stores) => stores.status === false));
    } catch (error) {
      console.warn(error);
    }
  }

  async function updateApprovedStore(id) {
    setAprove(true);
    const body = {
      status: true,
    };
    try {
      await api.put(`store_status/${id}`, body);
      handleSendEmail(store.company_name, store.email, true);
      toast('Loja aprovada com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT });
      getWaitingStores();
    } catch (error) {
      console.warn(error);
      toast('Erro ao aprovar loja.', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }

  async function deleteStore(id) {
    setAprove(false);
    try {
      await api.delete(`store/${id}`);
      handleSendEmail(store.company_name, store.email, aprove);
      toast('Loja reprovada com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT });
      getWaitingStores();
    } catch (error) {
      console.warn(error);
      toast('Erro ao reprovar loja.', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }

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
            <Ajust.Col1>
              Nome:
              {' '}
              {store.company_name}
            </Ajust.Col1>
            <Ajust.Col1>
              CNPJ:
              {' '}
              {store.cnpj}
            </Ajust.Col1>
            <Ajust.Col1>
              Celular:
              {' '}
              {store.cellphone}
            </Ajust.Col1>
            <Ajust.Col1>
              Telefone:
              {' '}
              {store.phone}
            </Ajust.Col1>
            <Ajust.Col1>
              Email:
              {' '}
              {store.email}
            </Ajust.Col1>

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
