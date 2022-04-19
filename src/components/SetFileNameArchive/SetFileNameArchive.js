import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';

toast.configure();

export default function setFileNameById(fileNames1, archive1Id, setFileNames1) {
  try {
    const aux1 = fileNames1;
    if (fileNames1.length === 0 && archive1Id) {
      archive1Id?.forEach((_id, index) => {
        managerService.getFileNameById(_id).then((response) => {
          aux1.splice(index, 0, response);
          setFileNames1(aux1);
        });
      });
    }
  } catch (error) {
    toast.error('Não foi possível obter o nome do arquivo', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
}