import React from 'react';
import { Button, Box } from '@mui/material';
import {
  Close as CloseIcon,
  Cancel as CancelIcon,
  Print as PrintIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

export const CloseButton = ({ onClick, ...props }) => (
  <Button
    startIcon={<CloseIcon />}
    variant="outlined"
    color="secondary"
    onClick={onClick}
    {...props}
  >
    Schließen
  </Button>
);

export const CancelButton = ({ onClick, ...props }) => (
  <Button
    startIcon={<CancelIcon />}
    variant="outlined"
    color="error"
    onClick={onClick}
    {...props}
  >
    Abbrechen
  </Button>
);

export const PrintButton = ({ onClick, ...props }) => (
  <Button
    startIcon={<PrintIcon />}
    variant="outlined"
    color="primary"
    onClick={onClick}
    {...props}
  >
    Drucken
  </Button>
);

export const SearchButton = ({ onClick, ...props }) => (
  <Button
    startIcon={<SearchIcon />}
    variant="contained"
    color="primary"
    onClick={onClick}
    {...props}
  >
    Suchen
  </Button>
);

export const SaveButton = ({ onClick, loading, ...props }) => (
  <Button
    startIcon={<SaveIcon />}
    variant="contained"
    color="success"
    onClick={onClick}
    disabled={loading}
    {...props}
  >
    {loading ? 'Wird gespeichert...' : 'Speichern'}
  </Button>
);

export const DeleteButton = ({ onClick, ...props }) => (
  <Button
    startIcon={<DeleteIcon />}
    variant="outlined"
    color="error"
    onClick={onClick}
    {...props}
  >
    Löschen
  </Button>
);

// Icon-only Button variants
export const IconButton = ({ icon: Icon, ...props }) => (
  <Button
    variant="outlined"
    size="small"
    sx={{
      minWidth: 'auto',
      width: 40,
      height: 40,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...props}
  >
    <Icon />
  </Button>
);
