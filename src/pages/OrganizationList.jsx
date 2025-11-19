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
  Typography,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  DataTable,
  TextFieldControl,
  SaveButton,
  CancelButton,
} from '../components/shared';

const MOCK_ORGANIZATIONS = [
  {
    id: 1,
    name: 'TechCorp GmbH',
    address: 'Technologiestraße 1, 10115 Berlin',
    contact: 'Max Mustermann',
    phone: '+49 30 1234567',
  },
  {
    id: 2,
    name: 'Digital Solutions',
    address: 'Innovationsweg 5, 80538 München',
    contact: 'Anna Schmidt',
    phone: '+49 89 7654321',
  },
  {
    id: 3,
    name: 'ConsultPro AG',
    address: 'Beratungsring 10, 50667 Köln',
    contact: 'Peter Müller',
    phone: '+49 221 9876543',
  },
  {
    id: 4,
    name: 'Enterprise Systems',
    address: 'Unternehmensallee 20, 60311 Frankfurt',
    contact: 'Lisa Wagner',
    phone: '+49 69 4567890',
  },
];

const OrganizationForm = ({ organization, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    organization || {
      name: '',
      address: '',
      contact: '',
      phone: '',
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
        {organization ? 'Organisation bearbeiten' : 'Neue Organisation'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2}>
          <TextFieldControl
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
          <TextFieldControl
            label="Adresse"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
            multiline
            rows={2}
          />
          <TextFieldControl
            label="Ansprechpartner"
            value={formData.contact}
            onChange={(e) => handleChange('contact', e.target.value)}
            required
          />
          <TextFieldControl
            label="Telefonnummer"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
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

export const OrganizationList = () => {
  const [organizations, setOrganizations] = useState(MOCK_ORGANIZATIONS);
  const [openForm, setOpenForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);

  const handleAddOrganization = () => {
    setEditingOrg(null);
    setOpenForm(true);
  };

  const handleEditOrganization = (org) => {
    setEditingOrg(org);
    setOpenForm(true);
  };

  const handleDeleteOrganization = (org) => {
    if (confirm(`Möchtest du "${org.name}" wirklich löschen?`)) {
      setOrganizations(organizations.filter((o) => o.id !== org.id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingOrg) {
      setOrganizations(
        organizations.map((o) =>
          o.id === editingOrg.id
            ? { ...editingOrg, ...formData }
            : o
        )
      );
    } else {
      setOrganizations([
        ...organizations,
        {
          ...formData,
          id: Math.max(...organizations.map((o) => o.id), 0) + 1,
        },
      ]);
    }
    setOpenForm(false);
  };

  const columns = [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'contact', label: 'Ansprechpartner', sortable: true },
    { id: 'phone', label: 'Telefon', sortable: true },
    {
      id: 'address',
      label: 'Adresse',
      render: (value) => (
        <Typography variant="body2" sx={{ maxWidth: 300 }}>
          {value}
        </Typography>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Organisationsverwaltung
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddOrganization}
        >
          Neue Organisation
        </Button>
      </Box>

      <DataTable
        columns={columns}
        rows={organizations}
        onEdit={handleEditOrganization}
        onDelete={handleDeleteOrganization}
        rowsPerPage={10}
      />

      {openForm && (
        <OrganizationForm
          organization={editingOrg}
          onSubmit={handleFormSubmit}
          onClose={() => setOpenForm(false)}
        />
      )}
    </Container>
  );
};
