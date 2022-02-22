import React, { useState } from 'react';
import './editarassociados.css';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import formsEdit from '../../components/formsData/formsEdit';
import EditUserInputs from '../../components/formsInputs/editUserInputs';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';
import cssColorCodes from '../../components/cssColorCodes/cssColorCodes';

toast.configure();

function EditarAssociados(id) {
  // eslint-disable-next-line react/destructuring-assignment
  const associateId = id.location.state.id;
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState('');
  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const body = {
        status: dados.status,
        name: dados.name,
        email: dados.email,
        office: dados.office,
        nacionality: dados.nacionalidade,
        cpf: dados.cpf,
        birth: dados.birth,
        place_of_birth: dados.naturalidade,
        gender: dados.sexo,
        civil_state: dados.estadoCivil,
        spouse: dados.conjuge === '' ? undefined : dados.conjuge,
        birth_spouse: dados.nascimentoConjuge === '' ? undefined : dados.nascimentoConjuge,
        sons: dados.filhos === '' ? undefined : dados.filhos,
        cep: dados.cep,
        profissional_address: dados.profissional_address,
        profissional_number: dados.profissional_number,
        profissional_complement: dados.profissional_complement,
        profissional_district: dados.profissional_district,
        profissional_city: dados.profissional_city,
        profissional_state: dados.profissional_state,
        allocation: dados.allocation,
        acting: dados.acting,
        personal_cep: dados.personal_cep,
        personal_address: dados.personal_address,
        personal_number: dados.personal_number,
        personal_complement: dados.personal_complement,
        personal_district: dados.personal_district,
        personal_city: dados.personal_city,
        personal_state: dados.personal_state,
        telephone: dados.telephone === '' ? undefined : dados.telephone,
        fax: dados.fax === '' ? undefined : dados.fax,
        cell_phone_number: dados.cell_phone_number,
        email_REJUFE: dados.email_REJUFE === '' ? undefined : dados.email_REJUFE,
        email_ASCOM: dados.email_ASCOM === '' ? undefined : dados.email_ASCOM,
        admission_date: dados.admission_date,
      };
      await managerService.updateUser(body, associateId);
      toast('Usuário editado com sucesso', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
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
    <div className="edit-associate-container">
      <h1 className="edit-associate-title"><div className="edit-associate-text-margin">Editar Associado</div></h1>
      {formsEdit.map((line) => (
        <Box>
          <h2 className="edit-associate-title"><div className="edit-associate-text-margin">{line.title}</div></h2>
          <p className="edit-associate-text-field">
            {line.items.map((item) => (
              <EditUserInputs
                type={item.type}
                id={item.id}
                label={item.label}
                field={item.field}
                select={item.select}
                // eslint-disable-next-line react/jsx-no-bind
                setDados={(value, entrada) => handleChange(value, entrada)}
                mask={item.mask}
                dados={dados}
                associateId={associateId}
              />
            ))}
          </p>
        </Box>
      ))}
      <Button variant="contained" loading={loading} style={{ backgroundColor: '#264A6F' }} onClick={(e) => handleSubmit(e)}>Salvar</Button>
    </div>
  );
}

export default EditarAssociados;
