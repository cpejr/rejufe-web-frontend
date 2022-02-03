import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import {cpfMask, cellphoneMask, phoneMask, cepMask } from '../../componentes/masks/masks'
import { initialAssociateState } from '../../componentes/initialStates/initialStates'
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

function Cadastro() {
  const [dados, setDados] = useState(initialAssociateState);
  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  };

  return (
    <div className="container-cadastro">
      <h1>Cadastro dos associados</h1>
      <Box>
        <h2>Dados Pessoais </h2>

        
        <TextField
          id="standard-nome-input"
          value={dados.nome}
          onChange={(e) => handleChange(e.target.value, 'nome')}
          label="Nome"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-user-input"
          value={dados.user}
          onChange={(e) => handleChange(e.target.value, 'user')}
          label="Usuário"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-password-input"
          value={dados.senha}
          onChange={(e) => handleChange(e.target.value, 'senha')}
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />

        <TextField
          id="standard-office-input"
          value={dados.cargo}
          onChange={(e) => handleChange(e.target.value, 'cargo')}
          label="Cargo"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-nationality-input"
          value={dados.nacionalidade}
          onChange={(e) => handleChange(e.target.value, 'nacionalidade')}
          label="Nacionalidade"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-cpf-input"
          value={dados.cpf}
          onChange={(e) => handleChange(cpfMask(e.target.value), 'cpf')}
          label="CPF"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-birth-input"
          value={dados.nascimento}
          onChange={(e) => handleChange(e.target.value, 'nascimento')}
          label="Nascimento"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="standard"
        />
        <TextField
          id="standard-naturalidade-input"
          value={dados.naturalidade}
          onChange={(e) => handleChange(e.target.value, 'naturalidade')}
          label="Naturalidade"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-select-currency-sexo"
          select
          label="Sexo"
          value={dados.sexo}
          onChange={(e) => handleChange(e.target.value, 'sexo')}
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
          onChange={(e) => handleChange(e.target.value, 'estadoCivil')}
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
          onChange={(e) => handleChange(e.target.value, 'conjuge')}
          label="conjuge"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-nascimento-input"
          value={dados.nascimentoConjuge}
          onChange={(e) => handleChange(e.target.value, 'nascimentoConjuge')}
          label="nascimento"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="standard"
        />
        <TextField
          id="standard-filhos-input"
          value={dados.filhos}
          onChange={(e) => handleChange(e.target.value, 'filhos')}
          label="filhos"
          type="number"
          variant="standard"
        />
        <TextField
          id="standard-cep-input"
          value={dados.cep}
          onChange={(e) => handleChange(cepMask(e.target.value), 'cep')}
          label="cep"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-endereço-input"
          value={dados.endereco}
          onChange={(e) => handleChange(e.target.value, 'endereco')}
          label="endereço"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-numero-input"
          value={dados.numero}
          onChange={(e) => handleChange(e.target.value, 'numero')}
          label="numero"
          type="number"
          variant="standard"
        />

        <TextField
          id="standard-complemento-input"
          value={dados.complemento}
          onChange={(e) => handleChange(e.target.value, 'complemento')}
          label="complemento"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-bairro-input"
          value={dados.bairro}
          onChange={(e) => handleChange(e.target.value, 'bairro')}
          label="bairro"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-cidade-input"
          value={dados.cidade}
          onChange={(e) => handleChange(e.target.value, 'cidade')}
          label="cidade"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-estado-input"
          value={dados.estado}
          onChange={(e) => handleChange(e.target.value, 'estado')}
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
          onChange={(e) => handleChange(e.target.value, 'lotacao')}
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
          onChange={(e) => handleChange(e.target.value, 'atuacao')}
          label="atuação"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-cep-input"
          value={dados.cepFuncional}
          onChange={(e) => handleChange(cepMask(e.target.value), 'cepFuncional')}
          label="cep"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-endereço-input"
          value={dados.enderecoFuncional}
          onChange={(e) => handleChange(e.target.value, 'enderecoFuncional')}
          label="endereço"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-numero-input"
          value={dados.numeroFuncional}
          onChange={(e) => handleChange(e.target.value, 'numeroFuncional')}
          label="numero"
          type="number"
          variant="standard"
        />

        <TextField
          id="standard-complemento-input"
          value={dados.complementoFuncional}
          onChange={(e) => handleChange(e.target.value, 'complementoFuncional')}
          label="complemento"
          type="text"
          variant="standard"
        />

        <TextField
          id="standard-bairro-input"
          value={dados.bairroFuncional}
          onChange={(e) => handleChange(e.target.value, 'bairroFuncional')}
          label="bairro"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-cidade-input"
          value={dados.cidadeFuncional}
          onChange={(e) => handleChange(e.target.value, 'cidadeFuncional')}
          label="cidade"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-estado-input"
          value={dados.estadoFuncional}
          onChange={(e) => handleChange(e.target.value, 'estadoFuncional')}
          label="estado"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-telefone-input"
          value={dados.telefone}
          onChange={(e) => handleChange(phoneMask(e.target.value), 'telefone')}
          label="telefone"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-fax-input"
          value={dados.fax}
          onChange={(e) => handleChange(e.target.value, 'fax')}
          label="fax"
          type="celular"
          variant="standard"
        />
        <TextField
          id="standard-celular-input"
          value={dados.celular}
          onChange={(e) => handleChange(cellphoneMask(e.target.value), 'celular')}
          label="celular"
          type="text"
          variant="standard"
        />
        <TextField
          id="standard-email-input"
          value={dados.email}
          onChange={(e) => handleChange(e.target.value, 'email')}
          label="email"
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
          id="standard-admissão-input"
          value={dados.admissao}
          onChange={(e) => handleChange(e.target.value, 'admissao')}
          label="admissão"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="standard"
        />
      </Box>
    </div>
  );
}
export default Cadastro;
