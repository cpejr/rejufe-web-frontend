import React, { useState, useEffect } from 'react';
import './editarassociados.css';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import moment from 'moment';
import formsEdit from '../../components/formsData/formsEdit';
import EditUserInputs from '../../components/formsInputs/editUserInputs';
import * as managerService from '../../services/manager/managerService';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function EditarAssociados(id) {
  const { location } = id;
  const associateId = location.state.id;
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState('');
  function handleChange(value, field) {
    setDados({ ...dados, [field]: value });
  }
  async function setAssociatesInfo() {
    setLoading(true);
    try {
      const response = await managerService.getById(associateId);
      const associateUpdated = [
        {
          status: response.status,
          name: response.name,
          email: response.email,
          office: response.office,
          nacionality: response.nacionality,
          cpf: response.cpf,
          birth: moment(response.birth).format('YYYY-MM-DD'),
          place_of_birth: response.place_of_birth,
          gender: response.gender,
          civil_state: response.civil_state,
          spouse: response.spouse,
          birth_spouse: moment(response.birth_spouse).format('YYYY-MM-DD'),
          sons: response.sons,
          cep: response.cep,
          profissional_address: response.profissional_address,
          profissional_number: response.profissional_number,
          profissional_complement: response.profissional_complement,
          profissional_district: response.profissional_district,
          profissional_city: response.profissional_city,
          profissional_state: response.profissional_state,
          allocation: response.allocation,
          acting: response.acting,
          personal_cep: response.personal_cep,
          personal_address: response.personal_address,
          personal_number: response.personal_number,
          personal_complement: response.personal_complement,
          personal_district: response.personal_district,
          personal_city: response.personal_city,
          personal_state: response.personal_state,
          telephone: response.telephone,
          fax: response.fax,
          cell_phone_number: response.cell_phone_number,
          email_REJUFE: response.email_REJUFE,
          email_ASCOM: response.email_ASCOM,
          admission_date: moment(response.admission_date).format('YYYY-MM-DD'),
        },
      ];
      setDados(...associateUpdated);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error); // TO DO: Substitute for redirect to not Found when done
      setLoading(false);
    }
    setLoading(false);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const body = {
        status: dados.status,
        name: dados.name,
        email: dados.email,
        office: dados.office,
        nacionality: dados.nacionality,
        cpf: dados.cpf,
        birth: dados.birth,
        place_of_birth: dados.place_of_birth,
        gender: dados.gender,
        civil_state: dados.civil_state,
        spouse: dados.spouse,
        birth_spouse: dados.birth_spouse,
        sons: dados.sons,
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
        telephone: dados.telephone,
        fax: dados.fax,
        cell_phone_number: dados.cell_phone_number,
        email_REJUFE: dados.email_REJUFE,
        email_ASCOM: dados.email_ASCOM,
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
  useEffect(() => {
    setAssociatesInfo();
  }, []);

  return (
    <div className="edit-associate-container">
      <h1 className="edit-associate-title"><div className="edit-associate-text-margin">Editar Associado</div></h1>
      {formsEdit?.map((line) => (
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
