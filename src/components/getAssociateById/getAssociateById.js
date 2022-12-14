import moment from 'moment';
import * as managerService from '../../services/manager/managerService';

async function getAssociateById(associateId, setAssociate, history) {
  try {
    const response = await managerService.getById(associateId);
    const associate = {
      status: response.status,
      name: response.name,
      user: response.user,
      email: response.email,
      office: response.office,
      nacionality: response.nacionality,
      cpf: response.cpf,
      birth: moment.utc(response.birth).format('DD/MM/YYYY'),
      place_of_birth: response.place_of_birth,
      gender: response.gender,
      civil_state: response.civil_state,
      spouse: response.spouse,
      birth_spouse: response.birth_spouse ? moment.utc(response.birth_spouse).format('DD/MM/YYYY') : '',
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
      admission_date: moment.utc(response.admission_date).format('DD/MM/YYYY'),
    };
    setAssociate(associate);
  } catch (error) {
    history.push({
      pathname: '/NotFound',
      state: null,
    });
  }
}

export default getAssociateById;
