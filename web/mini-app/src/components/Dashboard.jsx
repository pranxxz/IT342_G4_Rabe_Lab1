import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../service/authService'; // Import authService

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Get user data
    const user = authService.getCurrentUser();
    if (user) {
      setUserData(user);
    }
    
    // Validate token with backend (optional)
    authService.validateToken().catch(() => {
      // Token validation failed - logout will happen automatically
    });
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Dashboard</Card.Title>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="text-center mb-4">
            <h4>Welcome to Your Dashboard!</h4>
            {userData && (
              <div>
                <p>Hello, {userData.firstName} {userData.lastName}!</p>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
              </div>
            )}
            <p>This is a protected page that only authenticated users can access.</p>
          </div>
          
          <div className="text-center mt-4">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;