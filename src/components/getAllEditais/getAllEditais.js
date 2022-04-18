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

async function getAllEditais(setId, setAllEditais, history) {
  const auxEdicts = [];
  const edictsId = [];

  try {
    const allEdicts = await managerService.getEditais();
    allEdicts.sort();

    allEdicts.filter((editais) => editais.type.toLowerCase() !== 'atas').forEach((object) => {
      auxEdicts.push(createData(
        object.number,
        object.description,
      ));
    });
    allEdicts.forEach((object) => {
      edictsId.push(createId(
        object._id,
      ));
    });

    setAllEditais(auxEdicts);
    setId(edictsId);
  } catch (error) {
    history.push('/NotFound');
  }
}

export default getAllEditais;
