import actionTypes from '../consts/actionsType';

const formsActions = [
  {
    type: 'text',
    id: 'type',
    label: 'Tipo',
    field: actionTypes,
    select: true,
    required: true,
  },
  {
    type: 'date',
    id: 'date',
    label: 'Data',
    field: null,
    select: false,
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
    type: 'file',
    fileType: '.pdf',
    id: 'archive_1',
    label: 'Anexo 1',
    field: null,
    select: false,
    required: true,
  },
  {
    type: 'file',
    fileType: '.pdf',
    id: 'archive_2',
    label: 'Anexo 2',
    field: null,
    select: false,
    required: true,
  },
];
export default formsActions;
