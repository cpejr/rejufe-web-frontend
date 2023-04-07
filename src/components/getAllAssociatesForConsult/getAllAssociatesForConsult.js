/* eslint-disable no-nested-ternary */
import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';

const routingFunction = (param) => {
  const history = useHistory();

  history.push({
    pathname: '/NotFound',
    state: param,
  });
};

function createData(_id, name, cellPhoneNumber, status, allocation, acting, email) {
  return {
    _id, name, cellPhoneNumber, status, allocation, acting, email,
  };
}

function compare(a, b) {
  const x = a.name.toUpperCase();
  const y = b.name.toUpperCase();

  return x === y ? 0 : x > y ? 1 : -1;
}

async function getAllAssociatesForConsult(setAllAssociates, setLoading, setDataFilter) {
  setLoading(true);
  const auxAssociate = [];
  try {
    const allAssociates = await managerService.getAssociates();
    allAssociates.sort(compare);
    const activeAssociates = allAssociates.filter((user) => user.type.toLowerCase() !== 'administrador').filter((associate) => associate.status === 'A');
    activeAssociates.forEach((object) => {
      auxAssociate.push(createData(
        object._id,
        object.name,
        object.cell_phone_number,
        object.status,
        object.allocation,
        object.acting,
        object.email,
      ));
      setDataFilter(activeAssociates);
    });
    setAllAssociates(auxAssociate);
    setLoading(false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    setLoading(false);
    routingFunction();
  }
}

export default getAllAssociatesForConsult;
