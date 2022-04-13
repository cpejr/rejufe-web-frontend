import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';

toast.configure();
export default function setFileNameById2(fileNames2, archive2Id, setFileNames2) {
  try {
    const aux2 = fileNames2;
    if (fileNames2.length === 0 && archive2Id) {
      archive2Id?.forEach((_id, index) => {
        managerService.getFileNameById(_id).then((response) => {
          aux2.splice(index, 0, response);
          setFileNames2(aux2);
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
