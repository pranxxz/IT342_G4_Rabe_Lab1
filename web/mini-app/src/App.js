import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import authService from './service/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial authentication state
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      // Optional: Validate token with backend
      if (authenticated) {
        try {
          await authService.validateToken();
        } catch (error) {
          // Token is invalid
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Router>
      <Container className="mt-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;