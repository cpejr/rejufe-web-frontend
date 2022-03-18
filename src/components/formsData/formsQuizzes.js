const formsEnquete = [
  {
    type: 'text',
    id: 'title',
    label: 'title',
    field: null,
    select: false,
    required: true,
  },
  {
    type: 'text',
    id: 'user',
    label: 'Usuário',
    field: null,
    select: false,
    required: true,
  },
  {
    type: 'text',
    id: 'cargo',
    label: 'Cargo',
    field: null,
    select: false,
    required: true,
  },
  {
    type: 'text',
    id: 'nacionalidade',
    label: 'Nacionalidade',
    field: null,
    select: false,
    required: true,
  },
  {
    type: 'text',
    id: 'cpf',
    label: 'CPF',
    field: null,
    select: false,
    required: true,
    mask: cpfMask,
  },
];
export default formsEnquete;
