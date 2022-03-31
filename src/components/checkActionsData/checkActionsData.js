import { toast } from 'react-toastify';

toast.configure();

export default function checkActionsData(key, value) {
  if (typeof value !== 'string') return false;
  if (value.length !== 0) return false;
  if (key === 'type') {
    toast.error('Tipo inválido!!', {
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
