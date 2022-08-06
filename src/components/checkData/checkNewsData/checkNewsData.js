import { toast } from 'react-toastify';

toast.configure();

export default function checkNewsData(key, value) {
  if (value === '<p><br></p>' || value === '<p>Escreva a descrição aqui</p>') {
    toast.error('Descrição inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
    return true;
  }
  if (typeof value !== 'string') return false;
  if (value.length !== 0) return false;
  if (key === 'section') {
    toast.error('Seção inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  if (key === 'type') {
    toast.error('Tipo inválido!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  if (key === 'title') {
    toast.error('Titulo inválido!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  if (key === 'description' || value === '<p><br></p>') {
    toast.error('Descrição inválida!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
  return true;
}
