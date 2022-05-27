/* eslint-disable no-underscore-dangle */
import React from 'react';
import './DateQuizzes.css';

export default function DateQuizzes({ status }) {
  return (
    <div>
      <div>
        {status && (
          <div>
            {status === 'progress'
              ? (
                <div className="container-date-quizz-progress">
                  <h5>Em andamento</h5>
                </div>
              )
              : (
                <>
                  {status === 'finish' ? (
                    <div className="container-date-quizz-finish">
                      <h5>Finalizada</h5>
                    </div>
                  ) : (
                    <div className="container-date-quizz-to-init">
                      <h5>Não iniciada</h5>
                    </div>
                  )}
                  <div />
                </>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
