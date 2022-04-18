import * as managerService from '../../services/manager/managerService';

// eslint-disable-next-line camelcase
function createData(number, description) {
  return {
    number, description,
  };
}

function createId(_id) {
  return _id;
}

async function getAllListaComunicados(setAllCommunique, history, setId, setUse, setArchive1Id, setArchive2Id) {
  const auxCommunique = [];
  const communiqueId = [];
  const archive1Code = [];
  const archive2Code = [];

  try {
    const allCommunique = await managerService.getCommunique();
    allCommunique.sort();

    allCommunique.filter((comunicate) => comunicate.type.toLowerCase() !== 'informativo').forEach((object) => {
      auxCommunique.push(createData(
        object.number,
        object.description,
      ));
      archive1Code.push(object.archive_1);
      archive2Code.push(object.archive_2);
    });
    allCommunique.forEach((object) => {
      communiqueId.push(createId(
        object._id,
      ));
    });

    setAllCommunique(auxCommunique);
    setId(communiqueId);
    setArchive1Id(archive1Code);
    setArchive2Id(archive2Code);
    setUse(false);
  } catch (error) {
    history.push('/NotFound');
  }
}

export default getAllListaComunicados;
