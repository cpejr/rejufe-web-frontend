import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';

toast.configure();

export default function setFileNameById(fileNames1, archive1Id, setFileNames1) {
  const value = Object.values(archive1Id);
  try {
    const aux1 = fileNames1;
    if (fileNames1.length === 0 && archive1Id) {
      value?.forEach((_id, index) => {
        if (_id !== undefined) {
          managerService.getFileNameById(_id).then((response) => {
            aux1.splice(index, 0, response);
            setFileNames1(aux1);
          });
        }
      });
    }
  } catch (error) {
    toast.error('Não foi possível obter o nome do arquivo', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
}
