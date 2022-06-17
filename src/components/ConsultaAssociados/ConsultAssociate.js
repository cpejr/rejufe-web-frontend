/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import TableFooter from '@mui/material/TableFooter';
import { useMediaQuery, CircularProgress } from '@mui/material/';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import './ConsultAssociates.css';

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange,
  } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function ConsultaAssociados({
  titles, rows, id, order, edit, search, searchFile, print, loading,
}) {
  console.log('🚀 ~ file: ConsultAssociate.js ~ line 107 ~ rows', rows);
  const [data, setData] = useState(rows);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [open, setOpen] = useState(false);
  const renderAssociate = [];
  const matches = useMediaQuery('(max-width:930px)');
  const matchesFont90 = useMediaQuery('(max-width:930px)');
  const matchesFont85 = useMediaQuery('(max-width:680px)');
  const matchesFont400px = useMediaQuery('(max-width:400px)');

  const handleWindowOpen = () => {
    window.open('/imprimir-associados');
  };

  const footerProps = {
    sx: matchesFont400px
      ? {
        minWidth: 400,
      }
      : { minWidth: 500 },
    style: matches
      ? {
        display: 'flex',
        margin: '2%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }
      : {
        display: 'flex',
        justifyContent: 'center',
        margin: '1%',
        alignItems: 'center',
      },
  };

  const cellFontProps = {
    style: matchesFont85
      ? {
        fontSize: '85%',
        borderStyle: 'solid',
        borderWidth: '1px 0px 1px 1px',
        padding: '6px',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          borderStyle: 'solid',
          borderWidth: '1px 0px 1px 1px',
        }
        : {
          fontSize: '100%',
          borderStyle: 'solid',
          borderWidth: '1px 0px 1px 1px',
        },
  };

  const titleFontProps = {
    style: matchesFont85
      ? {
        fontSize: '85%',
        backgroundColor: '#2574A9',
        color: 'white',
        padding: '3px',
        textAlign: 'center',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          backgroundColor: '#2574A9',
          color: 'white',
        }
        : {
          fontSize: '100%',
          backgroundColor: '#2574A9',
          color: 'white',
        },
  };

  const buttonFontProps = {
    style: matchesFont85
      ? {
        fontSize: '85%',
        backgroundColor: '#2574A9',
        color: 'white',
        padding: '6px',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          backgroundColor: '#2574A9',
          color: 'white',
        }
        : {
          fontSize: '77%',
          backgroundColor: '#2574A9',
          color: 'white',
        },
  };

  const tableProps = {
    sx: matchesFont400px
      ? {
        minWidth: 400,
      }
      : { minWidth: 650 },
    size: matchesFont85
      ? 'small'
      : matchesFont90
        ? 'medium'
        : 'big',
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function redirect(e, redirectId) {
    e.preventDefault();
    const win = window.open(`/ficha-associados?associateId=${redirectId}`, '_blank');
    win.focus();
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, 'A');
    str = str.replace(/[àáâãäå]/, 'a');
    str = str.replace(/[ÙÚÛÜ]/, 'U');
    str = str.replace(/[úúûü]/, 'u');
    str = str.replace(/[ÈÉÊË]/, 'E');
    str = str.replace(/[éèêë]/, 'e');
    str = str.replace(/[íìîï]/, 'i');
    str = str.replace(/[ÍÌÎÏ]/, 'I');
    str = str.replace(/[óòôöõ]/, 'o');
    str = str.replace(/[ÓÒÔÖÕ]/, 'O');
    str = str.replace(/[Ç]/, 'C');
    str = str.replace(/[ç]/, 'c');

    // o resto

    return str.replace(/[^a-z0-9]/gi, '');
  }

  // eslint-disable-next-line max-len
  const filterName = rows?.filter(((item) => replaceSpecialChars(item?.name).toLowerCase().includes(replaceSpecialChars(query))));
  const filterType = rows?.filter(((item) => item.allocation?.includes(type)));

  const handleData = () => {
    console.log('top');
    if (query !== '' && type === '') {
      console.log('vida');
      setData(filterName);
      setQuery('');
    }
    if (type !== '' && query === '') {
      setData(filterType);
      setType('');
    }
    if (type !== '' && query !== '') {
      filterType?.forEach((obj) => {
        const filter = filterName.filter(((item) => item.allocation.includes(obj.type)));
        setData(filter);
      });
      setType('');
      setQuery('');
    }
    handleClose();
  };

  console.log(data);

  const body = (
    <Box className="AcceptModal-ContainerModal">
      <div className="AcceptModal-text">
        <div className="AcceptModal-Question">Pesquisa Avançada</div>
      </div>
      <div className="AcceptModal-Buttons">
        <div className="AcceptModal-Bu">

          <label>Nome:</label>

          <input type="text" setFilterValue onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
        <div className="AcceptModal-Bu">

          <p> Seção Judiciária:</p>

          <select className="EditModal-Input" setFilterType placeholder="" onChange={(e) => setType(e.target.value)}>
            <option value=" "> </option>
            <option value="SERGIPE">SE</option>
            <option value="ALAGOAS">AL</option>
            <option value="PERNAMBUCO">PE</option>
            <option value="PARAÍBA">PB</option>
            <option value="RIO GRANDE DO NORTE">RN</option>
            <option value="CEARÁ">CE</option>
          </select>
        </div>
        <div className="buttons">
          <div className="AcceptModal-button1">
            <button
              type="button"
              className="AcceptModal-ButtonCancel"
              onClick={() => {
                handleData();
              }}
            >
              <div className="AcceptModal-align">
                <p>Pesquisa Avançada</p>
              </div>
            </button>
          </div>
          <div className="AcceptModal-button2">
            <button
              className="AcceptModal-ButtonConfirm"
              type="button"
            >
              <div className="AcceptModal-align">
                <p>Limpar</p>
              </div>
            </button>
          </div>
          <div className="AcceptModal-button3">
            <button type="button" className="AcceptModal-ButtonCancel" onClick={handleClose}>
              <div className="AcceptModal-align">
                <p>Voltar</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
  return (
    <TableContainer
      component={Paper}
      sx={{ marginLeft: 'auto', marginRight: 'auto' }}
    >
      <Table
        {...tableProps}
        aria-label="caption table"
      >
        <TableHead>
          <TableRow>
            {titles?.map((title) => (
              <TableCell {...titleFontProps}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row, index) => (
              <TableRow>
                {order ? (
                  <TableCell {...cellFontProps} align="center">
                    {rows.findIndex((obj) => obj._id === row._id) + 1}
                  </TableCell>
                ) : search ? (
                  <TableCell {...cellFontProps} align="center">
                    <IconButton color="primary" aria-label="Search" onClick={(e) => redirect(e, id[index + (page * 10)])}>
                      <SearchIcon />
                    </IconButton>
                  </TableCell>
                ) : edit ? (
                  <TableCell {...cellFontProps} align="center">
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                      {/* TODO Substituir o modal de deletar no lugar do DeleteIcon, passando row._id e tipo do delete.
                      Há um modal implementado de forma parecida na pagina de produtos do lojista no pet system */}
                    </IconButton>
                    <IconButton color="primary" aria-label="Edit">
                      <EditIcon />
                      {/* TODO Substituir o modal de pesquisa no lugar do editIcon, passando row._id e tipo da edição.
                      Há um modal implementado de forma parecida na pagina de produtos do lojista no pet system */}
                    </IconButton>
                  </TableCell>
                ) : searchFile ? (
                  <TableCell {...cellFontProps} align="center">
                    <FindInPageIcon aria-label="findFile" />
                  </TableCell>
                ) : (
                  null
                )}
                {Object.values(row)?.map((dado) => (
                  <TableCell {...cellFontProps}>
                    {dado}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell
                {...cellFontProps}
                colSpan={6}
              />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {loading && (
        <TableRow style={{
          height: 53 * rowsPerPage, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <CircularProgress />
        </TableRow>
      )}
      <TableFooter {...footerProps}>
        {print === false ? (
          <>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
              component="div"
              style={{ overflow: 'hidden' }}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Linhas por pagina"
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Linhas por pagina',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
            <div className="button-table-component-pagination-consult">
              <Button
                {...buttonFontProps}
                sx={{
                  marginRight: '15px',
                  marginLeft: '15px',
                }}
                onClick={handleOpen}
              >
                Pesquisa Avançada
                {/* TODO Implementar o botão de pesquisa avançada */}
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </div>
            <div>
              <Button
                {...buttonFontProps}
                onClick={handleWindowOpen}
              >
                Imprimir
              </Button>
            </div>
          </>
        ) : (
          <TablePagination
            rowsPerPageOptions={[{ label: 'All', value: -1 }]}
            component="div"
            style={{ overflow: 'hidden' }}
            count={rows.length}
            rowsPerPage={rows.length}
            labelRowsPerPage="Linhas por pagina"
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'Linhas por pagina',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
          />
        )}
      </TableFooter>
    </TableContainer>
  );
}

export default ConsultaAssociados;
