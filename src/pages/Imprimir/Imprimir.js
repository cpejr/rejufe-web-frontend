import React, {
  useRef, useEffect, useState,
} from 'react';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useReactToPrint } from 'react-to-print';
import { CircularProgress } from '@mui/material';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';
import getAllAssociatesForConsult from '../../components/getAllAssociatesForConsult/getAllAssociatesForConsult';
import './Imprimir.css';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const { id } = this.props;
    const { rows } = this.props;
    const { titles } = this.props;
    const { ref } = this.props;

    return (
      <div>
        <TableComponent id={id} rows={rows} titles={titles} ref={ref} print />
      </div>
    );
  }
}

function Imprimir() {
  const [associates, setAllAssociates] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAssociatesForConsult(setId, setAllAssociates, setLoading);
  }, []);

  const handleWindowClose = () => {
    window.close('/imprimir');
  };

  const tableAssociates = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => tableAssociates?.current,
  });

  const titles = [
    '',
    'Nome',
    'Celular',
    'Status',
    'Lotação',
    'Atuação',
    'Email',
  ];

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
      {loading ? (
        <div className="loader-consult-associates-table">
          <CircularProgress />
        </div>
      ) : (
        <div className="print-associates-table">
          <ComponentToPrint id={id} rows={associates} titles={titles} ref={tableAssociates} />
        </div>
      )}
    </div>
  );
}

export default Imprimir;