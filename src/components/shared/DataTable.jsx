import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Stack,
  TextField,
  TableSortLabel,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton } from './Buttons';

export const DataTable = ({
  columns,
  rows,
  onEdit,
  onDelete,
  rowsPerPage = 10,
  isLoading = false,
}) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    columns.some((col) => {
      const cellValue = row[col.id];
      return cellValue &&
        cellValue
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
    })
  );

  // Sort rows
  let sortedRows = [...filteredRows];
  if (sortBy) {
    sortedRows.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Paginate rows
  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const paginatedRows = sortedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnId);
      setSortOrder('asc');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Tabelle durchsuchen..."
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          sx={{ width: '100%', maxWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{ fontWeight: 600 }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={
                        sortBy === column.id ? sortOrder : 'asc'
                      }
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Aktionen
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.render
                        ? column.render(row[column.id], row)
                        : row[column.id]}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        {onEdit && (
                          <IconButton
                            icon={EditIcon}
                            onClick={() => onEdit(row)}
                            title="Bearbeiten"
                          />
                        )}
                        {onDelete && (
                          <IconButton
                            icon={DeleteIcon}
                            color="error"
                            onClick={() => onDelete(row)}
                            title="Löschen"
                          />
                        )}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (onEdit || onDelete ? 1 : 0)
                  }
                  align="center"
                  sx={{ py: 3 }}
                >
                  Keine Daten vorhanden
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
