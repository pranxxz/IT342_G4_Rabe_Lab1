import React, { useState, useEffect } from 'react';
import { Card, Container, Alert } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import './Dashboard.css';

const colors = {
  primary: '#522258',
  secondary: '#8C3061',
  accent: '#C63C51',
  background: '#e2e2e2',
  text: '#4b5563',
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />
      <main className="main-content">
        <Container fluid className="full-height-container">
          <Card className="stretch-card">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Box className="welcome-banner">
                <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>
                  Welcome{user?.firstName ? `, ${user.firstName}` : ' back'}!
                </Typography>
              </Box>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;