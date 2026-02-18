import React, { useState, useEffect } from 'react';
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
  GradientButton
} from "./RegisterComponents";

// Color palette
const colors = {
  primary: '#522258',
  secondary: '#8C3061',
  accent: '#C63C51',
  light: '#D95F59',
  text: '#4b5563',
  textLight: '#9ca3af',
};

export default function StyledLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      setIsLoading(false);
    }
  };

  // Pre-fill remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        maxWidth: '500px',
        minHeight: '600px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        
        {/* --- FORM SECTION (Sign In) --- */}
        <Box sx={{ width: '100%', maxWidth: '380px' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3"
              sx={{ 
                fontWeight: 700,
                fontSize: '2rem',
                color: colors.primary,
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text, fontSize: '0.95rem', mb: 3 }}>
              Sign in to your account to continue
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
            <EmailField
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="Enter your email"
            />

            <PasswordField
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange('password')}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
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
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </GradientButton>
            </Box>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: colors.text }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{ color: colors.secondary, fontWeight: 600, textDecoration: 'none' }}
              >
                Create an account
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
            opacity: 0.2; 
            animation: float 12s infinite ease-in-out;
        }

        .shape-1 {
            top: -5%;
            left: -5%;
            width: 400px;
            height: 400px;
            background: ${colors.primary}; 
            animation-delay: 0s;
        }

        .shape-2 {
            bottom: -5%;
            right: -5%;
            width: 500px;
            height: 500px;
            background: ${colors.secondary}; 
            animation-delay: 5s;
        }
        
        .shape-3 {
            bottom: 40%;
            left: 10%;
            width: 200px;
            height: 200px;
            background: ${colors.accent}; 
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