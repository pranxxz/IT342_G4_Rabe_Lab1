import React from 'react';
import { styled } from '@mui/system';
import { Box, TextField, IconButton, Button } from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email, Person } from '@mui/icons-material';

// Color palette
const colors = {
  primary: '#522258',      // Dark purple
  secondary: '#8C3061',    // Medium purple-red
  accent: '#C63C51',       // Red
  light: '#D95F59',        // Light red/coral
  error: '#f44336',        // Keep error color as is
  checking: '#8C3061',     // Use secondary for checking indicator
};

// InputField Component
export const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = 'text',
  startAdornment,
  endAdornment,
  touched = true,
  fullWidth = true,
  sx = {},
  select = false,
  children,
  ...props
}) => {
  const isError = touched && !!error;
  
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        label={label}
        placeholder={placeholder}
        fullWidth={fullWidth}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={isError}
        helperText={touched ? helperText : ''}
        select={select}
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                {startAdornment}
              </Box>
            ) : null,
            endAdornment: endAdornment,
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': {
              borderColor: isError ? colors.error : colors.primary,
            },
            '&:hover fieldset': {
              borderColor: isError ? colors.error : colors.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: isError ? colors.error : colors.accent,
            },
          },
          '& .MuiOutlinedInput-input': {
            py: '12px',
            px: '10px',
            fontSize: '0.95rem',
          },
          '& .MuiInputLabel-root': {
            color: isError ? colors.error : colors.primary,
            fontSize: '0.95rem',
            '&.Mui-focused': {
              color: isError ? colors.error : colors.accent,
            },
          },
          '& .MuiFormHelperText-root': {
            mx: 0,
            fontSize: '0.75rem',
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </TextField>
    </Box>
  );
};

