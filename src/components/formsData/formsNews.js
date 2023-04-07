import newsTypes from '../consts/newsTypes';

const formsNews = [
  {
    title: 'Cadastro de Notícia',
    items: [
      {
        type: 'text',
        id: 'type',
        label: 'Tipo',
        field: newsTypes,
        select: true,
        required: true,
      },
      {
        type: 'text',
        id: 'title',
        label: 'Titulo',
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
      {
        type: 'file',
        fileType: 'image/*',
        id: null,
        label: 'Imagem',
        field: 'photos',
        select: false,
        required: true,
      },
    ],
  },
];

export default formsNews;
