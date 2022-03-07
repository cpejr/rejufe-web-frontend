import React from 'react';
import ModalEnquete from '../../components/Enquetes/modalEnquetes';
import { useAuth } from '../../providers/auth';

function Enquete() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>Enquetes</h1>
      {(user?.type === 'administrador' ? (
        <ModalEnquete />
      ) : (
        <div />
      ))}
    </div>
  );
}

export default Enquete;
