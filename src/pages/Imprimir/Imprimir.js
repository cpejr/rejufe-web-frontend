import React, {
  useRef, useEffect, useState,
} from 'react';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import { useHistory } from 'react-router-dom';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useReactToPrint } from 'react-to-print';
import TableComponent from '../../components/ConsultaAssociados/ConsultAssociate';
import getAllAssociatesForConsult from '../../components/getAllAssociatesForConsult/getAllAssociatesForConsult';
import './Imprimir.css';

function Imprimir() {
  const [associates, setAllAssociates] = useState([]);
  const [id, setId] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllAssociatesForConsult(setId, setAllAssociates);
  }, []);

  const handleWindowClose = () => {
    history.push('/consulta-associados');
  };

  const tableAssociates = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => tableAssociates.current,
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
    <div>
      <div className="header-print-icon">
        <button
          type="button"
          className="print-associates-button"
          onClick={handlePrint}
        >
          <PrintRoundedIcon />
          Imprimir
        </button>
        <button
          type="button"
          className="return-print-associates-button"
          onClick={handleWindowClose}
        >
          <BackspaceIcon sx={{ fontSize: 20, marginRight: 1 }} />
          Voltar
        </button>
      </div>
      <div className="print-associates-table">
        <TableComponent id={id} rows={associates} titles={titles} ref={tableAssociates} print={false} />
      </div>
    </div>
  );
}

export default Imprimir;
