import MinutesTypes from '../consts/atasTypes';

const formsMinutes = [
  {
    title: 'Cadastro de Atas/Editais',
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
        field: MinutesTypes,
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
        id: null,
        label: 'Arquivo',
        field: 'archive_1',
        select: false,
        required: true,
      },
      {
        type: 'file',
        fileType: '.pdf',
        id: null,
        label: 'Arquivo',
        field: 'archive_2',
        select: false,
        required: true,
      },
    ],
  },
];

export default formsMinutes;
