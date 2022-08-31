import React, {
  useRef, useEffect, useState,
} from 'react';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useReactToPrint } from 'react-to-print';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';
import './ImprimirAssociate.css';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const { rows } = this.props;
    const { titles } = this.props;
    const { ref } = this.props;
    const { printAssociados } = this.props;

    return (
      <div>
        <TableComponent
          rows={rows}
          titles={titles}
          printAssociados={printAssociados?.print}
          ref={ref}
          print
        />
      </div>
    );
  }
}

function Imprimir() {
  const titles = JSON.parse(sessionStorage.titlesToPrint);
  const associados = JSON.parse(sessionStorage.associadosToPrint);
  const [printAssociados, setPrintAssociados] = useState({ print: false, resolve: undefined });
  titles.shift();

  const handleWindowClose = () => {
    window.close();
  };

  const tableAssociates = useRef(null);

  useEffect(() => {
    const { resolve, ...otherState } = printAssociados;
    if (resolve) {
      resolve();
      setPrintAssociados({ ...otherState, resolve: undefined });
    }
  }, [printAssociados]);

  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => new Promise((resolve) => {
      setPrintAssociados({ print: true, resolve });
    }),
    content: () => tableAssociates?.current,
    onAfterPrint: () => setPrintAssociados({ print: false, resolve: undefined }),
  });

  return (
    <div className="container-print-associates-page">
      <div className="header-print-associates-icon">
        <button
          type="button"
          className="print-associates-button"
          onClick={handlePrint}
        >
          <PrintRoundedIcon sx={{ fontSize: 20, marginRight: 1 }} />
          Imprimir
        </button>
        <button
          type="button"
          className="return-print-associates-button"
          onClick={handleWindowClose}
        >
          <BackspaceIcon sx={{ fontSize: 20, marginRight: 1 }} />
          Fechar
        </button>
      </div>
      {printAssociados?.print ? (
        <div className="print-consult-associates-forms">
          <ComponentToPrint
            rows={associados}
            titles={titles}
            printAssociados={printAssociados}
            ref={tableAssociates}
          />
        </div>
      ) : (
        <div className="print-associates-table">
          <ComponentToPrint rows={associados} titles={titles} ref={tableAssociates} />
        </div>
      )}
    </div>
  );
}

export default Imprimir;
