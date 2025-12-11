import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Divider,
    Chip,
    TextField,
    Paper,
} from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, Business as BusinessIcon } from '@mui/icons-material';

const BenutzerDetail = ({ user }) => {
    if (!user) {
        return <Typography>Keine Benutzerdaten verfügbar</Typography>;
    }

    return (
        <Box sx={{ pt: 0 }}>
            <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <PersonIcon sx={{ color: '#4169E1', fontSize: 24 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#4169E1' }}>
                            Persönliche Daten
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Vorname"
                        value={user.firstname || user.firstName || ''}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F5F7FA',
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Nachname"
                        value={user.lastname || user.lastName || ''}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F5F7FA',
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Benutzername"
                        value={user.username || ''}
                        InputProps={{ readOnly: true, startAdornment: <Typography sx={{ mr: 1, color: '#999' }}>@</Typography> }}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F5F7FA',
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={user.mail || user.email || ''}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F5F7FA',
                            },
                            '& .MuiOutlinedInput-input': {
                                color: '#4169E1',
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Telefon"
                        value={user.phone || ''}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F5F7FA',
                            },
                        }}
                    />
                </Grid>

                {/* Organizations */}
                {user.organisations && user.organisations.length > 0 && (
                    <>
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <BusinessIcon sx={{ color: '#4169E1', fontSize: 24 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4169E1' }}>
                                    Organisationen & Rollen
                                </Typography>
                            </Box>
                        </Grid>

                        {user.organisations.map((org, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            border: '2px solid #4169E1',
                                            borderRadius: 1.5,
                                            backgroundColor: '#F5F7FA',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: '#E8EEF7',
                                                borderColor: '#2E4CB8',
                                            },
                                        }}
                                    >
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4169E1', mb: 1.5 }}>
                                            {org.orgName || 'Ohne Organisation'}
                                        </Typography>
                                        {org.roles && org.roles.length > 0 ? (
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {org.roles.map((role, roleIndex) => (
                                                    <Chip
                                                        key={roleIndex}
                                                        label={role.roleName}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#4169E1',
                                                            color: '#FFFFFF',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                                Keine Rollen zugewiesen
                                            </Typography>
                                        )}
                                    </Paper>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </>
                )}

                {/* Status Information */}
                {user.deleted !== undefined && (
                    <>
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#4169E1', mb: 2 }}>
                                Status
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Chip
                                label={user.deleted ? 'Gelöscht' : 'Aktiv'}
                                color={user.deleted ? 'error' : 'success'}
                                variant="filled"
                                sx={{ fontWeight: 600, fontSize: 13 }}
                            />
                        </Grid>
                    </>
                )}

                {/* UID */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <TextField
                        fullWidth
                        label="Benutzer-ID (UID)"
                        value={user.userUid || ''}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F5F7FA',
                            },
                            '& .MuiOutlinedInput-input': {
                                fontFamily: 'monospace',
                                fontSize: 12,
                                color: '#999',
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default BenutzerDetail;