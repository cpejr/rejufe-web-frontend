import * as managerService from '../../services/manager/managerService';

// eslint-disable-next-line camelcase
function createData(number, description, archive_1, archive_2) {
  return {
    number, description, archive_1, archive_2,
  };
}

async function getAllListaComunicados(setAllCommunique, history) {
  const auxCommunique = [];

  try {
    const allCommunique = await managerService.getCommunique();
    allCommunique.sort();

    allCommunique.filter((comunicate) => comunicate.type.toLowerCase() !== 'informativo').forEach((object) => {
      auxCommunique.push(createData(
        object.number,
        object.description,
        object.archive_1,
        object.archive_2,
      ));
    });

    setAllCommunique(auxCommunique);
  } catch (error) {
    history.push('/NotFound');
  }
}

export default getAllListaComunicados;
