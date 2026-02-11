import React, { useState, useEffect } from 'react';
import { Card, Container, Alert, Form, Button } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <Container>
        <Alert variant="danger">User data not found. Please login again.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-4 mb-4">
        <h2>My Profile</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label><strong>First Name</strong></Form.Label>
              <Form.Control
                type="text"
                value={user.firstName || ''}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><strong>Last Name</strong></Form.Label>
              <Form.Control
                type="text"
                value={user.lastName || ''}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control
                type="email"
                value={user.email || ''}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><strong>Username</strong></Form.Label>
              <Form.Control
                type="text"
                value={user.username || ''}
                disabled
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label><strong>User ID</strong></Form.Label>
              <Form.Control
                type="text"
                value={user.id || ''}
                disabled
              />
            </Form.Group> */}
          </Form>

          {/* <div className="alert alert-info mt-4">
            <strong>Note:</strong> Profile editing features coming soon.
          </div> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
