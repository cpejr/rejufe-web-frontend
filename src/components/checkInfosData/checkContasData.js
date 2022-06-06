import { toast } from 'react-toastify';

toast.configure();

export default function checkContasData(key, value) {
  if (typeof value !== 'string') return false;
  if (value.length !== 0) return false;
  if (key === 'date') {
    toast.error('Data inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  if (key === 'pdf') {
    toast.error('Arquivo inválido!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  if (key === 'title') {
    toast.error('Título inválido!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  if (key === 'description') {
    toast.error('Descrição inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  return true;
}
