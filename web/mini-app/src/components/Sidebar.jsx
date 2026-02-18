import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Dashboard as DashboardIcon, Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import './Sidebar.css';

const colors = {
  primary: '#522258',
  secondary: '#8C3061',
  accent: '#C63C51',
  light: '#D95F59',
  text: '#4b5563',
  textLight: '#9ca3af',
  white: '#ffffff',
  sidebarBg: '#ffffff',
};

const Sidebar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box className="sidebar" sx={{
      width: '250px',
      minWidth: '250px', /* Ensures sidebar doesn't shrink */
      height: '100vh',
      backgroundColor: colors.sidebarBg,
      boxShadow: '4px 0 15px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      borderRight: `1px solid ${colors.primary}20`,
      zIndex: 10,
    }}>
      <Box sx={{ p: 3, borderBottom: `2px solid ${colors.accent}` }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary }}>Menu</Typography>
        <Box sx={{ width: '40px', height: '3px', background: colors.accent, mt: 1, borderRadius: '2px' }} />
      </Box>

      <Nav className="flex-column" style={{ padding: '1.5rem', flex: 1 }}>
        {[
          { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon />, color: colors.primary },
          { path: '/profile', label: 'Profile', icon: <PersonIcon />, color: colors.secondary },
        ].map((item) => (
          <Nav.Link 
            key={item.path}
            as={Link} 
            to={item.path} 
            style={{
              padding: '0.75rem 1rem',
              marginBottom: '0.5rem',
              borderRadius: '12px',
              color: location.pathname === item.path ? colors.white : colors.text,
              backgroundColor: location.pathname === item.path ? item.color : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 500,
            }}
          >
            {item.icon} {item.label}
          </Nav.Link>
        ))}
      </Nav>

      <Box sx={{ p: 3, borderTop: `1px solid ${colors.primary}10` }}>
        <Box sx={{ p: 2, bgcolor: colors.white, borderRadius: '12px', mb: 2, border: `1px solid ${colors.primary}10` }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: colors.primary }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.textLight }}>{user?.email}</Typography>
        </Box>
        <button className="logout-btn" onClick={handleLogout}>
          <LogoutIcon fontSize="small" /> Logout
        </button>
      </Box>
    </Box>
  );
};

export default Sidebar;