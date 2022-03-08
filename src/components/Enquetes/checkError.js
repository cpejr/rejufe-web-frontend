// eslint-disable-next-line no-unused-vars
import React from 'react';
import { toast } from 'react-toastify';

toast.configure();

function checkError({
  dados, initialErrorState, users, setError,
}) {
  let check = 0;
  const aux = initialErrorState;

  if (dados.title?.length === 0) {
    aux.title = true;
    check = 1;
    toast.error('Título inválido!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }

  if (dados.description?.length === 0) {
    aux.description = true;
    check = 1;
    toast.error('Descrição inválido!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }

  if (dados.openingDate?.length === 0) {
    aux.openingDate = true;
    check = 1;
    toast.error('Data inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }

  if (dados.closingDate?.length === 0) {
    aux.closingDate = true;
    check = 1;
    toast.error('Data inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }

  if (users?.length === 0) {
    aux.toVote = true;
    check = 1;
    toast.error('Sessão inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }

  // if (dados.title?.length === 0) {
  //   aux.title = true;
  //   check = 1;
  //   toast.error('Título inválido!!', {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     autoClose: 5000,
  //   });
  // }
  if (check === 1) {
    setError({ ...aux });
  }

  return (check);
}

export default checkError;
