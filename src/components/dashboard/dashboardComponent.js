/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import FileSaver from 'file-saver';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchIcon from '@mui/icons-material/Search';
import TableFooter from '@mui/material/TableFooter';
import { useMediaQuery } from '@mui/material/';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import RemoveModal from '../RemoveModal/RemoveModal';
import EditModal from '../EditModal/EditModal';
import RejectModal from '../RejectModal/RejectModal';
import AcceptModal from '../AcceptModal/AcceptModal';
import * as managerService from '../../services/manager/managerService';
import setFileNameArchive from '../SetFileNameArchive/SetFileNameArchive';

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

function TableComponent({
  titleTable, titles, rows, id, sequentialId, order, setUse, archive1Id, archive2Id, associateId, edit, search, searchMinutes, searchFile, validate, dados, newsSequentialId, renderButton, print, printButton, route,
}) {
  const [page, setPage] = useState(0);
  const [fileNames1, setFileNames1] = useState([]);
  const [fileNames2, setFileNames2] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const matches = useMediaQuery('(max-width:930px)');
  const matchesFont90 = useMediaQuery('(max-width:930px)');
  const matchesFont85 = useMediaQuery('(max-width:680px)');
  const matchesFont400px = useMediaQuery('(max-width:400px)');

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
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
      }
      : {
        display: 'flex',
        justifyContent: 'center',
        margin: '1%',
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
        padding: '0px',
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

  const tableFontProps = {
    style: matchesFont85
      ? {
        textAlign: 'center',
        fontSize: '1em',
        fontWeight: '900',
        backgroundColor: '#E5E4E2',
        color: '#2574A9',
        padding: '6px',
      }
      : matchesFont90
        ? {
          fontSize: '1em',
          fontWeight: '900',
          textAlign: 'center',
          backgroundColor: '#E5E4E2',
          color: '#2574A9',
        }
        : {
          fontSize: '1.2em',
          fontWeight: '900',
          textAlign: 'center',
          backgroundColor: '#E5E4E2',
          color: '#2574A9',
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
          fontSize: '100%',
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
  const tableTitleProps = {
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
    const win = window.open(`/ficha-atas?atasId=${redirectId}`, '_blank');
    win.focus();
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleWindowOpen = () => {
    window.open(route);
  };

  function getDownloads(archiveId) {
    try {
      managerService.download(archiveId).then((response) => {
        FileSaver.saveAs(response, id);
      });
    } catch (error) {
      toast.error('Não foi possível baixar o arquivo', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    if (archive1Id) {
      setFileNameArchive(fileNames1, archive1Id, setFileNames1);
    }
    if (archive2Id) {
      setFileNameArchive(fileNames2, archive2Id, setFileNames2);
    }
  }, [archive1Id, archive2Id]);

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
          <TableRow
            {...tableTitleProps}
          >
            {titleTable
              && (
                <TableCell
                  align="center"
                  {...tableFontProps}
                  colSpan={5}
                >
                  {titleTable}
                </TableCell>
              )}
          </TableRow>

          <TableRow>
            {titles?.map((title) => (
              <TableCell {...titleFontProps}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row, index) => (
              <TableRow>
                {
                  order ? (
                    <TableCell {...cellFontProps} align="center">
                      {index + 1 + (page * 10)}
                    </TableCell>
                  ) : sequentialId ? (
                    <TableCell
                      {...cellFontProps}
                      align="center"
                    >
                      {sequentialId[index]}
                    </TableCell>
                  ) : search ? (
                    <TableCell {...cellFontProps} align="center">
                      <IconButton color="primary" aria-label="Search">
                        <SearchIcon />
                        {/* TODO Substituir o modal de pesquisa no lugar do searchIcon, passando row._id e tipo da pesquisa.
                      Há um modal implementado de forma parecida na pagina de produtos do lojista no pet system */}
                      </IconButton>
                    </TableCell>
                  ) : searchMinutes ? (
                    <TableCell {...cellFontProps} align="center">
                      <IconButton color="primary" aria-label="Search" onClick={(e) => redirect(e, id[index + (page * 10)])}>
                        <SearchIcon />
                      </IconButton>
                    </TableCell>
                  ) : edit ? (
                    <TableCell {...cellFontProps} align="center">
                      <IconButton aria-label="delete">
                        <RemoveModal setUse={setUse} id={associateId[index + (page * 10)]} />
                      </IconButton>
                      <IconButton color="primary" aria-label="Edit">
                        <EditModal setUse={setUse} id={associateId[index + (page * 10)]} associate={row} />
                      </IconButton>
                    </TableCell>
                  ) : validate ? (
                    <TableCell {...cellFontProps} align="center">
                      <IconButton aria-label="reject">
                        <RejectModal setUse={setUse} id={associateId[index + (page * 10)]} />
                      </IconButton>
                      <IconButton color="primary" aria-label="accept">
                        <AcceptModal setUse={setUse} dados={dados[index + (page * 10)]} id={associateId[index + (page * 10)]} associate={row} />
                      </IconButton>
                    </TableCell>
                  ) : searchFile ? (
                    <TableCell {...cellFontProps} align="center">
                      <FindInPageIcon aria-label="findFile" />
                    </TableCell>
                  ) : (
                    null
                  )
                }
                {sequentialId
                  && (
                    <TableCell {...cellFontProps}>
                      <Link
                        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
                        to={{
                          pathname: '/editar-associados',
                          state: {
                            id: id[index + (page * 10)],
                          },
                        }}
                      >
                        {sequentialId[index + (page * 10)]}
                      </Link>
                    </TableCell>
                  )}
                {newsSequentialId
                  && (
                    <TableCell {...cellFontProps}>
                      <Link
                        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
                        to={{
                          pathname: '/editar-noticias',
                          state: {
                            id: id[index + (page * 10)],
                          },
                        }}
                      >
                        {newsSequentialId[index + (page * 10)]}
                      </Link>
                    </TableCell>
                  )}
                {Object.values(row)?.map((data) => (
                  <TableCell {...cellFontProps}>
                    {data}
                  </TableCell>
                ))}
                {archive1Id
                  && (
                    <TableCell>
                      <Link
                        onClick={() => getDownloads(archive1Id[index + (page * 10)])}
                      >
                        {fileNames1[index + (page * 10)]}
                      </Link>
                    </TableCell>
                  )}
                {archive2Id
                  && (
                    <TableCell>
                      <Link
                        onClick={() => getDownloads(archive2Id[index + (page * 10)])}
                      >
                        {fileNames2[index + (page * 10)]}
                      </Link>
                    </TableCell>
                  )}
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
      <TableFooter {...footerProps}>
        {print ? (
          <TablePagination
            rowsPerPageOptions={[{ label: 'All', value: -1 }]}
            component="div"
            count={rows?.length}
            rowsPerPage={rows?.length}
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
        ) : (
          <>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100, { label: 'All', value: rows.length }]}
              component="div"
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
              {renderButton && (
                <Button
                  {...buttonFontProps}
                >
                  Pesquisa Avançada
                  {/* TODO Implementar o botão de pesquisa avançada */}
                </Button>
              )}
              {printButton && (
                <Button
                  {...buttonFontProps}
                  onClick={handleWindowOpen}
                >
                  Imprimir
                </Button>
              )}
            </div>
          </>
        )}
      </TableFooter>
    </TableContainer>
  );
}

export default TableComponent;
