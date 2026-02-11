import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../service/authService'; // Import authService

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);
    
  //   try {
  //     const response = await authService.login({
  //       email: formData.email,
  //       password: formData.password
  //     });
      
  //     if (response.success) {
  //       navigate('/dashboard');
  //     } else {
  //       setError(response.message || 'Login failed');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message || 'Invalid email or password');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  
  try {
    console.log('1. Starting login...');
    
    const response = await authService.login({
      email: formData.email,
      password: formData.password
    });
    
    console.log('2. Login response:', response);
    console.log('3. response.success value:', response.success);
    console.log('4. response object keys:', Object.keys(response));
    
    if (response.success === true) {
      console.log('5. Login successful! Navigating to dashboard...');
      navigate('/dashboard');
      console.log('6. navigate() called');
    } else {
      console.log('7. Login failed in response');
      setError(response.message || 'Login failed');
    }
  } catch (err) {
    console.log('8. Login error:', err);
    setError('Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            
            <div className="text-center mt-3">
              Don't have an account? <a href="/register">Register here</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;