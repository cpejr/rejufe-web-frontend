import React, { useState } from "react";
import formsData from "../../componentes/formsData/formsCadastro"
import RegisterInputs from "../../componentes/formsInputs/registerInputs"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {cpfMask, cellphoneMask, phoneMask, cepMask } from '../../componentes/masks/masks'
import { initialAssociateState, initialAssociateErrorState } from '../../componentes/initialStates/initialStates'
import "./Cadastro.css"
import LoadingButton from '@mui/lab/LoadingButton';

function Cadastro() {
  const [initialErrorState, setError] = useState( initialAssociateErrorState )
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(initialAssociateState);
  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let aux = initialErrorState;
        
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
      {formsData.map((line) => (
            <Box className="container-box">
              <h2>{line.title}</h2>
              {line.items.map((item) => (
                <p className="TextField">
                  <registerInputs
                    type={item.type}
                    id={item.id}
                    label={item.label}
                    field={item.field}
                    select={item.select}
                    setDados={handleChange}
                    initialErrorState={initialErrorState}
                  />
                </p>
              ))}
            </Box>
          ))}
      <LoadingButton variant="contained" loading = {loading} style={{ backgroundColor: '#264A6F' }} onClick={(e) => handleSubmit(e)}>Cadastrar</LoadingButton>
    </div>
  );
}
export default Cadastro;
