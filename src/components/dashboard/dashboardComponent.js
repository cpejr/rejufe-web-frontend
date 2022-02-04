import React, { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

function TableComponent({ titles, rows, order, edit, search }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              <TableCell
                style={{ backgroundColor: "#2574A9", color: "white" }}
                align="center"
              >
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
                  <TableCell
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px 0px 1px 1px",
                    }}
                    align="center"
                  >
                    {rows.findIndex((obj) => obj._id === row._id) + 1}
                  </TableCell>
                ) : search ? (
                  <TableCell
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px 0px 1px 1px",
                    }}
                    align="center"
                  >
                    <IconButton color="primary" aria-label="Search">
                      <SearchIcon />
                    </IconButton>
                  </TableCell>
                ) : edit ? (
                  <TableCell
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px 0px 1px 1px",
                    }}
                    align="center"
                  >
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell> </TableCell>
                )}
                {Object.values(row)?.map((data) => (
                  <TableCell
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px 0px 1px 1px",
                    }}
                    align="center"
                  >
                    {data}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      >
      </TablePagination>
      <div><Button style={{ backgroundColor: '#2574A9', color: "white"}}>Pesquisa Avançada</Button></div>
    </TableContainer>
  );
}

export default TableComponent;
