import { toast } from 'react-toastify';

toast.configure();

export default function checkModelsData(key, value) {
  if (typeof value !== 'string') return false;
  if (key === 'numberModels') {
    const numberRegex = /^[0-9\b]*$/;
    if (!numberRegex.test(value)) return true;
    return false;
  }
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
