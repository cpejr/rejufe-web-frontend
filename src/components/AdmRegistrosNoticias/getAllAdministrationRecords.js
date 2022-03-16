/* eslint-disable no-nested-ternary */
import * as managerService from '../../services/manager/managerService';

function createData(status, title, date, section, type) {
  return {
    status, title, date, section, type,
  };
}

async function getAllAdministrationRecords(setId, setAllAdministrationRecords) {
  const auxAssociate = [];
  const associateId = [];
  try {
    const allAssociates = await managerService.getAssociates();
    allAssociates.sort();

    allAssociates.filter((user) => user.type.toLowerCase() !== 'administrador').forEach((object) => {
      associateId.push(object._id);
      auxAssociate.push(createData(
        object.news_sequential_id,
        object.status,
        object.title,
        object.date,
        object.section,
        object.type,
      ));
    });

    setId(associateId);
    setAllAdministrationRecords(auxAssociate);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllAdministrationRecords;
