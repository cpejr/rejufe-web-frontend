// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';

toast.configure();

function CreateQuizz({
  dados, initialErrorState, users, setError, options, inputs, setNewQuizz,
}) {
  let descriptions = [];
  const alternatives = Object.values(options).slice(0, inputs.length);

  alternatives.forEach((alternative) => {
    descriptions = descriptions.concat({ description: alternative });
  });

  const create = async () => {
    const aux = initialErrorState;
    let checkError = 0;

    if (dados.title?.length === 0) {
      aux.title = true;
      checkError = 1;
      toast.error('Título inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (dados.description?.length === 0) {
      aux.description = true;
      checkError = 1;
      toast.error('Descrição inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (dados.openingDate?.length === 0) {
      aux.openingDate = true;
      checkError = 1;
      toast.error('Data inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (dados.closingDate?.length === 0) {
      aux.closingDate = true;
      checkError = 1;
      toast.error('Data inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (dados.closingDate <= dados.openingDate) {
      aux.closingDate = true;
      aux.openingDate = true;
      checkError = 1;
      toast.error('Datas inválidas!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    if (users?.length === 0) {
      aux.toVote = true;
      checkError = 1;
      toast.error('Sessão inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    alternatives.forEach((alternative) => {
      if (alternative === '' || typeof alternative === 'object') {
        aux.options = true;
        checkError = 1;
        toast.error('Alternativa inválida!!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      }
    });

    if (checkError === 1) {
      setError({ ...aux });
      return;
    }

    try {
      const body = {
        title: dados.title,
        description: dados.description,
        toVote: users,
        openingDate: dados.openingDate,
        closingDate: dados.closingDate,
        options: descriptions,
      };
      await managerService.createQuizz(body);
      setNewQuizz(true);
      toast.success('Enquete criada com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      toast.error('Não foi possível criar enquete!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="last-button-modal-quizz">
      <button
        className="confirm-button-modal-quizz"
        type="submit"
        onClick={() => {
          create();
        }}
      >
        Criar enquete
      </button>
    </div>
  );
}

export default CreateQuizz;
