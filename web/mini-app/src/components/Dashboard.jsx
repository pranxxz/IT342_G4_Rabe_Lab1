import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get('http://localhost:8080/api/auth/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to fetch dashboard data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Dashboard</Card.Title>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="text-center mb-4">
            <h4>Welcome to Your Dashboard!</h4>
            <p>This is a protected page that only authenticated users can access.</p>
          </div>
          
          {dashboardData && (
            <div className="alert alert-info">
              <strong>Dashboard Content:</strong> {dashboardData}
            </div>
          )}
          
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