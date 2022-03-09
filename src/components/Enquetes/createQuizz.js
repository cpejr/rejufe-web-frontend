// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';

toast.configure();

function CreateQuizz({
  dados, initialErrorState, users, setError, options,
}) {
  const [alternatives, setAlternatives] = useState([]);

  for (const option in options) {
    console.log(option);
  }

  const alternative = [
    {
      description: 'Julia ',
      votes: 1,
    },
    {
      description: 'Nikole',
      votes: 2,
    },
    {
      description: 'Davi',
      votes: 3,
    },
    {
      description: 'Monique',
      votes: 4,
    },
  ];
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

    if (users?.length === 0) {
      aux.toVote = true;
      checkError = 1;
      toast.error('Sessão inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }

    // if (dados.title?.length === 0) {
    //   aux.title = true;
    //   checkError = 1;
    //   toast.error('Título inválido!!', {
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     autoClose: 5000,
    //   });
    // }

    if (checkError === 1) {
      setError({ ...aux });
      return;
    }

    try {
      console.log('oi');
      const body = {
        title: dados.title,
        toVote: users,
        openingDate: dados.openingDate,
        closingDate: dados.closingDate,
        // eslint-disable-next-line object-shorthand
        options: alternatives,
      };
      console.log(body);
      const response = await managerService.createQuizz(body);
      console.log(response);
      toast.success('Enquete criada com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível criar enquete!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="end-page-enquete">
      <button
        className="confirm-enquete"
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
