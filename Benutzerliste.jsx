import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Box,
    CircularProgress,
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    InputAdornment,
    Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import userService from '../services/userService';
import BenutzerDetail from './BenutzerDetail';

const Benutzerliste = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [organisationFilter, setOrganisationFilter] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [organisations, setOrganisations] = useState([]);

    // Load users on component mount
    useEffect(() => {
        fetchUsers();
        extractOrganisations();
    }, []);

    // Fetch users from API
    const fetchUsers = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.getUsers(params);
            console.log('API Response:', response);

            // Handle HAL format response
            let userList = [];
            if (response._embedded && response._embedded.users) {
                userList = response._embedded.users;
            } else if (Array.isArray(response)) {
                userList = response;
            } else if (response.content && Array.isArray(response.content)) {
                userList = response.content;
            }

            console.log('Extracted users:', userList);
            setUsers(Array.isArray(userList) ? userList : []);

            // Extract organisations after users are loaded
            if (Array.isArray(userList) && userList.length > 0) {
                const orgSet = new Set();
                userList.forEach(user => {
                    if (user.organisations && Array.isArray(user.organisations)) {
                        user.organisations.forEach(org => {
                            if (org.orgName) {
                                orgSet.add(org.orgName);
                            }
                        });
                    }
                });
                setOrganisations(Array.from(orgSet).sort());
            }
        } catch (err) {
            setError('Fehler beim Laden der Benutzer');
            console.error('Error details:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique organisations from users
    const extractOrganisations = () => {
        // This will be called after users are loaded
        setTimeout(() => {
            const orgSet = new Set();
            users.forEach(user => {
                if (user.organisations && Array.isArray(user.organisations)) {
                    user.organisations.forEach(org => {
                        if (org.orgName) {
                            orgSet.add(org.orgName);
                        }
                    });
                }
            });
            setOrganisations(Array.from(orgSet).sort());
        }, 0);
    };

    // Handle name/email search
    const handleNameSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        applyFilters(value, organisationFilter);
    };

    // Handle organisation filter
    const handleOrganisationFilter = (e) => {
        const value = e.target.value;
        setOrganisationFilter(value);
        applyFilters(searchTerm, value);
    };

    // Apply both filters
    const applyFilters = (nameFilter, orgFilter) => {
        if (!nameFilter && !orgFilter) {
            fetchUsers();
            return;
        }

        // Client-side filtering
        let filtered = users;

        if (nameFilter) {
            const searchLower = nameFilter.toLowerCase();
            filtered = filtered.filter(user =>
                (user.firstname && user.firstname.toLowerCase().includes(searchLower)) ||
                (user.lastname && user.lastname.toLowerCase().includes(searchLower)) ||
                (user.username && user.username.toLowerCase().includes(searchLower)) ||
                (user.mail && user.mail.toLowerCase().includes(searchLower))
            );
        }

        if (orgFilter) {
            filtered = filtered.filter(user =>
                user.organisations &&
                user.organisations.some(org => org.orgName === orgFilter)
            );
        }

        setUsers(filtered);
    };

    // Open detail view
    const handleViewDetails = async (userId) => {
        try {
            const response = await userService.getUserById(userId);
            // Extract from HAL format
            const userData = response.content || response;
            setSelectedUser(userData);
            setDetailOpen(true);
        } catch (err) {
            setError('Fehler beim Laden der Benutzerdetails');
        }
    };

    // Close detail view
    const handleCloseDetail = () => {
        setDetailOpen(false);
        setSelectedUser(null);
    };

    // Open delete confirmation dialog
    const handleOpenDeleteDialog = (userId) => {
        setDeleteTargetId(userId);
        setDeleteDialogOpen(true);
    };

    // Close delete confirmation dialog
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setDeleteTargetId(null);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        try {
            await userService.deleteUser(deleteTargetId);
            setUsers(users.filter(user => user.userUid !== deleteTargetId));
            handleCloseDeleteDialog();
            setError(null);
        } catch (err) {
            setError('Fehler beim Löschen des Benutzers');
            console.error(err);
        }
    };

    if (loading && users.length === 0) {
        return <CircularProgress />;
    }

    return (
        <>
            {/* Filter Card */}
            <Card sx={{ mb: 3, p: 3, background: 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)', borderLeft: '4px solid #4169E1' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    <TextField
                        fullWidth
                        label="Benutzer suchen"
                        placeholder="Name, Email, Benutzername..."
                        value={searchTerm}
                        onChange={handleNameSearch}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#4169E1', mr: 1 }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <Tooltip title="Filter löschen">
                                        <Button
                                            size="small"
                                            onClick={() => handleNameSearch({ target: { value: '' } })}
                                            sx={{ minWidth: 'auto', p: 0 }}
                                        >
                                            <CloseIcon sx={{ fontSize: 18 }} />
                                        </Button>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#4169E1',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4169E1',
                                    boxShadow: '0 0 0 3px rgba(65, 105, 225, 0.1)',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        select
                        label="Nach Organisation filtern"
                        value={organisationFilter}
                        onChange={handleOrganisationFilter}
                        variant="outlined"
                        size="small"
                        SelectProps={{
                            native: true,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#4169E1',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4169E1',
                                    boxShadow: '0 0 0 3px rgba(65, 105, 225, 0.1)',
                                },
                            },
                        }}
                    >
                        <option value="">Alle Organisationen</option>
                        {organisations.map((org) => (
                            <option key={org} value={org}>
                                {org}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Card>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2, borderRadius: 1 }}
                    onClose={() => setError(null)}
                >
                    {error}
                </Alert>
            )}

            {loading && users.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress sx={{ color: '#4169E1' }} />
                </Box>
            ) : (
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: '0 4px 12px rgba(65, 105, 225, 0.12)',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Table sx={{ minWidth: 750 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#4169E1' }}>
                                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>ID</TableCell>
                                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Vorname</TableCell>
                                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Nachname</TableCell>
                                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Email</TableCell>
                                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Aktionen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#9E9E9E' }}>
                                        <Box sx={{ fontSize: 14 }}>Keine Benutzer gefunden</Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user, index) => (
                                    <TableRow
                                        key={user.userUid}
                                        hover
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? '#F5F7FA' : '#FFFFFF',
                                            '&:hover': {
                                                backgroundColor: '#E8EEF7',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, color: '#666' }}>
                                            {user.userUid.substring(0, 8)}...
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{user.firstname || user.firstName || '-'}</TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{user.lastname || user.lastName || '-'}</TableCell>
                                        <TableCell sx={{ color: '#4169E1', fontSize: 13 }}>{user.mail || user.email || '-'}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <Tooltip title="Details anzeigen">
                                                    <Button
                                                        size="small"
                                                        startIcon={<VisibilityIcon />}
                                                        onClick={() => handleViewDetails(user.userUid)}
                                                        variant="outlined"
                                                        sx={{
                                                            color: '#4169E1',
                                                            borderColor: '#4169E1',
                                                            '&:hover': {
                                                                backgroundColor: '#E8EEF7',
                                                                borderColor: '#2E4CB8',
                                                            },
                                                        }}
                                                    >
                                                        Details
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Benutzer löschen">
                                                    <Button
                                                        size="small"
                                                        startIcon={<DeleteIcon />}
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => handleOpenDeleteDialog(user.userUid)}
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#FFEBEE',
                                                            },
                                                        }}
                                                    >
                                                        Löschen
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Detail View Modal */}
            <Dialog open={detailOpen} onClose={handleCloseDetail} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ background: 'linear-gradient(135deg, #4169E1 0%, #2E4CB8 100%)', color: '#FFFFFF', fontWeight: 700 }}>
                    Benutzerdetails
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    {selectedUser && <BenutzerDetail user={selectedUser} />}
                </DialogContent>
                <DialogActions sx={{ borderTop: '1px solid #E0E0E0', p: 2 }}>
                    <Button onClick={handleCloseDetail} sx={{ color: '#666' }}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle sx={{ fontWeight: 700, color: '#D32F2F' }}>
                    Benutzer löschen?
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button onClick={handleCloseDeleteDialog} variant="outlined" sx={{ color: '#666' }}>
                        Abbrechen
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" sx={{ boxShadow: '0 2px 8px rgba(244, 67, 54, 0.3)' }}>
                        Löschen
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Benutzerliste;
