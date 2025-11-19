import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Switch,
  FormControlLabel,
  Typography,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  DataTable,
  TextFieldControl,
  SelectControl,
  FormSection,
  SaveButton,
  CancelButton,
} from '../components/shared';

const MOCK_USERS = [
  {
    id: 1,
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    role: 'admin',
    active: true,
  },
  {
    id: 2,
    firstName: 'Anna',
    lastName: 'Schmidt',
    email: 'anna@example.com',
    role: 'user',
    active: true,
  },
  {
    id: 3,
    firstName: 'Peter',
    lastName: 'Müller',
    email: 'peter@example.com',
    role: 'manager',
    active: false,
  },
  {
    id: 4,
    firstName: 'Lisa',
    lastName: 'Wagner',
    email: 'lisa@example.com',
    role: 'user',
    active: true,
  },
  {
    id: 5,
    firstName: 'Tom',
    lastName: 'Becker',
    email: 'tom@example.com',
    role: 'user',
    active: true,
  },
];

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrator' },
  { value: 'manager', label: 'Manager' },
  { value: 'user', label: 'Benutzer' },
];

const UserForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    user || {
      firstName: '',
      lastName: '',
      email: '',
      role: 'user',
      active: true,
    }
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {user ? 'Benutzer bearbeiten' : 'Neuer Benutzer'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2}>
          <TextFieldControl
            label="Vorname"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
          <TextFieldControl
            label="Nachname"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
          <TextFieldControl
            label="E-Mail"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          <SelectControl
            label="Rolle"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            options={ROLE_OPTIONS}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.active}
                onChange={(e) => handleChange('active', e.target.checked)}
              />
            }
            label="Aktiv"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <CancelButton onClick={onClose} />
        <SaveButton onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export const UserList = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setOpenForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenForm(true);
  };

  const handleDeleteUser = (user) => {
    if (confirm(`Möchtest du "${user.firstName} ${user.lastName}" wirklich löschen?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...editingUser, ...formData }
            : u
        )
      );
    } else {
      setUsers([
        ...users,
        {
          ...formData,
          id: Math.max(...users.map((u) => u.id), 0) + 1,
        },
      ]);
    }
    setOpenForm(false);
  };

  const columns = [
    { id: 'firstName', label: 'Vorname', sortable: true },
    { id: 'lastName', label: 'Nachname', sortable: true },
    { id: 'email', label: 'E-Mail', sortable: true },
    {
      id: 'role',
      label: 'Rolle',
      render: (value) => {
        const roleLabel = ROLE_OPTIONS.find((r) => r.value === value)?.label;
        return (
          <Chip
            label={roleLabel}
            size="small"
            color={value === 'admin' ? 'error' : 'default'}
            variant={value === 'admin' ? 'filled' : 'outlined'}
          />
        );
      },
    },
    {
      id: 'active',
      label: 'Status',
      render: (value) => (
        <Chip
          label={value ? 'Aktiv' : 'Inaktiv'}
          size="small"
          color={value ? 'success' : 'default'}
          variant="outlined"
        />
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Benutzerverwaltung
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Neuer Benutzer
        </Button>
      </Box>

      <DataTable
        columns={columns}
        rows={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        rowsPerPage={10}
      />

      {openForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onClose={() => setOpenForm(false)}
        />
      )}
    </Container>
  );
};
