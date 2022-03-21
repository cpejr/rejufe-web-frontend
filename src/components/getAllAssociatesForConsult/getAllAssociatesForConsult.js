/* eslint-disable no-nested-ternary */
import * as managerService from '../../services/manager/managerService';

function createData(name, cellPhoneNumber, status, allocation, acting, email) {
  return {
    name, cellPhoneNumber, status, allocation, acting, email,
  };
}

function compare(a, b) {
  const x = a.name.toUpperCase();
  const y = b.name.toUpperCase();

  return x === y ? 0 : x > y ? 1 : -1;
}

async function getAllAssociatesForConsult(setId, setAllAssociates) {
  const auxAssociate = [];
  const associateId = [];
  try {
    const allAssociates = await managerService.getAssociates();
    allAssociates.sort(compare);

    allAssociates.filter((user) => user.type.toLowerCase() !== 'administrador').forEach((object) => {
      associateId.push(object._id);
      auxAssociate.push(createData(
        object.name,
        object.cell_phone_number,
        object.status,
        object.allocation,
        object.acting,
        object.email,
      ));
    });

    setId(associateId);
    setAllAssociates(auxAssociate);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllAssociatesForConsult;