import civilStates from '../consts/civilStates';
import genres from '../consts/genres';
import lotacao from '../consts/lotacao';
import status from '../consts/status';
import brazilianStates from '../consts/brazilianStates';
import office from '../consts/office';

import {
  cpfMask, cellphoneMask, phoneMask, cepMask,
} from '../masks/masks';

const formsEdit = [
  {
    title: 'Dados Pessoais',
    items: [
      {
        type: 'text',
        id: 'status',
        label: 'Status',
        field: status,
        select: true,
      },
      {
        type: 'text',
        id: 'name',
        label: 'Nome',
        field: null,
        selected: false,
      },
      {
        type: 'text',
        id: 'office',
        label: 'Cargo',
        field: office,
        select: true,
      },
      {
        type: 'text',
        id: 'nacionality',
        label: 'Nacionalidade',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'cpf',
        label: 'CPF',
        field: null,
        select: false,
        mask: cpfMask,
      },
      {
        type: 'date',
        id: 'birth',
        label: 'Nascimento',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'place_of_birth',
        label: 'Naturalidade',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'gender',
        label: 'Sexo',
        field: genres,
        select: true,
      },
      {
        type: 'text',
        id: 'civil_state',
        label: 'Estado Civil',
        field: civilStates,
        select: true,
      },
      {
        type: 'text',
        id: 'spouse',
        label: 'Cônjuge',
        field: null,
        select: false,
      },
      {
        type: 'date',
        id: 'birth_spouse',
        label: 'Nascimento do cônjuge',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'sons',
        label: 'Filhos',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'cep',
        label: 'Cep',
        field: null,
        select: false,
        mask: cepMask,
      },
      {
        type: 'text',
        id: 'personal_address',
        label: 'Endereço',
        field: null,
        select: false,
      },
      {
        type: 'number',
        id: 'personal_number',
        label: 'Número',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'personal_complement',
        label: 'Complemento',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'personal_district',
        label: 'Bairro',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'personal_city',
        label: 'Cidade',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'personal_state',
        label: 'Estado',
        field: brazilianStates,
        select: true,
      },
    ],
  },
  {
    title: 'Dados Funcionais',
    items: [
      {
        type: 'text',
        id: 'allocation',
        label: 'Lotação',
        field: lotacao,
        select: true,
        defaultValue: true,
      },
      {
        type: 'text',
        id: 'acting',
        label: 'Atuação',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'personal_cep',
        label: 'Cep',
        field: null,
        select: false,
        mask: cepMask,
      },
      {
        type: 'text',
        id: 'profissional_address',
        label: 'Endereço',
        field: null,
        select: false,
      },
      {
        type: 'number',
        id: 'profissional_number',
        label: 'Número',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'profissional_complement',
        label: 'Complemento',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'profissional_district',
        label: 'Bairro',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'profissional_city',
        label: 'Cidade',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'profissional_state',
        label: 'Estado',
        field: brazilianStates,
        select: true,
      },
      {
        type: 'text',
        id: 'telephone',
        label: 'Telefone',
        field: null,
        select: false,
        mask: phoneMask,
      },
      {
        type: 'text',
        id: 'fax',
        label: 'Fax',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'cell_phone_number',
        label: 'Celular',
        field: null,
        select: false,
        mask: cellphoneMask,
      },
      {
        type: 'text',
        id: 'email',
        label: 'Email',
        field: null,
        select: false,
        disabled: true,
      },
      {
        type: 'text',
        id: 'email_REJUFE',
        label: 'Deseja receber email da lista REJUFE? Se positivo informe o email.',
        field: null,
        select: false,
      },
      {
        type: 'text',
        id: 'email_ASCOM',
        label: 'Deseja receber email da lista ASCOM? se positivo informe o email.',
        field: null,
        select: false,
      },
      {
        type: 'date',
        id: 'admission_date',
        label: 'Admissão',
        field: null,
        select: false,
      },
    ],
  },
];
export default formsEdit;
