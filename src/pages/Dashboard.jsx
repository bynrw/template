import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, action }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: color,
      },
    }}
  >
    <CardContent sx={{ flex: 1 }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            p: 1.5,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ color, fontSize: 24 }} />
        </Box>
      </Stack>
      {action && (
        <Button
          size="small"
          sx={{ mt: 2 }}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Willkommen zurück!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Hier ist ein Überblick über dein Dashboard.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Benutzer"
            value="24"
            icon={PeopleIcon}
            color="#2196f3"
            action={{
              label: 'Alle anzeigen',
              onClick: () => navigate('/users'),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Organisationen"
            value="8"
            icon={BusinessIcon}
            color="#4caf50"
            action={{
              label: 'Alle anzeigen',
              onClick: () => navigate('/organizations'),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Aktive Zeichen"
            value="32"
            icon={TrendingUpIcon}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Aktuelle Aktivität
              </Typography>
              <Stack spacing={2}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    borderLeft: '4px solid #2196f3',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Benutzer "Max Mustermann" hinzugefügt
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    vor 2 Stunden
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    borderLeft: '4px solid #4caf50',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Organisation "TechCorp" aktualisiert
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    vor 4 Stunden
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    borderLeft: '4px solid #ff9800',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    System-Update durchgeführt
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    vor 6 Stunden
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
