import React, {
  useRef, useState, useEffect,
} from 'react';
import './FichaAtas.css';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from 'react-router-dom';
import fichaMinutes from '../../components/ConsultaAtas/FichaAtas';
import getMinutesById from '../../components/getAtasById/getAtasById';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const { minutes } = this.props;

    return (
      <div>
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
    );
  }
}

function FichaMinutes() {
  const { search } = useLocation();
  const minutesId = new URLSearchParams(search).get('atasId');
  const [minutes, setMinutes] = useState([]);

  useEffect(() => {
    getMinutesById(minutesId, setMinutes);
  }, []);

  const handleWindowClose = () => {
    window.close('/imprimir');
  };

  const tableMinutes = useRef(null);
  console.log('🚀 ~ file: FichaAtas.js ~ line 88 ~ FichaMinutes ~ tableMinutes', tableMinutes);

  const handlePrint = useReactToPrint({
    content: () => tableMinutes?.current,
  });

  // const handleWindowOpen = () => {
  //   window.open(route);
  // };

  return (
    <body className="forms-minutes-body">
      <div className="forms-minutes-Container">
        <div className="header-print-minutes-icon">
          <button
            type="button"
            className="print-minutes-button"
            onClick={handlePrint}
          >
            <PrintRoundedIcon sx={{ fontSize: 20, marginRight: 1 }} />
            Imprimir
          </button>
          <button
            type="button"
            className="return-print-minutes-button"
            onClick={handleWindowClose}
          >
            <BackspaceIcon sx={{ fontSize: 20, marginRight: 1 }} />
            Fechar
          </button>
        </div>
        <div className="print-associates-table">
          <ComponentToPrint minutes={minutes} ref={tableMinutes} />
        </div>
      </div>
    </body>

  );
}

export default FichaMinutes;
