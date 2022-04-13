/* eslint-disable camelcase */
import * as managerService from '../../services/manager/managerService';

function createData(number, description) {
  return {
    number, description,
  };
}

function getAllEditais(setId, setAllEditais, setLoading) {
  const auxEditais = [];
  const editaisId = [];

  try {
    managerService.getEditais().then((allEditais) => {
      allEditais.forEach((object) => {
        Promise.all([
          managerService.getFileNameById(object.archive_1),
          managerService.getFileNameById(object.archive_2),
        ]).then(() => {
          editaisId.push(object._id);
          auxEditais.push(createData(
            object.number,
            object.description,
          ));
          return [auxEditais, editaisId];
        }).then((response2) => {
          if (response2[0]?.length === allEditais?.length) {
            setAllEditais(response2[0]);
            setId(response2[1]);
            setLoading(false);
          }
        });
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export default getAllEditais;
