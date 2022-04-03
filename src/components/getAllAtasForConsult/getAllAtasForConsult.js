/* eslint-disable camelcase */
import * as managerService from '../../services/manager/managerService';

function createData(number, type, description, archive_1, archive_2) {
  return {
    number, type, description, archive_1, archive_2,
  };
}

function getAllMinutesForConsult(setId, setAllMinutes, setLoading) {
  const auxMinutes = [];
  const minutesId = [];
  let fileName1 = '';
  let fileName2 = '';

  try {
    managerService.getMinutes().then((allMinutes) => {
      allMinutes.forEach((object) => {
        if (object.archive_1 !== '') {
          managerService.getFileNameById('6237dbb3313f3cf5a9e8bd0f').then((response) => {
            fileName1 = response;
            console.log('🚀 ~ file: getAllAtasForConsult.js ~ line 24 ~ managerService.getFileNameById ~ fileName1', fileName1);
          });
        }
        if (object.archive_2 !== '') {
          managerService.getFileNameById('6237dbb3313f3cf5a9e8bd0f').then((response) => {
            fileName2 = response;
          });
        }
        minutesId.push(object._id);
        auxMinutes.push(createData(
          object.number,
          object.type,
          object.description,
          fileName1,
          fileName2,
        ));
      });
      setId(minutesId);
      setAllMinutes(auxMinutes);
      console.log('🚀 ~ file: getAllAtasForConsult.js ~ line 41 ~ getAllMinutesForConsult ~ auxMinutes', auxMinutes);
      setLoading(false);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllMinutesForConsult;
