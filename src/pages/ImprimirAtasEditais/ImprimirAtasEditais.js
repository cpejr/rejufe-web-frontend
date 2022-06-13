import React, {
  useRef, useState, useEffect,
} from 'react';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useReactToPrint } from 'react-to-print';
import TableComponent from '../../components/dashboard/dashboardComponent';
import getAllMinutesForConsult from '../../components/getAllAtasForConsult/getAllAtasForConsult';
import './ImprimirAtasEditais.css';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const { id } = this.props;
    const { rows } = this.props;
    const { titles } = this.props;
    const { ref } = this.props;
    const { printAtas } = this.props;

    return (
      <div>
        <TableComponent id={id} rows={rows} titles={titles} printAtas={printAtas?.print} ref={ref} print />
      </div>
    );
  }
}

const titles = [
  'Número',
  'Tipo',
  'Descrição',
  'Arquivo 1',
  'Arquivo 2',
];

function Imprimir() {
  const [minutes, setAllMinutes] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [printAtas, setPrintAtas] = useState({ print: false, resolve: undefined });

  const handleWindowClose = () => {
    window.close();
  };

  const tableAssociates = useRef(null);

  useEffect(() => {
    const { resolve, ...otherState } = printAtas;
    if (resolve) {
      resolve();
      setPrintAtas({ ...otherState, resolve: undefined });
    }
  }, [printAtas]);

  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => new Promise((resolve) => {
      setPrintAtas({ print: true, resolve });
    }),
    content: () => tableAssociates?.current,
    onAfterPrint: () => setPrintAtas({ print: false, resolve: undefined }),
  });

  useEffect(() => {
    getAllMinutesForConsult(setId, setAllMinutes, setLoading);
  }, []);

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
      {printAtas?.print ? (
        <div className="print-minutes-table-forms">
          <ComponentToPrint
            id={id}
            rows={minutes}
            titles={titles}
            printAtas={printAtas}
            ref={tableAssociates}
            loading={loading}
          />
        </div>
      ) : (
        <div className="print-minutes-table">
          <ComponentToPrint id={id} rows={minutes} titles={titles} ref={tableAssociates} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default Imprimir;
