/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
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
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import TableFooter from '@mui/material/TableFooter';
import { useMediaQuery } from '@mui/material/';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import cssColorCodes from '../cssColorCodes/cssColorCodes';
import ModalUsuario from './modalUsuario/ModalUsuario';
import './tableContainer.css';

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    count, page, usersPerPage, onPageChange,
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
    onPageChange(event, Math.max(0, Math.ceil(count / usersPerPage) - 1));
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
        disabled={page >= Math.ceil(count / usersPerPage) - 1}
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
        disabled={page >= Math.ceil(count / usersPerPage) - 1}
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
  usersPerPage: PropTypes.number.isRequired,
};

function TableComponent({
  titles, users, order, edit, search, searchFile, setTypeChanged,
}) {
  // const theme = useTheme;
  const [page, setPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  console.log(usersPerPage);

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
        color: 'white',
        padding: '0px',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          color: 'white',
        }
        : {
          fontSize: '100%',
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

  const emptyusers = page > 0 ? Math.max(0, (1 + page) * usersPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeUsersPerPage = (event) => {
    setUsersPerPage(+event.target.value);
    setPage(0);
  };

  function filterUser(value) {
    return value.type === 'administrador';
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ marginLeft: 'auto', marginRight: 'auto' }}
    >
      <Table
        {...tableProps}
        aria-label="caption table"
      >
        <TableHead style={{ background: `${cssColorCodes.secondary}` }}>
          <TableRow>
            {titles?.map((title) => (
              <TableCell {...titleFontProps}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            ?.filter(filterUser)
            ?.slice(page * usersPerPage, page * usersPerPage + usersPerPage)
            ?.map((user) => (
              <TableRow>
                {order ? (
                  <TableCell {...cellFontProps} align="center">
                    {users.findIndex((obj) => obj._id === user._id) + 1}
                  </TableCell>
                ) : search ? (
                  <TableCell {...cellFontProps} align="center">
                    <IconButton aria-label="Search">
                      <SearchIcon />
                      {/* TODO Substituir o modal de pesquisa no lugar do searchIcon, passando row._id e tipo da pesquisa.
                      Há um modal implementado de forma parecida na pagina de produtos do lojista no pet system */}
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
                  <TableCell> </TableCell>
                )}
                <TableCell {...cellFontProps}>
                  {user.status}
                </TableCell>
                <TableCell {...cellFontProps}>
                  {user.name}
                </TableCell>
                <TableCell {...cellFontProps}>
                  {user.judicial_section}
                </TableCell>
                <TableCell {...cellFontProps}>
                  A
                </TableCell>
                <TableCell {...cellFontProps}>
                  {user.user}
                </TableCell>
                <TableCell {...cellFontProps}>
                  {user.email}
                </TableCell>
                <TableCell {...cellFontProps}>
                  {user.cpf}
                </TableCell>
              </TableRow>
            ))}
          {emptyusers > 0 && (
            <TableRow style={{ height: 53 * emptyusers }}>
              <TableCell
                {...cellFontProps}
                style={{ background: `${cssColorCodes.fontColor1}` }}
                colSpan={6}
              />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableFooter {...footerProps}>
        <TablePagination
          usersPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
          component="div"
          count={users.length}
          usersPerPage={usersPerPage}
          labelUsersPerPage="Linhas por pagina"
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'Linhas por pagina',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onUsersPerPageChange={handleChangeUsersPerPage}
          ActionsComponent={TablePaginationActions}
        />
        <ModalUsuario setTypeChanged={setTypeChanged} users={users} />
      </TableFooter>
    </TableContainer>
  );
}

export default TableComponent;
