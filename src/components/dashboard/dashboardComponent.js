import React, { useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import TableFooter from "@mui/material/TableFooter";
import { useMediaQuery } from "@mui/material/";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  caption: {
    color: "green",
    padding: 8,
    border: "1px dashed grey",
    fontSize: "0.875rem"
  },
  toolbar: {
    "& > p:nth-of-type(2)": {
      fontSize: "1.25rem",
      color: "red",
      fontWeight: 600
    }
  }
});

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
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
        {theme.direction === "rtl" ? (
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
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

function TableComponent({ titles, rows, order, edit, search, searchFile }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const matches = useMediaQuery("(max-width:930px)");
  const matchesFont90 = useMediaQuery("(max-width:930px)");
  console.log(
    "🚀 ~ file: dashboardComponent.js ~ line 101 ~ TableComponent ~ matchesFont90",
    matchesFont90
  );
  const matchesFont85 = useMediaQuery("(max-width:680px)");
  console.log(
    "🚀 ~ file: dashboardComponent.js ~ line 103 ~ TableComponent ~ matchesFont60",
    matchesFont85
  );

  const footerProps = {
    style: matches
      ? {
          display: "flex",
          margin: "2%",
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "center",
        }
      : {
          display: "flex",
          justifyContent: "center",
          margin: "1%",
        },
  };

  const cellFontProps = {
    style: matchesFont85
      ? {
          fontSize: "85%",
          borderStyle: "solid",
          borderWidth: "1px 0px 1px 1px",
          padding: '0px',
        }
      : matchesFont90
      ? {
          fontSize: "90%",
          borderStyle: "solid",
          borderWidth: "1px 0px 1px 1px",
        }
      : {
          fontSize: "100%",
          borderStyle: "solid",
          borderWidth: "1px 0px 1px 1px",
        },
  };

  const titleFontProps = {
    style: matchesFont85
      ? {
          fontSize: "85%",
          backgroundColor: "#2574A9",
          color: "white",
          padding: '0px',
        }
      : matchesFont90
      ? {
          fontSize: "90%",
          backgroundColor: "#2574A9",
          color: "white",
        }
      : {
          fontSize: "100%",
          backgroundColor: "#2574A9",
          color: "white",
        },
  };

  const buttonFontProps = {
    style: matchesFont85
      ? {
          fontSize: "85%",
          backgroundColor: "#2574A9",
          color: "white",
          padding: '0px',
        }
      : matchesFont90
      ? {
          fontSize: "90%",
          backgroundColor: "#2574A9",
          color: "white",
        }
      : {
          fontSize: "100%",
          backgroundColor: "#2574A9",
          color: "white",
        },
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ marginLeft: "auto", marginRight: "auto", width: "70%" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            {titles?.map((title) => (
              <TableCell {...titleFontProps} align="center">
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row) => (
              <TableRow>
                {order ? (
                  <TableCell {...cellFontProps} align="center">
                    {rows.findIndex((obj) => obj._id === row._id) + 1}
                  </TableCell>
                ) : search ? (
                  <TableCell {...cellFontProps} align="center">
                    <IconButton color="primary" aria-label="Search">
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
                {Object.values(row)?.map((data) => (
                  <TableCell {...cellFontProps} align="center">
                    {data}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell
                {...cellFontProps}
                style={{ background: "green" }}
                colSpan={6}
              />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableFooter {...footerProps}>
        <TablePagination
          {...cellFontProps}
          rowsPerPageOptions={[10, 25, 100, { label: "All", value: -1 }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Linhas por pagina"
          page={page}
          classes={{
            toolbar: classes.toolbar,
            caption: classes.caption
          }}
          SelectProps={{
            inputProps: {
              "aria-label": "Linhas por pagina",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        ></TablePagination>
        <Button
          {...buttonFontProps}
        >
          Pesquisa Avançada
          {/* TODO Implementar o botão de pesquisa avançada*/}
        </Button>
      </TableFooter>
    </TableContainer>
  );
}

export default TableComponent;
