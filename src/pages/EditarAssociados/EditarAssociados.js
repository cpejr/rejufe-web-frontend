import React, { useState } from 'react';
import './editarassociados.css';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import formsEdit from '../../components/formsData/formsEdit';
import EditUserInputs from '../../components/formsInputs/editUserInputs';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function EditarAssociados() {
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState('');
  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // eslint-disable-next-line no-control-regex
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    const userRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/; // username is 8-20 characters long
    const lettersSpacesRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/; // Apenas letras e espaços, sem caracteres especiais

    let checkError = 0;

    if (!lettersSpacesRegex.test(dados.nome)) {
      checkError = 1;
    }
    if (!userRegex.test(dados.user)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.cargo)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.nacionalidade)) {
      checkError = 1;
    }
    if (!cpfRegex.test(dados.cpf)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.status)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.naturalidade)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.sexo)) {
      checkError = 1;
    }
    if (!cepRegex.test(dados.cep)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.endereco)) {
      checkError = 1;
    }
    if (dados.numero?.length === 0) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.complemento)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.bairro)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.cidade)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.estado)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.lotacao)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.atuacao)) {
      checkError = 1;
    }
    if (!cepRegex.test(dados.cepFuncional)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.enderecoFuncional)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.enderecoFucomplementoFuncionalncional)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.bairroFuncional)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.cidadeFuncional)) {
      checkError = 1;
    }
    if (!lettersSpacesRegex.test(dados.estadoFuncional)) {
      checkError = 1;
    }
    if ((dados.telefone?.length !== 0) && (dados.telefone?.length !== 14)) {
      checkError = 1;
    }
    if (dados.celular?.length !== 15) {
      checkError = 1;
    }
    if (!emailRegex.test(dados.email)) {
      checkError = 1;
    }
    if (checkError === 1) {
      setLoading(false);
      return;
    }
    try {
      const body = {
        status: dados.status,
        type: 'usuario',
        name: dados.nome,
        email: dados.email,
        user: dados.user,
        office: dados.cargo,
        nacionality: dados.nacionalidade,
        cpf: dados.cpf,
        birth: dados.nascimento,
        place_of_birth: dados.naturalidade,
        gender: dados.sexo,
        civil_state: dados.estadoCivil,
        spouse: dados.conjuge === '' ? undefined : dados.conjuge,
        birth_spouse: dados.nascimentoConjuge === '' ? undefined : dados.nascimentoConjuge,
        sons: dados.filhos === '' ? undefined : dados.filhos,
        cep: dados.cep,
        profissional_address: dados.endereco,
        profissional_number: dados.numero,
        profissional_complement: dados.complemento,
        profissional_district: dados.bairro,
        profissional_city: dados.cidade,
        profissional_state: dados.estado,
        allocation: dados.lotacao,
        acting: dados.atuacao,
        personal_cep: dados.cepFuncional,
        personal_address: dados.enderecoFuncional,
        personal_number: dados.numeroFuncional,
        personal_complement: dados.complementoFuncional,
        personal_district: dados.bairroFuncional,
        personal_city: dados.cidadeFuncional,
        personal_state: dados.estadoFuncional,
        telephone: dados.telefone === '' ? undefined : dados.telefone,
        fax: dados.fax === '' ? undefined : dados.fax,
        cell_phone_number: dados.celular,
        email_REJUFE: dados.emailListaRejufe === '' ? undefined : dados.emailListaRejufe,
        email_ASCOM: dados.emailListaAscom === '' ? undefined : dados.emailListaAscom,
        admission_date: dados.admissao,
      };
      await managerService.updateUser(body);
    } catch (error) {
      toast.error('Falha ao editar usuário!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="container-editar">
      <h1>Editar Usuários</h1>
      {formsEdit.map((line) => (
        <Box className="container-box">
          <h2>{line.title}</h2>
          <p className="TextField">
            {line.items.map((item) => (
              <EditUserInputs
                type={item.type}
                id={item.id}
                label={item.label}
                field={item.field}
                select={item.select}
                // eslint-disable-next-line react/jsx-no-bind
                setDados={handleChange}
                mask={item.mask}
                dados={dados}
              />
            ))}
          </p>
        </Box>
      ))}
      <Button variant="contained" loading={loading} style={{ backgroundColor: '#264A6F' }} onClick={(e) => handleSubmit(e)}>Editar</Button>
    </div>
  );
}

export default EditarAssociados;
