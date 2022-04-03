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

  try {
    managerService.getMinutes().then((allMinutes) => {
      allMinutes.forEach((object) => {
        Promise.all([
          managerService.getFileNameById('6237dbb3313f3cf5a9e8bd0f'),
          managerService.getFileNameById('6237dbb3313f3cf5a9e8bd0f'),
        ]).then((response) => {
          minutesId.push(object._id);
          auxMinutes.push(createData(
            object.number,
            object.type,
            object.description,
            response[0],
            response[1],
          ));
          return [auxMinutes, minutesId];
        }).then((response2) => {
          setAllMinutes(response2[0]);
          setId(response2[1]);
          setLoading(false);
        });
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllMinutesForConsult;
