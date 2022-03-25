import actionTypes from '../consts/actionsType';

const formsActions = [
  {
    title: 'Cadastro de ',
    items: [
      {
        type: 'text',
        id: 'number',
        label: 'Número',
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'text',
        id: 'type',
        label: 'Tipo',
        field: actionTypes,
        select: true,
        required: true,
      },
      {
        type: 'text',
        id: 'description',
        label: 'Descrição',
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'empty',
      },
      {
        type: 'file',
        fileType: '.pdf',
        id: 'archive_1',
        label: 'Arquivo',
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'file',
        fileType: '.pdf',
        id: 'archive_2',
        label: 'Arquivo',
        field: null,
        select: false,
        required: true,
      },
    ],
  },
];

export default formsActions;
