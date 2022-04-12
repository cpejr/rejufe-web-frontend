/* eslint-disable no-nested-ternary */
import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';

// eslint-disable-next-line camelcase
function createData(number, description, archive_1, archive_2) {
  return {
    number, description, archive_1, archive_2,
  };
}

async function getAllListaComunicados(setId, setAllComunication, setSequentialId) {
  const auxComunications = [];
  const comunicationsId = [];
  const comunicationsCode = [];
  const history = useHistory();

  try {
    const allComunication = await managerService.getComunication();
    allComunication.sort();

    allComunication.filter((user) => user.type.toLowerCase() !== 'INFORMATIVO').forEach((object) => {
      comunicationsId.push(object._id);
      comunicationsCode.push(object.informations_sequential_id);
      auxComunications.push(createData(
        object.number,
        object.description,
        object.archive_1,
        object.archive_2,
      ));
    });

    setId(comunicationsId);
    setAllComunication(auxComunications);
    setSequentialId(comunicationsCode);
  } catch (error) {
    history.push('/NotFound');
  }
}

export default getAllListaComunicados;
