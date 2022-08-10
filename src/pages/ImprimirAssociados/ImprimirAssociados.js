import React, {
  useRef, useEffect, useState,
} from 'react';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useReactToPrint } from 'react-to-print';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';
import getAllAssociatesForConsult from '../../components/getAllAssociatesForConsult/getAllAssociatesForConsult';
import './ImprimirAssociate.css';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const { id } = this.props;
    const { rows } = this.props;
    const { titles } = this.props;
    const { ref } = this.props;
    const { printAssociados } = this.props;

    return (
      <div>
        <TableComponent
          id={id}
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

const titles = [
  'Nome',
  'Celular',
  'Status',
  'Lotação',
  'Atuação',
  'Email',
];

function Imprimir() {
  const [associates, setAllAssociates] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [printAssociados, setPrintAssociados] = useState({ print: false, resolve: undefined });

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

  useEffect(() => {
    getAllAssociatesForConsult(setId, setAllAssociates, setLoading);
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
      {printAssociados?.print ? (
        <div className="print-consult-associates-forms">
          <ComponentToPrint
            id={id}
            rows={associates}
            titles={titles}
            printAssociados={printAssociados}
            ref={tableAssociates}
            loading={loading}
          />
        </div>
      ) : (
        <div className="print-associates-table">
          <ComponentToPrint id={id} rows={associates} titles={titles} ref={tableAssociates} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default Imprimir;
