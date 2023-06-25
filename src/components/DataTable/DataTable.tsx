import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import { Column, Joke } from '../../models/joke.types';
import { useUIContext } from '../../contexts/UIContext';
import DataTableLoader from './DataTableLoader';
import DataTableHead from './DataTableHead';
import TablePaginationActions from './TablePaginationActions';
import {
  StyledTableContainer,
  StyledTableCell,
  StyledTablePagination,
} from './styles';

interface DataTableProps<T = any> {
  rows: Joke[];
  loading: boolean;
  columns: Column[];
  cpage?: number;
  cRowsPerPage?: number;
  onChange: (page: number, rowsPerPage: number) => void;
}

export default function DataTable({
  rows,
  loading,
  columns,
  cpage,
  cRowsPerPage,
  onChange,
}: DataTableProps) {
  const { isDark } = useUIContext();
  const [page, setPage] = React.useState(cpage || 0);
  const [rowsPerPage, setRowsPerPage] = React.useState(cRowsPerPage || 5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    onChange(page, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onChange(0, parseInt(event.target.value, 10));
  };

  const finalData = rows;
  console.log('finalData', finalData);

  return (
    <StyledTableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="data table">
        <DataTableHead columns={columns} />
        <TableBody>
          {loading ? (
            <DataTableLoader />
          ) : (
            finalData.map((row: Joke) => (
              <TableRow key={row.id}>
                {columns.map((c: Column) => (
                  <StyledTableCell isDark={isDark} key={`cell_${c.id}`}>
                    {c.cellFormatter
                      ? c.cellFormatter(row[c.id], row.id)
                      : row[c.id]}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <StyledTablePagination
              isDark={isDark}
              count={-1}
              rowsPerPageOptions={[5, 10]}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
}
