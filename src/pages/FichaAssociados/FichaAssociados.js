import { React, useEffect, useState } from 'react';
import './FichaAssociados.css';
import { useLocation } from 'react-router-dom';
import fichaAssociate from '../../components/ConsultaAssociados/FichaAssociate';
import getAssociateById from '../../components/getAssociateById/getAssociateById';

function FichaAssociados() {
  const { search } = useLocation();
  const associateId = new URLSearchParams(search).get('associateId');
  const [associate, setAssociate] = useState([]);

  useEffect(() => {
    getAssociateById(associateId, setAssociate);
  }, []);

  return (
    <body>
      <table className="fichaAssociadosTableContainer">
        <div className="fichaAssociadosGridContainer">
          <table width="100%">
            <tr>
              <td className="fichaAssociadosTdContainer">
                <table className="fichaAssociadosTContainer">
                  <table width="100%">
                    <tr>
                      <td>
                        <img src="images/logoFichaAssociados.png" alt="logo" width="75%" />
                      </td>
                      <td>
                        <img src="images/FichaAssociados.png" alt="nome" width="75%" />
                      </td>
                    </tr>
                  </table>
                  {fichaAssociate.map((ficha) => (
                    <table className="fichaAssociadosTContainer">
                      <table width="100%">
                        <tr>
                          <td className="fichaAssociadosTdTitle">
                            {ficha.title}
                          </td>
                        </tr>
                      </table>
                      {ficha.lines.map((line) => (
                        <table width="100%">
                          <tr>
                            {line.items.map((item) => (
                              <td className="fichaAssociadosTdBox">
                                <span className="fichaAssociadosSubtitle">
                                  {' '}
                                  {item.label}
                                  {' '}
                                </span>
                                <br />
                                <span>
                                  {' '}
                                  {associate[item.id]}
                                  {' '}
                                </span>
                              </td>
                            ))}
                          </tr>
                        </table>
                      ))}
                    </table>
                  ))}
                  <table width="100%">
                    <tr>
                      <td className="fichaAssociadosTdTitle" height="25px" />
                    </tr>
                  </table>
                </table>
                <table />
              </td>
            </tr>
          </table>
        </div>
      </table>
    </body>

  );
}

export default FichaAssociados;
