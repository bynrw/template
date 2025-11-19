import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 280;

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
    path: '/',
  },
  {
    id: 'users',
    label: 'Benutzerverwaltung',
    icon: PeopleIcon,
    path: '/users',
  },
  {
    id: 'organizations',
    label: 'Organisationen',
    icon: BusinessIcon,
    path: '/organizations',
  },
];

const bottomMenuItems = [
  {
    id: 'settings',
    label: 'Einstellungen',
    icon: SettingsIcon,
    path: '/settings',
  },
  {
    id: 'logout',
    label: 'Abmelden',
    icon: LogoutIcon,
    path: '/logout',
  },
];

export const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setDrawerOpen(!drawerOpen);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  const DrawerContent = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.light,
              fontWeight: 'bold',
            }}
          >
            AD
          </Avatar>
          {!isMobile && (
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Admin
              </Typography>
              <Typography variant="caption">Verwalter</Typography>
            </Box>
          )}
        </Stack>
        {isMobile && (
          <IconButton
            size="small"
            onClick={() => setMobileDrawerOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 0 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <ListItem
              button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              sx={{
                pl: 2,
                mb: 0.5,
                mx: 1,
                borderRadius: 1,
                backgroundColor: active
                  ? `${theme.palette.primary.main}15`
                  : 'transparent',
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}10`,
                },
                borderLeft: active
                  ? `4px solid ${theme.palette.primary.main}`
                  : '4px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <ListItemIcon
                sx={{
                  color: active
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  minWidth: 40,
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 500,
                  color: active
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                }}
              />
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Bottom Menu Items */}
      <List sx={{ px: 0 }}>
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <ListItem
              button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              sx={{
                pl: 2,
                mb: 0.5,
                mx: 1,
                borderRadius: 1,
                backgroundColor: active
                  ? `${theme.palette.primary.main}15`
                  : 'transparent',
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}10`,
                },
                borderLeft: active
                  ? `4px solid ${theme.palette.primary.main}`
                  : '4px solid transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  color: active
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  minWidth: 40,
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 500,
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          ...(drawerOpen && !isMobile
            ? { width: `calc(100% - ${DRAWER_WIDTH}px)` }
            : {}),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {isMobile && mobileDrawerOpen ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerOpen ? DRAWER_WIDTH : 0,
            flexShrink: 0,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <DrawerContent />
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ...(drawerOpen && !isMobile
            ? { marginLeft: 0 }
            : {}),
        }}
      >
        {/* AppBar Spacing */}
        <Toolbar />

        {/* Content Area */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
