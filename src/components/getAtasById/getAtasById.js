import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';

const routingFunction = (param) => {
  const history = useHistory();

  history.push({
    pathname: '/NotFound',
    state: param,
  });
};

async function getAtasById(atasId, setAtas) {
  try {
    const response = await managerService.getAtasById(atasId);
    const atas = {
      number: response.number,
      type: response.type,
      description: response.description,
      archive_1: response.archive_1,
      archive_2: response.archive_2,
    };
    setAtas(atas);
  } catch (error) {
    routingFunction();
  }
}

export default getAtasById;
