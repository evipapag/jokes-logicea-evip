import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useUIContext } from '../../contexts/UIContext';

interface Column {
  id: string;
  label: string;
}

interface HeadProps {
  columns: Column[];
}

const StyledTableCell = styled(TableCell)(
  ({ isDark }: { isDark: boolean }) => ({
    [`&.${tableCellClasses.root}`]: {
      borderBottom: 0,
      color: isDark ? 'white' : 'black',
    },
  })
);

const DataTableHead = ({ columns }: HeadProps) => {
  const { isDark } = useUIContext();
  return (
    <TableHead>
      <TableRow>
        {columns.map((c) => (
          <StyledTableCell isDark={isDark} key={c.id} align="center">
            {c.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
