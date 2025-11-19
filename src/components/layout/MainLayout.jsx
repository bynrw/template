import React, { useState, useEffect, useContext, createContext } from 'react';
import { Outlet, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Typography, 
  Divider, 
  Avatar, 
  Menu, 
  MenuItem, 
  Badge, 
  Chip, 
  useTheme, 
  Container,
  Tooltip,
  Collapse,
  Link
} from '@mui/material';
import { FavoritesContext } from '../../context/FavoritesContext';

// Icons - Gruppiert nach Funktion
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Navigation Icons
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SecurityIcon from '@mui/icons-material/Security';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// User/Profile Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Star/Favorite Icons
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Theme Icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Expand/Collapse Icons
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Weitere Icons
import PauseIcon from '@mui/icons-material/Pause';
import SpeedIcon from '@mui/icons-material/Speed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Logo Komponente
const Logo = ({ compact = false }) => {
  const theme = useTheme();
  
  if (compact) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 0.5 }}>
        <Box sx={{ 
          backgroundColor: theme.palette.primary.main, 
          borderRadius: '4px',
          width: 28,
          height: 28,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          <SecurityIcon sx={{ color: '#fff', fontSize: 16 }} />
        </Box>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 0.25 }}>
      <Box sx={{ 
        backgroundColor: theme.palette.primary.main, 
        borderRadius: '4px',
        width: 28,
        height: 28,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mr: 0.5,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}>
        <SecurityIcon sx={{ color: '#fff', fontSize: 16 }} />
      </Box>
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1, color: theme.palette.primary.main, fontSize: '0.875rem' }}>
          IG NRW
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, fontSize: '0.65rem' }}>
          Gefahrenabwehr
        </Typography>
      </Box>
    </Box>
  );
};

// Menüelemente mit Struktur wie im Original
const menuItems = [
  {
    title: 'MediRIG',
    icon: <MedicalServicesIcon />,
    path: '/medirig',
    color: 'medical',
    description: '',
    subMenu: [
      {
        title: 'Teilnehmer-Bestnachweis',
        path: '/medirig/teilnehmer-bestnachweis'
      }
    ]
  },
  {
    title: 'Erfassung',
    icon: <DescriptionIcon />,
    path: '/erfassung',
    color: 'success',
    description: ''
  },
  {
    title: 'Einsatz',
    icon: <NotificationImportantIcon />,
    path: '/einsatz',
    color: 'error',
    description: ''
  },
  {
    title: 'Jahresstatistik',
    icon: <BarChartIcon />,
    path: '/jahresstatistik',
    color: 'secondary',
    description: '',
    subMenu: [
      { title: 'Info', path: '/jahresstatistik/info' },
      { title: 'Deckblatt', path: '/jahresstatistik/deckblatt' },
      { title: 'Erfassung', path: '/jahresstatistik/erfassung' },
      { title: 'Anzeigen', path: '/jahresstatistik/anzeigen' }
    ]
  },
  {
    title: 'Auswertung',
    icon: <ShowChartIcon />,
    path: '/auswertung',
    color: 'info',
    description: ''
  },
  {
    title: 'Benutzerverwaltung',
    icon: <PeopleIcon />,
    path: '/benutzerverwaltung',
    color: 'primary',
    description: 'Benutzer und Berechtigungen',
    subMenu: [
      { title: 'Info', path: '/benutzerverwaltung/info' },
      { 
        title: 'Persönliche Angaben', 
        path: '/benutzerverwaltung/persoenliche-angaben',
        subMenu: [
          { title: 'Daten bearbeiten', path: '/benutzerverwaltung/persoenliche-angaben/daten-bearbeiten' },
          { title: 'Passwort ändern', path: '/benutzerverwaltung/persoenliche-angaben/passwort-aendern' }
        ]
      },
      { 
        title: 'Benutzerbestand', 
        path: '/benutzerverwaltung/benutzerbestand',
        subMenu: [
          { title: 'Liste', path: '/benutzerverwaltung/benutzerbestand/liste' },
          { title: 'Neuer Benutzer', path: '/benutzerverwaltung/benutzerbestand/neuer-benutzer' }
        ]
      }
    ]
  },
  {
    title: 'Administration',
    icon: <AdminPanelSettingsIcon />,
    path: '/administration',
    color: 'info',
    description: 'Systemadministration'
  },
  {
    title: 'Hilfe',
    icon: <HelpOutlineIcon />,
    path: '/hilfe',
    color: 'secondary',
    description: 'Hilfe und Support'
  },
  {
    title: 'Info',
    icon: <InfoIcon />,
    path: '/info',
    color: 'warning',
    description: 'Systeminformationen'
  }
];

