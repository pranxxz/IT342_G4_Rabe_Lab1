import React, { useState, useEffect } from 'react';
import { Card, Container, Alert, Form } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { Person, Email, Badge } from '@mui/icons-material';
import Sidebar from './Sidebar';
import './Dashboard.css'; // Reuse the same CSS for layout consistency

const colors = {
  primary: '#522258',
  secondary: '#8C3061',
  accent: '#C63C51',
  light: '#D95F59',
  background: '#e2e2e2',
  text: '#4b5563',
  textLight: '#9ca3af',
  white: '#ffffff',
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) {
    return (
      <div className="dashboard-layout" >
        <Sidebar user={user} />
        <main className="main-content" >
          <Container fluid className="full-height-container">
            <Card className="stretch-card">
              <Alert variant="danger" style={{ 
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#fee',
                color: colors.accent,
                marginBottom: 0,
                textAlign: 'center'
              }}>
                User data not found. Please login again.
              </Alert>
            </Card>
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />
      <main className="main-content">
        <Container className="full-height-container">
          <Card className="stretch-card" style={{width: '700px', justifyContent: 'center', margin: '0 auto'}}>
            <Card.Body style={{ padding: '2rem'}}>
              {/* Header with icon */}
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70px',
                  height: '70px',
                  background: colors.primary,
                  borderRadius: '50%',
                  marginBottom: '1rem'
                }}>
                  <Person sx={{ fontSize: '35px', color: colors.white }} />
                </Box>
                <Typography 
                  variant="h3"
                  style={{ 
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: colors.primary,
                    marginBottom: '0.5rem'
                  }}
                >
                  My Profile
                </Typography>
                <div style={{
                  width: '60px',
                  height: '4px',
                  background: colors.accent,
                  margin: '0 auto',
                  borderRadius: '2px'
                }} />
              </div>

              {error && (
                <Alert 
                  variant="danger" 
                  style={{ 
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#fee',
                    color: colors.accent,
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  {error}
                </Alert>
              )}

              <Card style={{
                border: 'none',
                background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)`,
                borderRadius: '20px',
                padding: '0.5rem'
              }}>
                <Card.Body>
                  <Form>
                    {/* First Name */}
                    <Box sx={{ mb: 3 }}>
                      <Form.Label style={{ 
                        color: colors.primary, 
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        display: 'block'
                      }}>
                        <Badge sx={{ fontSize: '1rem', mr: 1, color: colors.accent }} />
                        First Name
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <Form.Control
                          type="text"
                          value={user.firstName || ''}
                          disabled
                          style={{
                            borderRadius: '12px',
                            border: `1px solid ${colors.primary}30`,
                            padding: '8px 15px',
                            backgroundColor: colors.white,
                            color: colors.text,
                            fontSize: '0.95rem',
                            boxShadow: 'none'
                          }}
                        />
                      </div>
                    </Box>

                    {/* Last Name */}
                    <Box sx={{ mb: 3 }}>
                      <Form.Label style={{ 
                        color: colors.primary, 
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        display: 'block'
                      }}>
                        <Badge sx={{ fontSize: '1rem', mr: 1, color: colors.accent }} />
                        Last Name
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <Form.Control
                          type="text"
                          value={user.lastName || ''}
                          disabled
                          style={{
                            borderRadius: '12px',
                            border: `1px solid ${colors.primary}30`,
                            padding: '8px 15px',
                            backgroundColor: colors.white,
                            color: colors.text,
                            fontSize: '0.95rem'
                          }}
                        />
                      </div>
                    </Box>

                    {/* Email */}
                    <Box sx={{ mb: 3 }}>
                      <Form.Label style={{ 
                        color: colors.primary, 
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        display: 'block'
                      }}>
                        <Email sx={{ fontSize: '1rem', mr: 1, color: colors.accent }} />
                        Email Address
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <Form.Control
                          type="email"
                          value={user.email || ''}
                          disabled
                          style={{
                            borderRadius: '12px',
                            border: `1px solid ${colors.primary}30`,
                            padding: '8px 15px',
                            backgroundColor: colors.white,
                            color: colors.text,
                            fontSize: '0.95rem'
                          }}
                        />
                      </div>
                    </Box>

                    {/* Username */}
                    <Box sx={{ mb: 3 }}>
                      <Form.Label style={{ 
                        color: colors.primary, 
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        display: 'block'
                      }}>
                        <Badge sx={{ fontSize: '1rem', mr: 1, color: colors.accent }} />
                        Username
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <Form.Control
                          type="text"
                          value={user.username || ''}
                          disabled
                          style={{
                            borderRadius: '12px',
                            border: `1px solid ${colors.primary}30`,
                            padding: '8px 15px',
                            backgroundColor: colors.white,
                            color: colors.text,
                            fontSize: '0.95rem'
                          }}
                        />
                      </div>
                    </Box>
                  </Form>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  );
};

export default Profile;