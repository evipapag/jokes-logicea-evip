import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import RefreshIcon from '@mui/icons-material/Refresh';
import { keyframes } from '@emotion/react';

const animation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const DataTableLoader = () => (
  <TableRow style={{ height: 100 }} className="DataTable-loader">
    <TableCell colSpan={100} align="center">
      <RefreshIcon
        css={{
          borderRadius: '50%',
          animation: `${animation} 1s ease infinite`,
          transformOrigin: 'center',
          fontSize: '50px',
        }}
      />
    </TableCell>
  </TableRow>
);

export default DataTableLoader;
