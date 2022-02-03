import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import "./Cadastro.css"

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

const initialAssociateState = {
  nome: '',
  user: '',
  senha: '',
  cargo: '',
  nacionalidade: '',
  cpf: '',
  nascimento: new Date(),
  naturalidade: '',
  sexo: '',
  estadoCivil: '',
  conjuge: '',
  nascimentoConjuge: new Date(),
  filhos: '',
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  lotacao: '',
  atuacao: '',
  cepFuncional: '',
  enderecoFuncional: '',
  numeroFuncional: '',
  complementoFuncional: '',
  bairroFuncional: '',
  cidadeFuncional: '',
  estadoFuncional: '',
  telefone: '',
  fax: '',
  celular: '',
  email: '',
  emailListaRejufe: '',
  emailListaAscom: '',
  admissao: new Date(),
}

function Cadastro() {
  const [dados, setDados] = useState(initialAssociateState);
  console.log(dados);
  function handleChange(event, field) {
    console.log(event.target.value)
    setDados({ ...dados, [field]: event.target.value });
  };
  

  return (
    <div className="container-cadastro">
      <h1>Cadastro dos associados</h1>
      <Box>
        <h2>Dados Pessoais </h2>

        
        <TextField
          id="standard-nome-input"
          value={dados.nome}
          onChange={(e) => handleChange(e, 'nome')}
          label="Nome"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-user-input"
          value={dados.user}
          onChange={(e) => handleChange(e, 'user')}
          label="Usuário"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-password-input"
          value={dados.senha}
          onChange={(e) => handleChange(e, 'senha')}
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />

        <TextField
          id="standard-office-input"
          value={dados.cargo}
          onChange={(e) => handleChange(e, 'cargo')}
          label="Cargo"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-nationality-input"
          value={dados.nacionalidade}
          onChange={(e) => handleChange(e, 'nacionalidade')}
          label="Nacionalidade"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-cpf-input"
          value={dados.cpf}
          onChange={(e) => handleChange(e, 'cpf')}
          label="CPF"
          type="number"
          variant="standard"
        />

        <TextField
          id="standard-birth-input"
          value={dados.nascimento}
          onChange={(e) => handleChange(e, 'nascimento')}
          label="Nascimento"
          type="date"
          variant="standard"
        />
        <TextField
          id="standard-naturalidade-input"
          value={dados.naturalidade}
          onChange={(e) => handleChange(e, 'naturalidade')}
          label="Naturalidade"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-select-currency-sexo"
          select
          label="Sexo"
          value={dados.sexo}
          onChange={(e) => handleChange(e, 'sexo')}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your sex"
          variant="standard"
       >
          {sexo.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))} 

        </TextField>

        <TextField
          id="standard-select-currency-EstadoCivil"
          select
          label="Estado Civil"
          value={dados.estadoCivil}
          onChange={(e) => handleChange(e, 'estadoCivil')}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your sex"
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
          onChange={(e) => handleChange(e, 'conjuge')}
          label="conjuge"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-nascimento-input"
          value={dados.nascimentoConjuge}
          onChange={(e) => handleChange(e, 'nascimentoConjuge')}
          label="nascimento"
          type="date"
          variant="standard"
        />
        <TextField
          id="standard-filhos-input"
          value={dados.filhos}
          onChange={(e) => handleChange(e, 'filhos')}
          label="filhos"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-cep-input"
          value={dados.cep}
          onChange={(e) => handleChange(e, 'cep')}
          label="cep"
          type="number"
          variant="standard"
        />
        <TextField
          id="standard-endereço-input"
          value={dados.endereco}
          onChange={(e) => handleChange(e, 'endereco')}
          label="endereço"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-numero-input"
          value={dados.numero}
          onChange={(e) => handleChange(e, 'numero')}
          label="numero"
          type="number"
          variant="standard"
        />

        <TextField
          id="standard-complemento-input"
          value={dados.complemento}
          onChange={(e) => handleChange(e, 'complemento')}
          label="complemento"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-bairro-input"
          value={dados.bairro}
          onChange={(e) => handleChange(e, 'bairro')}
          label="bairro"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-cidade-input"
          value={dados.cidade}
          onChange={(e) => handleChange(e, 'cidade')}
          label="cidade"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-estado-input"
          value={dados.estado}
          onChange={(e) => handleChange(e, 'estado')}
          label="estado"
          type="text"
          variant="standard"
        />
      </Box>



      <Box>
        <h2>Dados Funcionais</h2>

        <TextField
          id="standard-select-currency-lotacao"
          select
          label="Lotação"
          value={dados.lotacao}
          onChange={(e) => handleChange(e, 'lotacao')}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your sex"
          variant="standard"
       >
          {Lotacao.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))} 

        </TextField>

        <TextField 
          id="standard-atuação-input"
          value={dados.atuacao}
          onChange={(e) => handleChange(e, 'atuacao')}
          label="atuação"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-cep-input"
          value={dados.cepFuncional}
          onChange={(e) => handleChange(e, 'cepFuncional')}
          label="cep"
          type="number"
          variant="standard"
        />

        <TextField
          id="standard-endereço-input"
          value={dados.enderecoFuncional}
          onChange={(e) => handleChange(e, 'enderecoFuncional')}
          label="endereço"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-numero-input"
          value={dados.numeroFuncional}
          onChange={(e) => handleChange(e, 'numeroFuncional')}
          label="numero"
          type="number"
          variant="standard"
        />

        <TextField
          id="standard-complemento-input"
          value={dados.complementoFuncional}
          onChange={(e) => handleChange(e, 'complementoFuncional')}
          label="complemento"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-bairro-input"
          value={dados.bairroFuncional}
          onChange={(e) => handleChange(e, 'bairroFuncional')}
          label="bairro"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-cidade-input"
          value={dados.cidadeFuncional}
          onChange={(e) => handleChange(e, 'cidadeFuncional')}
          label="cidade"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-estado-input"
          value={dados.estadoFuncional}
          onChange={(e) => handleChange(e, 'estadoFuncional')}
          label="estado"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-telefone-input"
          value={dados.telefone}
          onChange={(e) => handleChange(e, 'telefone')}
          label="telefone"
          type="number"
          variant="standard"
        />
        <TextField
          id="standard-fax-input"
          value={dados.fax}
          onChange={(e) => handleChange(e, 'fax')}
          label="fax"
          type="celular"
          variant="standard"
        />
        <TextField
          id="standard-celular-input"
          value={dados.celular}
          onChange={(e) => handleChange(e, 'celular')}
          label="celular"
          type="number"
          variant="standard"
        />
        <TextField
          id="standard-email-input"
          value={dados.email}
          onChange={(e) => handleChange(e, 'email')}
          label="email"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-email-input"
          value={dados.emailListaRejufe}
          onChange={(e) => handleChange(e, 'emailListaRejufe')}
          label="Deseja receber email da lista REJUFE? Se positivo informe o email."
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-email-input"
          value={dados.emailListaAscom}
          onChange={(e) => handleChange(e, 'emailListaAscom')}
          label="Deseja receber email da lista ASCOM? se positivo informe o email."
          type="text"
          variant="standard"
        />
        
        <TextField
          id="standard-admissão-input"
          value={dados.admissao}
          onChange={(e) => handleChange(e, 'admissao')}
          label="admissão"
          type="date"
          variant="standard"
        />
      </Box>
    </div>
  );
}
export default Cadastro;
