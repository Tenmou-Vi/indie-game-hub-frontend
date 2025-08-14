import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import { usersAPI } from '../services/api';

const Team = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersAPI.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to fetch team members. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading team members...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>👥 Team Members</h2>
          <p className="text-muted">View all team member information for the project</p>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Row>
        {users.map(user => (
          <Col md={6} lg={4} key={user.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-start">
                  <span>{user.displayName}</span>
                  <Badge bg={user.online ? 'success' : 'secondary'}>
                    {user.online ? 'Online' : 'Offline'}
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <strong>Role:</strong> {user.role}<br/>
                  <strong>Username:</strong> @{user.username}<br/>
                  <strong>Email:</strong> {user.email}
                </Card.Text>
                {!user.online && (
                  <small className="text-muted">
                    Last seen: {new Date(user.lastSeen).toLocaleString()}
                  </small>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {users.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No team member information available</p>
        </div>
      )}
    </Container>
  );
};

export default Team;
