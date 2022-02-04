import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {cpfMask, cellphoneMask, phoneMask, cepMask } from '../../componentes/masks/masks'
import { initialAssociateState, initialAssociateErrorState } from '../../componentes/initialStates/initialStates'
import "./Cadastro.css"
import LoadingButton from '@mui/lab/LoadingButton';

const EstadoCivil = [
  {
    value: '',
    label: '',
  },
   {
    value: 'Solteiro(a)',
    label: 'Solteiro(a)',
  },
  {
    value: 'Casado(a)',
    label: 'Casado(a)',
  },
  {
    value: 'Divorciado(a)',
    label: 'Divorciado(a)',
  },
  {
    value: 'Desquitado(a)',
    label: 'Desquitado(a)',
  },
  {
    value: 'Outros',
    label: 'Outros',
  },
];

const sexo = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Feminino',
    label: 'Feminino',
  },
  {
    value: 'Masculino',
    label: 'Masculino',
  },
];

const Lotacao = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Ceará',
    label: 'Ceará',
  },
  {
    value: 'Rio Grande do Norte',
    label: 'Rio Grande do Norte',
  },
  {
    value: 'Paraíba',
    label: 'Paraíba',
  },
  {
    value: 'Pernambuco',
    label: 'Pernambuco',
  },
  {
    value: 'Alagoas',
    label: 'Alagoas',
  },
  {
    value: 'Sergipe',
    label: 'Sergipe',
  },
];

