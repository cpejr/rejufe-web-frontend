import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import formsData from '../../components/formsData/formsCadastro';
import RegisterInputs from '../../components/formsInputs/registerInputs';
import { initialAssociateState, initialAssociateErrorState } from '../../components/initialStates/initialStates';
import './Cadastro.css';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function Cadastro() {
  const [initialErrorState, setError] = useState(initialAssociateErrorState);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(initialAssociateState);
  const history = useHistory();
  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const aux = initialErrorState;

    // eslint-disable-next-line no-control-regex
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    const userRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/; // username is 8-20 characters long
    const lettersSpacesRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/; // Apenas letras e espaços, sem caracteres especiais

    let checkError = 0;

    if (dados.nome?.length === 0 || !lettersSpacesRegex.test(dados.nome)) {
      aux.nome = true;
      checkError = 1;
      toast.error('Nome inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (!userRegex.test(dados.user)) {
      aux.user = true;
      checkError = 1;
      toast.error('Usuário inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.cargo?.length === 0 || !lettersSpacesRegex.test(dados.cargo)) {
      aux.cargo = true;
      checkError = 1;
      toast.error('Cargo inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.nacionalidade?.length === 0 || !lettersSpacesRegex.test(dados.nacionalidade)) {
      aux.nacionalidade = true;
      checkError = 1;
      toast.error('Nacionalidade inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (!cpfRegex.test(dados.cpf)) {
      aux.cpf = true;
      checkError = 1;
      toast.error('cpf inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.nascimento?.length === 0) {
      aux.nascimento = true;
      checkError = 1;
      toast.error('Data de nascimento inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.naturalidade?.length === 0 || !lettersSpacesRegex.test(dados.naturalidade)) {
      aux.naturalidade = true;
      checkError = 1;
      toast.error('Naturalidade inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.sexo?.length === 0 || !lettersSpacesRegex.test(dados.sexo)) {
      aux.sexo = true;
      checkError = 1;
      toast.error('Sexo inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.estadoCivil?.length === 0) {
      aux.estadoCivil = true;
      checkError = 1;
      toast.error('Estado Civil inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (!cepRegex.test(dados.cep)) {
      aux.cep = true;
      checkError = 1;
      toast.error('cep inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.endereco?.length === 0 || !lettersSpacesRegex.test(dados.endereco)) {
      aux.endereco = true;
      checkError = 1;
      toast.error('Endereço inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.numero?.length === 0) {
      aux.numero = true;
      checkError = 1;
      toast.error('Numero inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.bairro?.length === 0 || !lettersSpacesRegex.test(dados.bairro)) {
      aux.bairro = true;
      checkError = 1;
      toast.error('Bairro inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.cidade?.length === 0 || !lettersSpacesRegex.test(dados.cidade)) {
      aux.cidade = true;
      checkError = 1;
      toast.error('Cidade inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.estado?.length === 0 || !lettersSpacesRegex.test(dados.estado)) {
      aux.estado = true;
      checkError = 1;
      toast.error('Estado inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.lotacao?.length === 0 || !lettersSpacesRegex.test(dados.lotacao)) {
      aux.lotacao = true;
      checkError = 1;
      toast.error('Lotação inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.atuacao?.length === 0) {
      aux.atuacao = true;
      checkError = 1;
      toast.error('Atuação inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (!cepRegex.test(dados.cepFuncional)) {
      aux.cepFuncional = true;
      checkError = 1;
      toast.error('cep funcional inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.enderecoFuncional?.length === 0 || !lettersSpacesRegex.test(dados.enderecoFuncional)) {
      aux.enderecoFuncional = true;
      checkError = 1;
      toast.error('Endereço funcional inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.numeroFuncional?.length === 0) {
      aux.numeroFuncional = true;
      checkError = 1;
      toast.error('Numero Funcional inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.bairroFuncional?.length === 0 || !lettersSpacesRegex.test(dados.bairroFuncional)) {
      aux.bairroFuncional = true;
      checkError = 1;
      toast.error('Bairro Funcional inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.cidadeFuncional?.length === 0 || !lettersSpacesRegex.test(dados.cidadeFuncional)) {
      aux.cidadeFuncional = true;
      checkError = 1;
      toast.error('Cidade funcional inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.estadoFuncional?.length === 0 || !lettersSpacesRegex.test(dados.estadoFuncional)) {
      aux.estadoFuncional = true;
      checkError = 1;
      toast.error('Estado funcional inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if ((dados.telefone?.length !== 0) && (dados.telefone?.length !== 14)) {
      aux.telefone = true;
      checkError = 1;
      toast.error('Telefone inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.celular?.length !== 15) {
      aux.celular = true;
      checkError = 1;
      toast.error('Celular inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (!emailRegex.test(dados.email)) {
      aux.email = true;
      checkError = 1;
      toast.error('Email inválido!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (dados.admissao?.length === 0) {
      aux.admissao = true;
      checkError = 1;
      toast.error('Admissão inválida!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
    if (checkError === 1) {
      setError({ ...aux });
      setLoading(false);
      return;
    }

    try {
      const body = {
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
        profissional_complement: dados.complemento === '' ? undefined : dados.complemento,
        profissional_district: dados.bairro,
        profissional_city: dados.cidade,
        profissional_state: dados.estado,
        allocation: dados.lotacao,
        acting: dados.atuacao,
        personal_cep: dados.cepFuncional,
        personal_address: dados.enderecoFuncional,
        personal_number: dados.numeroFuncional,
        personal_complement: dados.complementoFuncional === '' ? undefined : dados.complementoFuncional,
        personal_district: dados.bairroFuncional,
        personal_city: dados.cidadeFuncional,
        personal_state: dados.estadoFuncional,
        telephone: dados.telefone === '' ? undefined : dados.telefone,
        fax: dados.fax === '' ? undefined : dados.fax,
        cell_phone_number: dados.celular,
        judicial_section: dados.judicial_section,
        email_REJUFE: dados.emailListaRejufe === '' ? undefined : dados.emailListaRejufe,
        email_ASCOM: dados.emailListaAscom === '' ? undefined : dados.emailListaAscom,
        admission_date: dados.admissao,
      };
      await managerService.register(body);
      toast.success('Cadastrado com sucesso!!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      history.push('/consulta-associados');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      if (error.toString() === 'Error: Email already in use') {
        toast.error('Já existe um associado com o email inserido', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      } else {
        toast.error('Preencha todos os campos corretamente!!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      }
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="register-associate-container">
      <h1 className="register-associate-title"><div className="register-associate-text-margin">Cadastro dos associados</div></h1>
      {formsData?.map((line) => (
        <Box>
          <h2 className="register-associate-title"><div className="register-associate-text-margin">{line.title}</div></h2>
          <p className="register-associate-text-field">
            {line?.items?.map((item) => (
              <RegisterInputs
                type={item.type}
                id={item.id}
                label={item.label}
                field={item.field}
                select={item.select}
                required={item.required}
                setDados={(value, entrada) => handleChange(value, entrada)}
                mask={item.mask}
                initialErrorState={initialErrorState}
                dados={dados}
              />
            ))}
          </p>
        </Box>
      ))}
      <LoadingButton variant="contained" loading={loading} style={{ backgroundColor: '#1C3854', marginBottom: '5%' }} onClick={(e) => handleSubmit(e)}>Cadastrar</LoadingButton>
    </div>
  );
}
export default Cadastro;
