const formsContas = [
  {
    title: 'Cadastro de Comunicados/Informações',
    items: [
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
        id: 'title',
        label: 'Título',
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
        type: 'file',
        fileType: '.pdf',
        id: null,
        label: 'Arquivo',
        field: 'pdf',
        select: false,
        required: true,
      },
    ],
  },
];

export default formsContas;
