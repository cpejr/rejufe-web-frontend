/* eslint-disable no-nested-ternary */
import moment from 'moment';
import { toast } from 'react-toastify';
import ptLocale from 'moment/locale/pt-br';
import * as managerService from '../../services/manager/managerService';

moment.locale('pt-br', [ptLocale]);

function createData(birth, name, cellPhoneNumber) {
  return {
    birth, name, cellPhoneNumber,
  };
}

function compare(a, b) {
  const x = a.name.toUpperCase();
  const y = b.name.toUpperCase();

  return x === y ? 0 : x > y ? 1 : -1;
}

async function getAllBirthdays(setId, setAllAssociates, history, setLoading) {
  const auxAssociate = [];
  const associateId = [];
  setLoading(true);
  try {
    const allAssociates = await managerService.getAssociates();
    allAssociates.sort(compare);

    allAssociates.filter((user) => ((user.type.toLowerCase() !== 'administrador') && (moment().format('M') === moment(user?.birth).format('M')))).forEach((object) => {
      associateId.push(object._id);
      auxAssociate.push(createData(
        moment(object?.birth).format('DD/MM'),
        object.name,
        object.cell_phone_number,
      ));
    });

    setId(associateId);
    setAllAssociates(auxAssociate);
    setLoading(false);
  } catch (error) {
    history.push('/NotFound');
    toast.error('Erro ao listar os Aniversariantes!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  }
}

export default getAllBirthdays;
