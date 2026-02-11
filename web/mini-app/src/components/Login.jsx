import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert, Row, Col, Spinner, Image } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <Container fluid className="login-container">
      <Row className="vh-100 align-items-center justify-content-center">
        <Col xs={12} md={8} lg={6} xl={4}>
          <Card className="login-card shadow-lg border-0">
            <Card.Body className="p-4 p-md-5">
              
              {/* Logo/Brand Section */}
              <div className="text-center mb-4">
                <div className="logo-container mb-3">
                  <FaSignInAlt className="logo-icon" />
                </div>
                <Card.Title className="h3 fw-bold text-primary">Welcome Back</Card.Title>
                <p className="text-primary">Sign in to your account to continue</p>
              </div>
              
              {error && (
                <Alert 
                  variant="danger" 
                  className="d-flex align-items-center fade-in"
                  dismissible
                  onClose={() => setError('')}
                >
                  <FaEnvelope className="me-2" />
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit} className="mt-4">
                {/* Email Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium text-primary">Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaEnvelope className="text-secondary" />
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-start-0"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </Form.Group>
                
                {/* Password Input */}
                <Form.Group className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label className="fw-medium text-primary">Password</Form.Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-decoration-none text-primary fs-7"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaLock className="text-secondary" />
                    </span>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border-start-0 border-end-0"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light border-start-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-secondary" />
                      ) : (
                        <FaEye className="text-secondary" />
                      )}
                    </button>
                  </div>
                </Form.Group>
                
                {/* Remember Me Checkbox
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="text-secondary"
                  />
                </Form.Group>
                 */}
                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 fw-semibold shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Signing In...
                    </>
                  ) : (
                    <span className="text-secondary">
                      <FaSignInAlt className="me-2" color='#0B2D72' />
                      Sign In
                    </span>
                  )}
                </Button>
                
                {/* Registration Link */}
                <div className="text-center mt-4 pt-3">
                  <p className="text-primary mb-0">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="text-decoration-none fw-semibold text-primary"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
            
            <Card.Footer className="text-center py-3 bg-light">
              <small className="text-muted">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-decoration-none">Terms</a>
                {' '}and{' '}
                <a href="/privacy" className="text-decoration-none">Privacy Policy</a>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;