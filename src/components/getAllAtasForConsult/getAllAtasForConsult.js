/* eslint-disable camelcase */
import * as managerService from '../../services/manager/managerService';

function createData(number, type, description, archive_1, archive_2) {
  return {
    number, type, description, archive_1, archive_2,
  };
}

async function getAllMinutesForConsult(setId, setAllMinutes, setLoading) {
  const auxMinutes = [];
  const minutesId = [];
  try {
    const allMinutes = await managerService.getMinutes();

    allMinutes.forEach((object) => {
      minutesId.push(object._id);
      auxMinutes.push(createData(
        object.number,
        object.type,
        object.description,
        object.archive_1,
        object.archive_2,
      ));
    });

    setId(minutesId);
    setAllMinutes(auxMinutes);
    setLoading(false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllMinutesForConsult;
