import { React, useEffect, useState } from 'react';
import './FichaAtas.css';
import { useLocation } from 'react-router-dom';
import fichaAtas from '../../components/ConsultaAtas/FichaAtas';
import getAtasById from '../../components/getAtasById/getAtasById';

function FichaAtas() {
  const { search } = useLocation();
  const atasId = new URLSearchParams(search).get('atasId');
  const [atas, setAtas] = useState([]);

  useEffect(() => {
    getAtasById(atasId, setAtas);
  }, []);

  return (
    <body className="formsAtas-Body">
      <div className="formsAtas-Container">
        <table className="formsAtasTableContainer">
          <div className="formsAtasGridContainer">
            <table width="100%">
              <tr>
                <td className="formsAtasTdContainer">
                  <table className="formsAtasTContainer">
                    {fichaAtas?.map((ficha) => (
                      <table className="formsAtasTContainer">
                        <table width="100%">
                          <div className="formsAtas-Title">
                            <td className="formsAtasTdTitle">
                              {ficha.title}
                            </td>
                          </div>
                        </table>
                        {ficha?.lines.map((line) => (
                          <table width="100%">
                            <tr>
                              {line?.items.map((item) => (
                                <div className="formsAtasTdBox">
                                  <span className="formsAtasSubtitle">
                                    {' '}
                                    {item.label}
                                    {' '}
                                  </span>
                                  <br />
                                  <span className="formsAtasValue">
                                    {' '}
                                    {atas[item.id]}
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
                        <td className="formsAtasTdTitle" height="25px" />
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

export default FichaAtas;
