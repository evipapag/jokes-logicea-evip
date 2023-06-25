import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer, {
  tableContainerClasses,
} from '@mui/material/TableContainer';
import TablePagination, {
  tablePaginationClasses,
} from '@mui/material/TablePagination';

export const StyledTableContainer = styled(TableContainer)(() => ({
  [`&.${tableContainerClasses.root}}`]: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));

export const StyledTableCell = styled(TableCell)(
  ({ isDark }: { isDark: boolean }) => ({
    [`&.${tableCellClasses.root}`]: {
      borderBottom: 0,
      borderRight: `1px solid ${isDark ? 'white' : 'black'}`,
      color: isDark ? 'white' : 'black',
    },
    '&:last-child': {
      border: 0,
    },
  })
);

export const StyledTablePagination = styled(TablePagination)(
  ({ isDark }: { isDark: boolean }) => ({
    [`&.${tablePaginationClasses.root}`]: {
      borderBottom: 0,
      color: isDark ? 'white' : 'black',
    },
    '& .MuiButtonBase-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.54)',
    },
    '& .MuiButtonBase-root.Mui-disabled': {
      color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.26)',
    },
  })
);
