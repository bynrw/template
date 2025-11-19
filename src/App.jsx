import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import { FavoritesProvider } from './context/FavoritesContext';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/medirig" element={<Dashboard />} />
              <Route path="/medirig/:id" element={<Dashboard />} />
              <Route path="/erfassung" element={<Dashboard />} />
              <Route path="/erfassung/medirig/manv/:id" element={<Dashboard />} />
              <Route path="/einsatz" element={<Dashboard />} />
              <Route path="/jahresstatistik" element={<Dashboard />} />
              <Route path="/jahresstatistik/:section" element={<Dashboard />} />
              <Route path="/auswertung" element={<Dashboard />} />
              <Route path="/benutzerverwaltung" element={<Dashboard />} />
              <Route path="/benutzerverwaltung/:section" element={<Dashboard />} />
              <Route path="/benutzerverwaltung/:section/:subsection" element={<Dashboard />} />
              <Route path="/administration" element={<Dashboard />} />
              <Route path="/hilfe" element={<Dashboard />} />
              <Route path="/info" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
