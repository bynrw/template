import React from 'react'
import { Container, Typography, Box, AppBar, Toolbar, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { People as PeopleIcon } from '@mui/icons-material'
import Benutzerliste from './components/Benutzerliste'

// Create custom theme with royal blue
const theme = createTheme({
    palette: {
        primary: {
            main: '#4169E1', // Royal Blue
            light: '#6A8FE1',
            dark: '#2E4CB8',
        },
        secondary: {
            main: '#00BCD4',
            light: '#4DD0E1',
        },
        background: {
            default: '#F5F7FA',
            paper: '#FFFFFF',
        },
        success: {
            main: '#4CAF50',
        },
        error: {
            main: '#F44336',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
            letterSpacing: '-0.5px',
        },
        h3: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(65, 105, 225, 0.15)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '8px 16px',
                },
                contained: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F5F7FA',
                    '& .MuiTableCell-head': {
                        backgroundColor: '#4169E1',
                        color: '#FFFFFF',
                        fontWeight: 600,
                    },
                },
            },
        },
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #4169E1 0%, #2E4CB8 100%)' }}>
                    <Toolbar>
                        <PeopleIcon sx={{ mr: 2, fontSize: 28 }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.5px' }}>
                            Benutzerverwaltung
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
                    <Benutzerliste />
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default App