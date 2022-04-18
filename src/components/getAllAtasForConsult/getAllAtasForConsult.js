/* eslint-disable camelcase */
import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';

function createData(number, type, description, archive_1, archive_2) {
  return {
    number, type, description, archive_1, archive_2,
  };
}

function getAllMinutesForConsult(setId, setAllMinutes, setLoading) {
  const auxMinutes = [];
  const minutesId = [];
  const history = useHistory();

  try {
    managerService.getMinutes().then((allMinutes) => {
      allMinutes.forEach((object) => {
        Promise.all([
          managerService.getFileNameById(object.archive_1),
          managerService.getFileNameById(object.archive_2),
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
          if (response2[0]?.length === allMinutes?.length) {
            setAllMinutes(response2[0]);
            setId(response2[1]);
            setLoading(false);
          }
        });
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    history.push('/NotFound');
  }
}

export default getAllMinutesForConsult;
