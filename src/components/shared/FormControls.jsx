import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
} from '@mui/material';

export const TextFieldControl = ({
  label,
  error,
  helperText,
  required,
  ...props
}) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      label={label}
      error={!!error}
      helperText={helperText}
      fullWidth
      required={required}
      size="small"
      {...props}
    />
  </Box>
);

export const SelectControl = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required,
  ...props
}) => (
  <Box sx={{ mb: 2 }}>
    <FormControl fullWidth size="small" error={!!error}>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  </Box>
);

export const DatePickerControl = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required,
  ...props
}) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      fullWidth
      required={required}
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  </Box>
);

export const FormSection = ({
  title,
  subtitle,
  children,
  ...props
}) => (
  <Card sx={{ mb: 3 }}>
    {title && (
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        }
        subheader={subtitle}
      />
    )}
    <CardContent>
      <Stack spacing={2}>
        {children}
      </Stack>
    </CardContent>
  </Card>
);
