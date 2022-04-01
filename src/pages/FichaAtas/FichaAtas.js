import { React, useEffect, useState } from 'react';
import './FichaAtas.css';
import { useLocation } from 'react-router-dom';
import fichaMinutes from '../../components/ConsultaAtas/FichaAtas';
import getMinutesById from '../../components/getAtasById/getAtasById';

function FichaMinutes() {
  const { search } = useLocation();
  const minutesId = new URLSearchParams(search).get('minutesId');
  const [minutes, setMinutes] = useState([]);

  useEffect(() => {
    getMinutesById(minutesId, setMinutes);
  }, []);

  return (
    <body className="forms-atas-body">
      <div className="forms-atas-Container">
        <table className="forms-atas-table-container">
          <div className="forms-atas-grid-container">
            <table width="100%">
              <tr>
                <td className="forms-atas-td-container">
                  <table className="forms-atas-t-container">
                    {fichaMinutes?.map((ficha) => (
                      <table className="forms-atas-t-container">
                        <table width="100%">
                          <div className="forms-atas-title">
                            <td className="forms-atas-td-title">
                              {ficha.title}
                            </td>
                          </div>
                        </table>
                        {ficha?.lines.map((line) => (
                          <table width="100%">
                            <tr>
                              {line?.items.map((item) => (
                                <div className="forms-atas-td-box">
                                  <span className="forms-atas-subtitle">
                                    {' '}
                                    {item.label}
                                    {' '}
                                  </span>
                                  <br />
                                  <span className="forms-atas-value">
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
                        <td className="forms-atas-td-title" height="25px" />
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