export const EmailField = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  touched = true,
  checkingEmail = false,
  sx = {},
  ...props
}) => {
  const isError = touched && !!error;
  
  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <InputField
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        touched={touched}
        startAdornment={
          <Email 
            sx={{ 
              color: isError ? colors.error : colors.primary,
              fontSize: '1.2rem'
            }}
          />
        }
        sx={{ mb: 0, ...sx }}
        {...props}
      />
      {checkingEmail && (
        <Box 
          sx={{ 
            position: 'absolute', 
            right: 12, 
            top: '20px', 
            color: colors.checking,
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          Checking...
        </Box>
      )}
    </Box>
  );
};

export const UsernameField = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  touched = true,
  checkingUsername = false,
  sx = {},
  ...props
}) => {
  const isError = touched && !!error;
  
  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <InputField
        label="Username"
        placeholder="Choose a username"
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        touched={touched}
        startAdornment={
          <Person 
            sx={{ 
              color: isError ? colors.error : colors.primary,
              fontSize: '1.2rem'
            }}
          />
        }
        sx={{ mb: 0, ...sx }}
        {...props}
      />
      {checkingUsername && (
        <Box 
          sx={{ 
            position: 'absolute', 
            right: 12, 
            top: '20px', 
            color: colors.checking,
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          Checking...
        </Box>
      )}
    </Box>
  );
};

export const PasswordField = ({
  label = 'Password',
  showPassword,
  onToggleVisibility,
  touched = true,
  error,
  helperText,
  sx = {},
  ...props
}) => {
  const isError = touched && !!error;
  
  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <InputField
        label={label}
        type={showPassword ? "text" : "password"}
        touched={touched}
        error={error}
        helperText={helperText}
        startAdornment={
          <Lock 
            sx={{ 
              color: isError ? colors.error : colors.primary,
              fontSize: '1.2rem'
            }}
          />
        }
        endAdornment={
          <IconButton
            onClick={onToggleVisibility}
            edge="end"
            sx={{
              color: colors.secondary,
              paddingRight: '13px',
              '&:hover': {
                color: colors.accent,
              },
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
        sx={sx}
        {...props}
      />
    </Box>
  );
};

// NameFieldsRow Component
export const NameFieldsRow = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onFirstNameBlur,
  onLastNameBlur,
  firstNameError,
  lastNameError,
  firstNameTouched,
  lastNameTouched,
}) => {
  const isFirstNameError = firstNameTouched && !!firstNameError;
  const isLastNameError = lastNameTouched && !!lastNameError;

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ position: 'relative' }}>
          <TextField
            label="First Name"
            placeholder="First name"
            variant="outlined"
            value={firstName}
            onChange={onFirstNameChange}
            onBlur={onFirstNameBlur}
            error={isFirstNameError}
            helperText={isFirstNameError ? firstNameError : ''}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                    <Person 
                      sx={{ 
                        color: isFirstNameError ? colors.error : colors.primary,
                        fontSize: '1.2rem'
                      }}
                    />
                  </Box>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: isFirstNameError ? colors.error : colors.primary,
                },
                '&:hover fieldset': {
                  borderColor: isFirstNameError ? colors.error : colors.secondary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: isFirstNameError ? colors.error : colors.accent,
                },
              },
              '& .MuiOutlinedInput-input': {
                py: '12px',
                px: '10px',
                fontSize: '0.95rem',
              },
              '& .MuiInputLabel-root': {
                color: isFirstNameError ? colors.error : colors.primary,
                fontSize: '0.95rem',
                '&.Mui-focused': {
                  color: isFirstNameError ? colors.error : colors.accent,
                },
              },
              '& .MuiFormHelperText-root': {
                mx: 0,
                fontSize: '0.75rem',
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ position: 'relative' }}>
          <TextField
            label="Last Name"
            placeholder="Last name"
            variant="outlined"
            value={lastName}
            onChange={onLastNameChange}
            onBlur={onLastNameBlur}
            error={isLastNameError}
            helperText={isLastNameError ? lastNameError : ''}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                    <Person 
                      sx={{ 
                        color: isLastNameError ? colors.error : colors.primary,
                        fontSize: '1.2rem'
                      }}
                    />
                  </Box>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: isLastNameError ? colors.error : colors.primary,
                },
                '&:hover fieldset': {
                  borderColor: isLastNameError ? colors.error : colors.secondary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: isLastNameError ? colors.error : colors.accent,
                },
              },
              '& .MuiOutlinedInput-input': {
                py: '12px',
                px: '10px',
                fontSize: '0.95rem',
              },
              '& .MuiInputLabel-root': {
                color: isLastNameError ? colors.error : colors.primary,
                fontSize: '0.95rem',
                '&.Mui-focused': {
                  color: isLastNameError ? colors.error : colors.accent,
                },
              },
              '& .MuiFormHelperText-root': {
                mx: 0,
                fontSize: '0.75rem',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// ErrorAlert Component
export const ErrorAlert = ({ message, sx = {} }) => {
  if (!message) return null;
  
  return (
    <Box sx={{
      mb: 3,
      p: 2,
      borderRadius: 2,
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      color: colors.error,
      fontSize: '0.875rem',
      ...sx,
    }}>
      {message}
    </Box>
  );
};

// Button Components
const StyledNavSideButton = styled(Button)(({ theme }) => ({
  borderColor: colors.secondary,
  color: colors.primary,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: '8px',
  padding: "8px",
  transition: "all 0.3s ease",
  width: "130px",
  "&:hover": {
    backgroundColor: colors.light + '20', // Adding transparency
    borderColor: colors.accent,
    color: colors.accent,
    transform: "translateY(-2px)",
  },
}));

export function NavSideButton({ children, sx = {}, ...props }) {
  return (
    <StyledNavSideButton
      variant="outlined"
      sx={sx}
      {...props}
    >
      {children}
    </StyledNavSideButton>
  );
}

const StyledButton = styled(Button)(({ theme }) => ({
  background: colors.primary,
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  padding: "7px 20px",
  borderRadius: 8,
  fontSize: "0.9rem",
  transition: "all 0.3s ease",
  border: "none",
  boxShadow: `0 4px 15px ${colors.primary}80`,
  minWidth: "160px",
  "&:hover": {
    background: colors.secondary,
    transform: "translateY(-2px)",
    boxShadow: `0 6px 20px ${colors.secondary}80`,
  },
  "&:active": {
    background: colors.accent,
  },
}));

export function GradientButton({ children, sx = {}, ...props }) {
  return (
    <StyledButton
      variant="contained"
      sx={sx}
      {...props}
    >
      {children}
    </StyledButton>
  );
}