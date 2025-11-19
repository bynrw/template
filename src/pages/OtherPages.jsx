import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Einstellungen
      </Typography>
      <Typography variant="body1">
        Einstellungsseite wird hier angezeigt.
      </Typography>
    </Container>
  );
};

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Seite nicht gefunden
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
        >
          Zurück zum Dashboard
        </Button>
      </Box>
    </Container>
  );
};
