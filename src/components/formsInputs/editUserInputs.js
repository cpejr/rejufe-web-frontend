import { React, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import * as managerService from '../../services/manager/managerService';

function EditUserInputs({
  associateId,
  setDados,
  type,
  label,
  id,
  field,
  select,
  required,
  mask,
  dados,
}) {
  console.log("🚀 ~ file: editUserInputs.js ~ line 17 ~ dados", id)
  const [associate, setAssociate] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await managerService.getById(associateId);
      const associateuP = [
        {
          status: response.status,
          name: response.name,
          email: response.email,
          office: response.office,
          nacionality: response.nacionality,
          cpf: response.cpf,
          birth: moment(response.birth).format("DD/MM/YYYY"),
          place_of_birth: response.place_of_birth,
          gender: response.gender,
          civil_state: response.civil_state,
          spouse: response.spouse,
          birth_spouse: moment(response.birth_spouse).format("DD/MM/YYYY"),
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
          admission_date: moment(response.admission_date).format("DD/MM/YYYY"),
        },
      ];
      setAssociate(...associateuP);
      console.log("🚀 ~ file: editUserInputs.js ~ line 18 ~ associate", moment(response.birth).format("DD/MM/YYYY"))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error); // TO DO: Substitute for redirect to not Found when done
      setLoading(false);
    }
    setLoading(false);
  }, []);
  const handleChange = (value, entrada) => {
    setDados(value, entrada);
  };
  console.log(associate);
  console.log(associate.status)
  // console.log(associate.name);
  return (
    <div>
      {type === 'date' && (
        <TextField
          required={required}
          id={id}
          defaultValue={associate[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          InputLabelProps={{ shrink: true }}
          type={type}
          variant="standard"
          sx={{ m: 1, width: '22ch' }}

        />
      )}
      {mask && (
        <TextField
          required={required}
          id={id}
          defaultValue={associate[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(mask(e.target.value), id)}
          label={label}
          type={type}
          select={select}
          variant="standard"
          sx={{ m: 1, width: '22ch' }}

        />
      )}
      {select && (
        <TextField
          required={required}
          id={id}
          defaultValue={associate[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          SelectProps={{
            native: true,
          }}
          type={type}
          select={select}
          variant="standard"
          sx={{ m: 1, width: '22ch' }}
        >
          {field
            && field.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </TextField>
      )}
      {!mask && !(type === 'date') && !select && (
        <TextField
          required={required}
          id={id}
          defaultValue={associate[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          type={type}
          variant="standard"
          multiline
          sx={{ m: 1, width: '22ch' }}
        />
      )}
    </div>
  );
}
export default EditUserInputs;