// MANV Fälle für Liveticker
const manvFaelle = [
  {
    id: 1,
    titel: "MANV Düsseldorf - Mehrere Verletzte bei Einsturz",
    patienten: 23,
    kategorie: "MANV 25+",
    farbe: "error",
    status: "Aktiv",
    icon: <ErrorOutlineIcon />,
    ort: "Düsseldorf-Eller",
    zeit: "10:15"
  },
  {
    id: 2,
    titel: "MANV Krefeld - Massenkarambolage A57",
    patienten: 15,
    kategorie: "MANV 15+",
    farbe: "warning",
    status: "Aktiv",
    icon: <WarningAmberIcon />,
    ort: "Krefeld-Oppum",
    zeit: "09:32"
  },
  {
    id: 3,
    titel: "MANV Krefeld-Uerdingen - Chemieunfall in Fabrik",
    patienten: 8,
    kategorie: "MANV 5+",
    farbe: "info",
    status: "Bearbeitung",
    icon: <LocalHospitalIcon />,
    ort: "Chempark",
    zeit: "08:45"
  },
  {
    id: 4,
    titel: "MANV Aachen - Brand im Krankenhaus",
    patienten: 12,
    kategorie: "MANV 10+",
    farbe: "medical",
    status: "Bearbeitung",
    icon: <LocalHospitalIcon />,
    ort: "Universitätsklinikum",
    zeit: "07:23"
  }
];

// Benutzerrollen Konfiguration
const userRoles = {
  "Erfassung": { color: "primary", icon: <DescriptionIcon fontSize="small" /> },
  "Auswertung": { color: "info", icon: <ShowChartIcon fontSize="small" /> },
  "Administrator": { color: "warning", icon: <AdminPanelSettingsIcon fontSize="small" /> },
  "SuperAdmin": { color: "error", icon: <SecurityIcon fontSize="small" /> },
  "Sirene": { color: "error", icon: <NotificationImportantIcon fontSize="small" /> },
  "Jahresstatistik": { color: "secondary", icon: <BarChartIcon fontSize="small" /> },
};

