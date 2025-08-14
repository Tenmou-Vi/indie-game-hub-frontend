import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import { versionsAPI } from '../services/api';

const Versions = () => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      setLoading(true);
      const data = await versionsAPI.getAll();
      setVersions(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch versions:', err);
      setError('Failed to fetch version information. Please try again later.');
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
        <p className="mt-3">Loading version information...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>📦 Version Management</h2>
          <p className="text-muted">View all versions and release records for the project</p>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Row>
        {versions.map(version => (
          <Col md={12} key={version.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-start">
                  <span>{version.name}</span>
                  <Badge bg="primary">v{version.versionNumber}</Badge>
                </Card.Title>
                <Card.Text>{version.description}</Card.Text>
                <Row>
                  <Col md={6}>
                    <p className="mb-1">
                      <strong>Creator:</strong> {version.creator}
                    </p>
                    <p className="mb-1">
                      <strong>Included Assets:</strong> {version.assets.length} assets
                    </p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-1">
                      <strong>Completed Tasks:</strong> {version.tasks.length} tasks
                    </p>
                    <p className="mb-1">
                      <strong>Created:</strong> {new Date(version.createdAt).toLocaleString()}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {versions.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No version information available</p>
        </div>
      )}
    </Container>
  );
};

export default Versions;
