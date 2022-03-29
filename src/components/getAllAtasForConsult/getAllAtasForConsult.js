/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import * as managerService from '../../services/manager/managerService';

function createData(number, type, description, archive_1, archive_2) {
  return {
    number, type, description, archive_1, archive_2,
  };
}

async function getAllAtasForConsult(setId, setAllAssociates, setLoading) {
  const auxAtas = [];
  const atasId = [];
  try {
    const allAtas = await managerService.getAtas();

    allAtas.forEach((object) => {
      atasId.push(object._id);
      auxAtas.push(createData(
        object.number,
        object.type,
        object.description,
        object.archive_1,
        object.archive_2,
      ));
    });

    setId(atasId);
    setAllAssociates(auxAtas);
    setLoading(false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllAtasForConsult;
