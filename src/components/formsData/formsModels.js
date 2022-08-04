import modelsTypes from '../consts/modelsType';

const formsModels = [
  {
    title: 'Cadastro de Modelos',
    items: [
      {
        type: 'text',
        id: 'type',
        label: 'Tipo',
        field: modelsTypes,
        select: true,
        required: true,
      },
      {
        type: 'number',
        id: 'numberModels',
        label: 'Número',
        field: null,
        select: false,
        required: false,
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

export default formsModels;
