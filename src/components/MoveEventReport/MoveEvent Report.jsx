import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink } from "react-csv";
import './MoveEventReport.css';


function MoveEventReport(props) {

  const dispatch = useDispatch()
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('MOVE EVENT REPORT');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState(store.items)
  useEffect(() => {
    dispatch({
      type: 'FETCH_ITEMS',
      payload: {
        event: store.active_event.id,
        user: store.user.id
      }
    })
  }, [])

  const columns = [
    { id: 'name', label: 'ITEM NAME', minWidth: 10 },
    { id: 'qr_id', label: 'QR CODE', minWidth: 10 },
    { id: 'value', label: 'VALUE', minWidth: 10},
    { id: 'destination', label: 'DESTINATION', minWidth: 10 },
  ];

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const headers = [
      { label: "Record ID", key: "id" },
      { label: "Item Name", key: "name" },
      { label: "QR Code", key: "qr_id" },
      { label: "Destination", key: "destination" },
      { label: "Value", key: "value" },
    ];
     
     
    const csvReport = {
      data: store.items,
      headers: headers,
      filename: store.active_event.name + ' Report.csv'
    };

  return (
    <div className='component'>
      <img className='itemSearchResultsLogo' src="/images/brand.png" alt="" />
      <h2 className='itemSearchResultsHeader'>{heading}</h2>
      <Paper sx={{ width: '99%', overflow: 'hidden', marginLeft:'auto',  marginRight:'auto'  }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={
                      { 
                        minWidth: column.minWidth,
                        backgroundColor:'#6573c3', 
                        color: 'white', 
                      }
                    }
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {store.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, 250]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <br />
      <CSVLink {...csvReport} className='downloadCSVLink'>
        <Button color="secondary" variant="contained" className='downloadReportButton' endIcon={<DownloadIcon />}>DOWNLOAD REPORT</Button>
      </CSVLink>
    </div>
  );
}

export default MoveEventReport;