function Cadastro() {
  const [error, setError] = useState( initialAssociateErrorState )
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(initialAssociateState);
  function handleChange(value, field) {
    setError({ ...error, [field]: false });
    setDados({ ...dados, [field]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let aux = error;
    
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    const userRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/; // username is 8-20 characters long
    const lettersSpacesRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/; // Apenas letras e espaços, sem caracteres especiais
    
    let checkError = 0;
    
    if (dados.nome?.length === 0 || !lettersSpacesRegex.test(dados.nome)) { 
      aux.nome = true;
      checkError = 1;
    }
    if (!userRegex.test(dados.user)) { 
      aux.user = true;
      checkError = 1;
    }
    if (dados.cargo?.length === 0 || !lettersSpacesRegex.test(dados.cargo)) { 
      aux.cargo = true;
      checkError = 1;
    }
    if (dados.nacionalidade?.length === 0 || !lettersSpacesRegex.test(dados.nacionalidade)) { 
      aux.nacionalidade = true;
      checkError = 1;
    }
    if (!cpfRegex.test(dados.cpf)) { 
      aux.cpf = true;
      checkError = 1;
    }
    if (dados.nascimento?.length === 0) { 
      aux.nascimento = true;
      checkError = 1;
    }
    if (dados.naturalidade?.length === 0 || !lettersSpacesRegex.test(dados.naturalidade) ) { 
      aux.naturalidade = true;
      checkError = 1;
    }
    if (dados.sexo?.length === 0 || !lettersSpacesRegex.test(dados.sexo)) { 
      aux.sexo = true;
      checkError = 1;
    }
    if (dados.estadoCivil?.length === 0) { 
      aux.estadoCivil = true;
      checkError = 1;
    }
    if (!cepRegex.test(dados.cep)) { 
      aux.cep = true;
      checkError = 1;
    }
    if (dados.endereco?.length === 0 || !lettersSpacesRegex.test(dados.endereco)) { 
      aux.endereco = true;
      checkError = 1;
    }
    if (dados.numero?.length === 0) { 
      aux.numero = true;
      checkError = 1;
    }
    if (dados.complemento?.length === 0 || !lettersSpacesRegex.test(dados.complemento)) { 
      aux.complemento = true;
      checkError = 1;
    }
    if (dados.bairro?.length === 0 || !lettersSpacesRegex.test(dados.bairro)) { 
      aux.bairro = true;
      checkError = 1;
    }
    if (dados.cidade?.length === 0 || !lettersSpacesRegex.test(dados.cidade)) { 
      aux.cidade = true;
      checkError = 1;
    }
    if (dados.estado?.length === 0 || !lettersSpacesRegex.test(dados.estado)) { 
      aux.estado = true;
      checkError = 1;
    }
    if (dados.lotacao?.length === 0 || !lettersSpacesRegex.test(dados.lotacao)) { 
      aux.lotacao = true;
      checkError = 1;
    }
    if (dados.atuacao?.length === 0 || !lettersSpacesRegex.test(dados.atuacao)) { 
      aux.atuacao = true;
      checkError = 1;
    }
    if (!cepRegex.test(dados.cepFuncional)) { 
      aux.cepFuncional = true;
      checkError = 1;
    }
    if (dados.enderecoFuncional?.length === 0 || !lettersSpacesRegex.test(dados.enderecoFuncional)) { 
      aux.enderecoFuncional = true;
      checkError = 1;
    }
    if (dados.numeroFuncional?.length === 0) { 
      aux.numeroFuncional = true;
      checkError = 1;
    }
    if (dados.complementoFuncional?.length === 0 || !lettersSpacesRegex.test(dados.enderecoFucomplementoFuncionalncional)) { 
      aux.complementoFuncional = true;
      checkError = 1;
    }
    if (dados.bairroFuncional?.length === 0 || !lettersSpacesRegex.test(dados.bairroFuncional)) { 
      aux.bairroFuncional = true;
      checkError = 1;
    }
    if (dados.cidadeFuncional?.length === 0 || !lettersSpacesRegex.test(dados.cidadeFuncional)) { 
      aux.cidadeFuncional = true;
      checkError = 1;
    }
    if (dados.estadoFuncional?.length === 0 || !lettersSpacesRegex.test(dados.estadoFuncional)) { 
      aux.estadoFuncional = true;
      checkError = 1;
    }
    if ((dados.telefone?.length !== 0) && (dados.telefone?.length !== 10)) { 
      aux.telefone = true;
      checkError = 1;
    }
    if (dados.celular?.length !== 15) { 
      aux.celular = true;
      checkError = 1;
    }
    if (!emailRegex.test(dados.email)) { 
      aux.email = true;
      checkError = 1;
    }
    if (dados.admissao?.length === 0) { 
      aux.admissao = true;
      checkError = 1;
    }
    if (checkError === 1){
      setError({ ...aux });
      setLoading(false);
      return;
    }
    setLoading(true);
    
  }

  return (
    <div className="container-cadastro">
      <h1>Cadastro dos associados</h1>

      <Box className="container-box">
        <h2>Dados Pessoais </h2>

        <p className="TextField">
        <TextField 
          required
          id="standard-nome-input"
          error={error.nome}
          value={dados.nome}
          onChange={(e) => handleChange(e.target.value, 'nome')}
          label="Nome"
          type="text"
          variant="standard"
        />
       
        <TextField
          required
          id="standard-user-input"
          error={error.user}
          value={dados.user}
          onChange={(e) => handleChange(e.target.value, 'user')}
          label="Usuário"
          type="text"
          variant="standard"
        />
          
        <TextField
        required
          id="standard-office-input"
          error={error.cargo}
          value={dados.cargo}
          onChange={(e) => handleChange(e.target.value, 'cargo')}
          label="Cargo"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-nationality-input"
          error={error.nacionalidade}
          value={dados.nacionalidade}
          onChange={(e) => handleChange(e.target.value, 'nacionalidade')}
          label="Nacionalidade"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-cpf-input"
          error={error.cpf}
          value={dados.cpf}
          onChange={(e) => handleChange(cpfMask(e.target.value), 'cpf')}
          label="CPF"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-birth-input"
          error={error.nascimento}
          value={dados.nascimento}
          onChange={(e) => handleChange(e.target.value, 'nascimento')}
          label="Nascimento"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="standard"
        />
        <TextField
        required
          id="standard-naturalidade-input"
          error={error.naturalidade}
          value={dados.naturalidade}
          onChange={(e) => handleChange(e.target.value, 'naturalidade')}
          label="Naturalidade"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-select-currency-sexo"
          select
          label="Sexo"
          value={dados.sexo}
          error={error.sexo}
          onChange={(e) => handleChange(e.target.value, 'sexo')}
          SelectProps={{
            native: true,
          }}
          variant="standard"
       >
          {sexo.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))} 

        </TextField>

        <TextField
        required
          id="standard-select-currency-EstadoCivil"
          select
          label="Estado Civil"
          value={dados.estadoCivil}
          error={error.estadoCivil}
          onChange={(e) => handleChange(e.target.value, 'estadoCivil')}
          SelectProps={{
            native: true,
          }}
          variant="standard"
       >
          {EstadoCivil.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))} 

        </TextField>

        <TextField
          id="standard-conjuge-input"
          value={dados.conjuge}
          onChange={(e) => handleChange(e.target.value, 'conjuge')}
          label="Cônjuge"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-nascimento-input"
          value={dados.nascimentoConjuge}
          onChange={(e) => handleChange(e.target.value, 'nascimentoConjuge')}
          label="Nascimento do cônjuge"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="standard"
        />

         <TextField
          id="standard-filhos-input"
          label="Filhos"
          multiline
          value={dados.filhos}
          onChange={(e) => handleChange(e.target.value, 'filhos')}
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-cep-input"
          value={dados.cep}
          error={error.cep}
          onChange={(e) => handleChange(cepMask(e.target.value), 'cep')}
          label="Cep"
          type="text"
          variant="standard"
        />
        <TextField
        required
          id="standard-endereço-input"
          value={dados.endereco}
          error={error.endereco}
          onChange={(e) => handleChange(e.target.value, 'endereco')}
          label="Endereço"
          type="text"
          variant="standard"
        />
        <TextField
        required
          id="standard-numero-input"
          value={dados.numero}
          error={error.numero}
          onChange={(e) => handleChange(e.target.value, 'numero')}
          label="Número"
          type="number"
          variant="standard"
        />
 
        <TextField
        required
          id="standard-complemento-input"
          value={dados.complemento}
          error={error.complemento}
          onChange={(e) => handleChange(e.target.value, 'complemento')}
          label="Complemento"
          type="text"
          variant="standard"
        />
        <TextField
        required
          id="standard-bairro-input"
          value={dados.bairro}
          error={error.bairro}
          onChange={(e) => handleChange(e.target.value, 'bairro')}
          label="Bairro"
          type="text"
          variant="standard"
        />
        <TextField
        required
          id="standard-cidade-input"
          value={dados.cidade}
          error={error.cidade}
          onChange={(e) => handleChange(e.target.value, 'cidade')}
          label="Cidade"
          type="text"
          variant="standard"
        />
        <TextField
        required
          id="standard-estado-input"
          value={dados.estado}
          error={error.estado}
          onChange={(e) => handleChange(e.target.value, 'estado')}
          label="Estado"
          type="text"
          variant="standard"
        />
        </p>
      </Box>


      <Box className="container-box">
        <h2>Dados Funcionais</h2>
            <p className="TextField">
        <TextField
        required
          id="standard-select-currency-lotacao"
          select
          label="Lotação"
          value={dados.lotacao}
          error={error.lotacao}
          onChange={(e) => handleChange(e.target.value, 'lotacao')}
          SelectProps={{
            native: true,
          }}
          variant="standard"
       >
          {Lotacao.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))} 

        </TextField>

        <TextField 
        required
          id="standard-atuação-input"
          value={dados.atuacao}
          error={error.atuacao}
          onChange={(e) => handleChange(e.target.value, 'atuacao')}
          label="Atuação"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-cep-input"
          value={dados.cepFuncional}
          error={error.cepFuncional}
          onChange={(e) => handleChange(cepMask(e.target.value), 'cepFuncional')}
          label="Cep"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-endereço-input"
          value={dados.enderecoFuncional}
          error={error.enderecoFuncional}
          onChange={(e) => handleChange(e.target.value, 'enderecoFuncional')}
          label="Endereço"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-numero-input"
          value={dados.numeroFuncional}
          error={error.numeroFuncional}
          onChange={(e) => handleChange(e.target.value, 'numeroFuncional')}
          label="Número"
          type="number"
          variant="standard"
        />

        <TextField
        required
          id="standard-complemento-input"
          value={dados.complementoFuncional}
          error={error.complementoFuncional}
          onChange={(e) => handleChange(e.target.value, 'complementoFuncional')}
          label="Complemento"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-bairro-input"
          value={dados.bairroFuncional}
          error={error.bairroFuncional}
          onChange={(e) => handleChange(e.target.value, 'bairroFuncional')}
          label="Bairro"
          type="text"
          variant="standard"
        />
        <TextField
        required
          id="standard-cidade-input"
          value={dados.cidadeFuncional}
          error={error.cidadeFuncional}
          onChange={(e) => handleChange(e.target.value, 'cidadeFuncional')}
          label="Cidade"
          type="text"
          variant="standard"
        />

        <TextField
        required
          id="standard-estado-input"
          value={dados.estadoFuncional}
          error={error.estadoFuncional}
          onChange={(e) => handleChange(e.target.value, 'estadoFuncional')}
          label="Estado"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-telefone-input"
          value={dados.telefone}
          error={error.telefone}
          onChange={(e) => handleChange(phoneMask(e.target.value), 'telefone')}
          label="Telefone"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-fax-input"
          value={dados.fax}
          onChange={(e) => handleChange(e.target.value, 'fax')}
          label="Fax"
          type="text"
          variant="standard"
        />
        <TextField
        required
          id="standard-celular-input"
          value={dados.celular}
          error={error.celular}
          onChange={(e) => handleChange(cellphoneMask(e.target.value), 'celular')}
          label="Celular"
          type="text"
          variant="standard"
        />
        
        <TextField
        required
          id="standard-email-input"
          value={dados.email}
          error={error.email}
          onChange={(e) => handleChange(e.target.value, 'email')}
          label="Email"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-email-input"
          value={dados.emailListaRejufe}
          onChange={(e) => handleChange(e.target.value, 'emailListaRejufe')}
          label="Deseja receber email da lista REJUFE? Se positivo informe o email."
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-email-input"
          value={dados.emailListaAscom}
          onChange={(e) => handleChange(e.target.value, 'emailListaAscom')}
          label="Deseja receber email da lista ASCOM? se positivo informe o email."
          type="text"
          variant="standard"
        />
        
        <TextField
        required
          id="standard-admissão-input"
          value={dados.admissao}
          error={error.admissao}
          onChange={(e) => handleChange(e.target.value, 'admissao')}
          label="Admissão"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="standard"
        />
        </p>
      </Box>

      <LoadingButton variant="contained" style={{ backgroundColor: '#264A6F' }} onClick={(e) => handleSubmit(e)}>Cadastrar</LoadingButton>
    </div>
  );
}
export default Cadastro;
