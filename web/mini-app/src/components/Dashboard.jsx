import React, { useState, useEffect } from 'react';
import { Card, Container, Alert } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar user={user} />
      <div className="main-content">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Dashboard</Card.Title>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <div className="text-center mb-4">
                <h4>Welcome {user?.firstName || 'User'}!</h4>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;