import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';

const routingFunction = (param) => {
  const history = useHistory();

  history.push({
    pathname: '/NotFound',
    state: param,
  });
};

async function getMinutesById(minutesId, setMinutes) {
  try {
    managerService.getMinutesById(minutesId).then((Minute) => {
      Promise.all([
        managerService.getFileNameById(Minute.archive_1),
        managerService.getFileNameById(Minute.archive_2),
      ]).then((response) => {
        const minutes = {
          number: Minute.number,
          type: Minute.type,
          description: Minute.description,
          archive_1: response[0],
          archive_2: response[1],
        };
        setMinutes(minutes);
      });
    });
  } catch (error) {
    routingFunction();
  }
}

export default getMinutesById;
