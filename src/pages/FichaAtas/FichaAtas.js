import { React, useEffect, useState } from 'react';
import './FichaAtas.css';
import { useLocation } from 'react-router-dom';
import fichaMinutes from '../../components/ConsultaAtas/FichaAtas';
import getMinutesById from '../../components/getAtasById/getAtasById';

function FichaMinutes() {
  const { search } = useLocation();
  const minutesId = new URLSearchParams(search).get('atasId');
  const [minutes, setMinutes] = useState([]);
  console.log('🚀 ~ file: FichaAtas.js ~ line 11 ~ FichaMinutes ~ minutes', minutes);

  useEffect(() => {
    getMinutesById(minutesId, setMinutes);
  }, []);

  return (
    <body className="forms-minutes-body">
      <div className="forms-minutes-Container">
        <table className="forms-minutes-table-container">
          <div className="forms-minutes-grid-container">
            <table width="100%">
              <tr>
                <td className="forms-minutes-td-container">
                  <table className="forms-minutes-t-container">
                    {fichaMinutes?.map((ficha) => (
                      <table className="forms-minutes-t-container">
                        <table width="100%">
                          <div className="forms-minutes-title">
                            <td className="forms-minutes-td-title">
                              {ficha.title}
                            </td>
                          </div>
                        </table>
                        {ficha?.lines.map((line) => (
                          <table width="100%">
                            <tr>
                              {line?.items.map((item) => (
                                <div className="forms-minutes-td-box">
                                  <span className="forms-minutes-subtitle">
                                    {' '}
                                    {item.label}
                                    {' '}
                                  </span>
                                  <br />
                                  <span className="forms-minutes-value">
                                    {' '}
                                    {minutes[item.id]}
                                    {' '}
                                  </span>
                                </div>
                              ))}
                            </tr>
                          </table>
                        ))}
                      </table>
                    ))}
                    <table width="100%">
                      <tr>
                        <td className="forms-minutes-td-title" height="25px" />
                      </tr>
                    </table>
                  </table>
                  <table />
                </td>
              </tr>
            </table>
          </div>
        </table>
      </div>
    </body>

  );
}

export default FichaMinutes;
