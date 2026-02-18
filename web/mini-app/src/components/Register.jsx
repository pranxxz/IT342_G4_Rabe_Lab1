import React, { useState } from 'react';
import { 
  Typography, 
  Box,
  Alert,
  CircularProgress
} from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  EmailField,
  PasswordField,
  InputField,
  NameFieldsRow,
  GradientButton, 
  UsernameField
} from "./RegisterComponents";

export default function StyledRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '', 
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username, 
        email: formData.email,
        password: formData.password
      };
      
      const response = await axios.post('http://localhost:8080/api/auth/register', requestData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    // MAIN BACKGROUND WRAPPER
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e2e2e2',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* --- Floating Circles --- */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      {/* --- CONTAINER (The Card) --- */}
      <Box className="container" sx={{
        backgroundColor: '#fff',
        borderRadius: '30px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '550px',
        minHeight: '750px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        
        {/* --- FORM SECTION (Register) --- */}
        <Box sx={{ width: '100%', maxWidth: '450px' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography 
              variant="h3"
              sx={{ 
                fontWeight: 700,
                fontSize: '2rem',
                color: '#4B0082',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', fontSize: '0.95rem', mb: 2 }}>
              Sign up to get started with your account
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Fields Row */}
            <NameFieldsRow
              firstName={formData.firstName}
              lastName={formData.lastName}
              onFirstNameChange={handleChange('firstName')}
              onLastNameChange={handleChange('lastName')}
            />

            {/* Username Field */}
            <UsernameField
              label="Username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange('username')}
            />

            {/* Email Field */}
            <EmailField
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="Enter your email"
            />

            {/* Password Field */}
            <PasswordField
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange('password')}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
              helperText="Password must be at least 6 characters long"
            />

            {/* Confirm Password Field */}
            <PasswordField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              showPassword={showConfirmPassword}
              onToggleVisibility={toggleConfirmPasswordVisibility}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <GradientButton
                type="submit"
                disabled={isLoading}
                sx={{ minWidth: '200px' }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </GradientButton>
            </Box>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ color: '#8C3061', fontWeight: 600, textDecoration: 'none' }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>

        </Box>

        {/* --- STYLES --- */}
        <style>{`
        .bg-shape {
            position: absolute;
            border-radius: 50%;
            z-index: 1; 
            opacity: 0.25; 
            animation: float 12s infinite ease-in-out;
        }

        .shape-1 {
            top: -5%;
            left: -5%;
            width: 400px;
            height: 400px;
            background: #764ba2; 
            animation-delay: 0s;
        }

        .shape-2 {
            bottom: -5%;
            right: -5%;
            width: 500px;
            height: 500px;
            background: #764ba2; 
            animation-delay: 5s;
        }
        
        .shape-3 {
            bottom: 40%;
            left: 10%;
            width: 200px;
            height: 200px;
            background: #4B0082; 
            opacity: 0.15;
            animation-delay: 2s;
            animation-duration: 15s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-40px) translateX(30px); }
        }

        @media (max-width: 768px) {
            .container {
                margin: 20px;
                min-height: auto;
                padding: 30px 20px !important;
            }
            .bg-shape {
                display: none; 
            }
        }
      `}</style>
      </Box>

    </Box>
  );
}