// Context für expandierte Menüs
const ExpandedMenuContext = createContext({
  expandedMenus: {},
  setExpandedMenus: () => {}
});

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  
  // State Management
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [showLiveticker, setShowLiveticker] = useState(false);
  const [currentManvIndex, setCurrentManvIndex] = useState(0);
  const [tickerPosition, setTickerPosition] = useState(100);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [tickerSpeed, setTickerSpeed] = useState(1);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser] = useState({
    name: "yanik02",
    role: "Administrator",
    location: "BezReg Düsseldorf",
  });

  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Ticker Animation
  useEffect(() => {
    let animationFrame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (!tickerPaused) {
        const newPosition = 100 - (progress * 0.015 * tickerSpeed % 160);
        setTickerPosition(newPosition);
      }
      
      animationFrame = requestAnimationFrame(animate);
    };

    if (showLiveticker) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showLiveticker, tickerPaused, tickerSpeed]);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);
  const handleNotificationClick = (event) => setNotificationAnchorEl(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchorEl(null);

  const handleMediRIGClick = (path) => {
    navigate(path);
    setShowLiveticker(!showLiveticker);
    if (window.innerWidth < 900) {
      setDrawerOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const notifications = [
    {
      id: 1,
      title: 'Großbrand Industriegebiet',
      type: 'emergency',
      time: '10:15',
      icon: <ErrorOutlineIcon />,
      color: theme.palette.error.main
    },
    {
      id: 2,
      title: 'Verkehrsunfall B1',
      type: 'alert',
      time: '09:32',
      icon: <LocalHospitalIcon />,
      color: theme.palette.medical.main
    },
    {
      id: 3,
      title: 'Hochwasserwarnung',
      type: 'warning',
      time: '08:45',
      icon: <WarningAmberIcon />,
      color: theme.palette.warning.main
    }
  ];

  const handleEmergencyAction = (id) => {
    handleNotificationClose();
    navigate('/einsatz');
  };

  const handleManvClick = (id) => {
    setCurrentManvIndex(manvFaelle.findIndex(fall => fall.id === id));
    navigate(`/erfassung/medirig/manv/${id}`);
  };

  // Mini Drawer (nur Icons)
  const miniDrawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        p: 0.75,
        backgroundColor: 'background.paper' 
      }}>
        <IconButton 
          size="small" 
          sx={{ color: theme.palette.primary.main, mb: 1 }}
        >
          <Logo compact />
        </IconButton>
      </Box>
      
      <Divider sx={{ width: '100%' }} />
      
      <Box sx={{ 
        py: 1,
        display: 'flex', 
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 90, 158, 0.04)',
      }}>
        <Avatar 
          sx={{ 
            bgcolor: theme.palette.primary.main, 
            width: 28,
            height: 28,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />
        </Avatar>
      </Box>
      
      <Divider sx={{ width: '100%' }} />
      
      <List sx={{ flexGrow: 1, py: 0, width: '100%' }}>
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={item.title} placement="right">
              <ListItemButton 
                onClick={() => {
                  if (item.title === 'MediRIG') {
                    handleMediRIGClick(item.path);
                  } else {
                    navigate(item.path);
                  }
                }}
                selected={isActive(item.path)}
                sx={{ 
                  borderLeft: `3px solid ${isActive(item.path) ? 
                    theme.palette[item.color].main : 
                    theme.palette[item.color].light}`,
                  py: 0.75,
                  minHeight: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&.Mui-selected': {
                    backgroundColor: `${theme.palette[item.color].light}20`
                  },
                  '&:hover': {
                    backgroundColor: `${theme.palette[item.color].light}10`
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive(item.path) ? theme.palette[item.color].main : 'text.secondary',
                  minWidth: 'auto',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Vollständiger Drawer
  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 0.75,
        backgroundColor: 'background.paper' 
      }}>
        <Logo />
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <Box sx={{ 
        py: 0.75,
        px: 0.75,
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 90, 158, 0.04)',
        paddingTop: '15px',
      }}>
        <Avatar 
          sx={{ 
            bgcolor: theme.palette.primary.main, 
            width: 28,
            height: 28,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />
        </Avatar>
        <Box sx={{ ml: 1 }}>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.2 }}>
            {currentUser.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', lineHeight: 1 }}>
            {currentUser.location}
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      <List sx={{ flexGrow: 1, py: 0 }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => {
                  if (item.title === 'MediRIG') {
                    handleMediRIGClick(item.path);
                  } else {
                    navigate(item.path);
                    if (window.innerWidth < 900) {
                      setDrawerOpen(false);
                    }
                  }
                }}
                selected={isActive(item.path)}
                sx={{ 
                  borderLeft: `3px solid ${isActive(item.path) ? 
                    theme.palette[item.color].main : 
                    theme.palette[item.color].light}`,
                  py: 0.5,
                  minHeight: 'auto',
                  '&.Mui-selected': {
                    backgroundColor: `${theme.palette[item.color].light}20`
                  },
                  '&:hover': {
                    backgroundColor: `${theme.palette[item.color].light}10`
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive(item.path) ? theme.palette[item.color].main : 'text.secondary',
                  minWidth: 28
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: isActive(item.path) ? 'bold' : 'regular',
                        color: isActive(item.path) ? 'text.primary' : 'text.secondary',
                        fontSize: '0.8rem',
                        lineHeight: 1.2
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    isActive(item.path) && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        {item.description}
                      </Typography>
                    )
                  }
                />
                {item.subMenu && (
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedMenus(prev => ({
                        ...prev,
                        [item.title]: !prev[item.title]
                      }));
                    }}
                    sx={{ ml: 1, color: 'text.secondary' }}
                  >
                    {expandedMenus[item.title] ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </IconButton>
                )}
                {!item.subMenu && !favorites.find(fav => fav.title === item.title && fav.path === item.path) && (
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item);
                    }}
                    sx={{ 
                      ml: 1, 
                      color: 'text.disabled',
                      '&:hover': { color: 'warning.main' }
                    }}
                  >
                    <StarBorderIcon fontSize="small" />
                  </IconButton>
                )}
                {!item.subMenu && favorites.find(fav => fav.title === item.title && fav.path === item.path) && (
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item);
                    }}
                    sx={{ ml: 1, color: 'warning.main' }}
                  >
                    <StarIcon fontSize="small" />
                  </IconButton>
                )}
              </ListItemButton>
            </ListItem>
            
            {item.subMenu && expandedMenus[item.title] && (
              <Collapse in={expandedMenus[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem) => (
                    <ListItem key={subItem.title} disablePadding>
                      <ListItemButton 
                        onClick={() => {
                          navigate(subItem.path);
                          if (window.innerWidth < 900) {
                            setDrawerOpen(false);
                          }
                        }}
                        selected={isActive(subItem.path)}
                        sx={{ 
                          pl: 2,
                          py: 0.25,
                          ml: 2,
                          minHeight: 'auto',
                          borderLeft: `2px solid ${isActive(subItem.path) ? 
                            theme.palette[item.color].main : 
                            'transparent'}`,
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            borderLeft: `2px solid ${theme.palette[item.color].main}`
                          }
                        }}
                      >
                        <ListItemIcon sx={{ 
                          color: isActive(subItem.path) ? theme.palette[item.color].main : 'text.secondary',
                          minWidth: 24
                        }}>
                          {subItem.icon || <NavigateNextIcon fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: isActive(subItem.path) ? 'bold' : 'regular',
                                color: isActive(subItem.path) ? 'text.primary' : 'text.secondary',
                                fontSize: '0.75rem',
                                lineHeight: 1.1
                              }}
                            >
                              {subItem.title}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      
      <Divider />
      
      <Box sx={{ p: 0.75 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
          Schnellzugriff
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <Chip
                key={item.title + (item.path || '')}
                label={item.title}
                onClick={() => navigate(item.path)}
                onDelete={() => toggleFavorite(item)}
                size="small"
                color={item.color || 'primary'}
                sx={{ 
                  borderRadius: 1,
                  border: `1px solid ${theme.palette[item.color || 'primary'].main}`,
                  '&:hover': {
                    boxShadow: `0 0 0 1px ${theme.palette[item.color || 'primary'].main}`,
                  }
                }}
                deleteIcon={<ClearIcon fontSize="small" />}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.7rem' }}>
              Fügen Sie Favoriten mit dem Stern-Symbol hinzu
            </Typography>
          )}
        </Box>
      </Box>
      
      <Box sx={{ 
        p: 0.75,
        mt: 'auto', 
        backgroundColor: 'rgba(0, 90, 158, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
          IG NRW Gefahrenabwehr v1.2.3
        </Typography>
        <Box>
          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton size="small" color="primary" onClick={toggleDarkMode} sx={{ mr: 0.5, p: 0.25 }}>
              {darkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Abmelden">
            <IconButton size="small" color="primary" onClick={() => navigate('/')} sx={{ p: 0.25 }}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  return (
    <ExpandedMenuContext.Provider value={{ expandedMenus, setExpandedMenus }}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* AppBar */}
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: 'text.primary',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            height: { xs: '48px', md: '52px' },
            '&:hover': {
              boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
            }
          }}
          elevation={0}
        >
          <Toolbar sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            minHeight: { xs: '48px', md: '52px' },
            px: { xs: 1.5, sm: 2.5 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 1.5,
                  display: { md: 'none' },
                  color: 'primary.main',
                  transition: 'all 0.3s',
                  backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <IconButton
                color="inherit"
                onClick={handleSidebarToggle}
                sx={{ 
                  mr: 1.5,
                  display: { xs: 'none', md: 'flex' },
                  color: 'primary.main',
                  transition: 'all 0.2s',
                  backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: 'primary.main'
                }}
              >
                IG NRW
              </Typography>
              
              <Box 
                sx={{ 
                  ml: 1,
                  borderRadius: '8px',
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  px: 1,
                  py: 0.25,
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  boxShadow: '0 1px 4px rgba(0, 90, 158, 0.2)',
                }}
              >
                GEFAHRENABWEHR
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Tooltip title="Suchen">
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    }
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                <IconButton 
                  color="inherit" 
                  onClick={toggleDarkMode} 
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    }
                  }}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Benachrichtigungen">
                <IconButton 
                  color="inherit" 
                  onClick={handleNotificationClick}
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    }
                  }}
                >
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationImportantIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Benutzerprofil">
                <Box
                  onClick={handleProfileClick}
                  sx={{
                    ml: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    py: 0.25,
                    px: 0.5,
                    borderRadius: '20px',
                    backgroundColor: Boolean(anchorEl) ? 'rgba(25, 118, 210, 0.15)' : 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    },
                    transition: 'all 0.2s ease',
                    border: '1px solid',
                    borderColor: Boolean(anchorEl) ? 'rgba(25, 118, 210, 0.3)' : 'transparent'
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 28,
                      height: 28,
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      mr: { xs: 0, sm: 0.75 }
                    }}
                  >
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="body2" fontWeight="medium" lineHeight={1.1} sx={{ fontSize: '0.8rem' }}>
                      {currentUser.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 'medium',
                        fontSize: '0.7rem'
                      }}
                    >
                      {currentUser.role}
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            </Box>
          </Toolbar>
          
          {/* MANV Liveticker */}
          <Collapse in={showLiveticker}>
            <Box 
              sx={{ 
                backgroundColor: 'rgba(25, 25, 25, 0.95)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                height: '40px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                zIndex: 5
              }}
            >
              <Box sx={{ 
                position: 'absolute', 
                right: 16, 
                top: '50%', 
                transform: 'translateY(-50%)',
                height: '28px',
                display: 'flex', 
                alignItems: 'center', 
                zIndex: 10,
                backgroundColor: 'rgba(40, 40, 40, 0.85)',
                padding: '0 6px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.1)',
                gap: 0.5
              }}>
                <Tooltip title={tickerPaused ? "Fortsetzen" : "Pausieren"}>
                  <IconButton 
                    size="small" 
                    onClick={() => setTickerPaused(!tickerPaused)}
                    sx={{ 
                      color: 'white', 
                      width: 20,
                      height: 20,
                      backgroundColor: tickerPaused ? 'rgba(255,70,70,0.7)' : 'rgba(70,255,70,0.3)',
                      '&:hover': {
                        backgroundColor: tickerPaused ? 'rgba(255,70,70,0.9)' : 'rgba(70,255,70,0.5)',
                      }
                    }}
                  >
                    {tickerPaused ? <PlayArrowIcon sx={{ fontSize: 14 }} /> : <PauseIcon sx={{ fontSize: 14 }} />}
                  </IconButton>
                </Tooltip>
                
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  {[0.5, 1, 2].map((speed) => (
                    <Tooltip key={speed} title={`${speed}x`}>
                      <IconButton 
                        size="small" 
                        onClick={() => setTickerSpeed(speed)}
                        sx={{ 
                          color: 'white', 
                          backgroundColor: tickerSpeed === speed ? theme.palette.primary.main : 'transparent',
                          width: 18,
                          height: 18,
                          '&:hover': {
                            backgroundColor: tickerSpeed === speed ? theme.palette.primary.dark : 'rgba(255,255,255,0.2)',
                          }
                        }}
                      >
                        <SpeedIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              <Box sx={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                zIndex: 10,
                background: `linear-gradient(90deg, ${theme.palette.error.dark} 0%, rgba(25,25,25,0.95) 100%)`,
                minWidth: 140
              }}>
                <Box sx={{ pl: 1.5, pr: 2 }}>
                  <Badge badgeContent={manvFaelle.length} color="error" size="small">
                    <NotificationImportantIcon sx={{ mr: 1, fontSize: 18 }} />
                  </Badge>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                    MANV-LIVE
                  </Typography>
                </Box>
              </Box>

              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                  left: `${tickerPosition}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  pl: 16,
                  zIndex: 5,
                  height: '100%'
                }}
              >
                {manvFaelle.map((fall, index) => (
                  <Box 
                    key={fall.id}
                    onClick={() => handleManvClick(fall.id)}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mx: 3,
                      px: 1.5,
                      py: 0.5,
                      background: `linear-gradient(135deg, ${theme.palette[fall.farbe].dark} 0%, ${theme.palette[fall.farbe].main} 100%)`,
                      borderRadius: '6px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      transform: `scale(${index === currentManvIndex ? 1.03 : 0.95})`,
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.1)',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 22,
                        height: 22,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        mr: 1,
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    >
                      {fall.icon}
                    </Avatar>
                    <Box mr={1.5}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.75rem', lineHeight: 1 }}>
                        {fall.titel}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 0.25, alignItems: 'center', gap: 0.75 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.65rem' }}>
                          <PlaceIcon sx={{ fontSize: 10, mr: 0.25 }} /> {fall.ort}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.65rem' }}>
                          <AccessTimeIcon sx={{ fontSize: 10, mr: 0.25 }} /> {fall.zeit}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={fall.kategorie} 
                      size="small" 
                      sx={{ backgroundColor: 'rgba(0,0,0,0.25)', color: 'white', height: 16, fontSize: '0.65rem' }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Collapse>
        </AppBar>
        
        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { maxWidth: 320, width: 320, borderRadius: 2 } }}
        >
          <Box sx={{ px: 2, py: 1.5, backgroundColor: 'background.default' }}>
            <Typography variant="subtitle1" fontWeight="bold">Benachrichtigungen</Typography>
          </Box>
          <Divider />
          {notifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={() => handleEmergencyAction(notification.id)}
              sx={{ py: 1.5, borderLeft: `4px solid ${notification.color}` }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <Avatar sx={{ bgcolor: `${notification.color}20`, color: notification.color, mr: 1.5 }}>
                  {notification.icon}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="bold">{notification.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
          <Divider />
          <Box sx={{ p: 1.5, textAlign: 'center' }}>
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/einsatz')}>
              Alle Meldungen anzeigen
            </Typography>
          </Box>
        </Menu>
        
        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { minWidth: 200, borderRadius: 2 } }}
        >
          <MenuItem onClick={handleProfileClose}>
            <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Profil</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleProfileClose}>
            <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Einstellungen</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileClose}>
            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Abmelden</ListItemText>
          </MenuItem>
        </Menu>
        
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 280 } }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: sidebarOpen ? 280 : 64,
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              width: sidebarOpen ? 280 : 64,
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
              overflowX: 'hidden',
              transition: 'width 0.3s ease-in-out',
            }
          }}
          open
        >
          {sidebarOpen ? drawer : miniDrawer}
        </Drawer>
        
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: '24px',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'background.default',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Container maxWidth="xl" sx={{ 
            py: 2, 
            paddingTop: 8, 
            height: '100%',
            overflow: 'auto'
          }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ExpandedMenuContext.Provider>
  );
}

export default MainLayout;
