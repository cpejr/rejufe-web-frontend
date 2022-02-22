import React from 'react';
import LottieControl from './Animation';
import './notFound.css';

export default function NotFound() {
  return (
    <div className="containerNotFound">
      <div className="boxNotFound">
        <div className="animationNotFound">
          <LottieControl
            width={100}
            height={100}
          />
        </div>
        <div className="textNotFound">
          <h1>Página não encontrada</h1>
          <h2>
            Não foi possível encontrar a página que você está procurando. Isso
            ocorre porque:
          </h2>
          <p>- Há um erro no URL em seu navegador web.</p>
          <p>- A página que você está procurando foi movida ou excluída.</p>
        </div>
      </div>
    </div>
  );
}
