/* eslint-disable camelcase */
import * as managerService from '../../services/manager/managerService';

function createData(number, description) {
  return {
    number, description,
  };
}

function getAllEditais(setAllEditais) {
  const auxEditais = [];

  try {
    managerService.getEditais().then((allEditais) => {
      allEditais.filter((user) => user.type.toLowerCase() !== 'atas').forEach((object) => {
        Promise.all([
          managerService.getFileNameById(object.archive_1),
          managerService.getFileNameById(object.archive_2),
        ]).then(() => {
          auxEditais.push(createData(
            object.number,
            object.description,
          ));
          return [auxEditais];
        }).then((response2) => {
          if (response2[0]?.length === allEditais?.length) {
            setAllEditais(response2[0]);
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
