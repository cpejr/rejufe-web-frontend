import { toast } from 'react-toastify';
import * as managerService from '../../services/manager/managerService';

toast.configure();

export default function SetFileNameById(fileNames1, archive1Id, setFileNames1) {
  const value = Object.values(archive1Id);
  try {
    const aux1 = fileNames1;
    if ((fileNames1.length === 0 && archive1Id) || (fileNames1.filter((filename) => filename !== '').length !== archive1Id.filter((archiveId) => archiveId !== '').length)) {
      value?.forEach((_id, index) => {
        if (_id) {
          managerService.getFileNameById(_id).then((response) => {
            aux1[index] = response;
          });
        } else {
          aux1[index] = '';
        }
      });
    }
    setFileNames1(aux1);
  } catch (error) {
    toast.error('Não foi possível obter o nome do arquivo', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
}
