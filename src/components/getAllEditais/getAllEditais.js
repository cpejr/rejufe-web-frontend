import { toast } from 'react-toastify';
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

async function getAllEdicts(setId, setAllEdicts, history, setUse, setArchive1Id, setArchive2Id) {
  const auxEdicts = [];
  const edictsId = [];
  const archive1Code = [];
  const archive2Code = [];

  try {
    const allEdicts = await managerService.getEdicts();
    allEdicts.sort();

    allEdicts.filter((editais) => editais.type.toLowerCase() !== 'atas').forEach((object) => {
      auxEdicts.push(createData(
        object.number,
        object.description,
      ));
      archive1Code.push(object.archive_1);
      archive2Code.push(object.archive_2);
    });
    allEdicts.forEach((object) => {
      edictsId.push(createId(
        object._id,
      ));
    });

    setAllEdicts(auxEdicts);
    setId(edictsId);
    setArchive1Id(archive1Code);
    setArchive2Id(archive2Code);
    setUse(false);
  } catch (error) {
    history.push('/NotFound');
    toast.error('Erro ao listar os Editais!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  }
}

export default getAllEdicts;
