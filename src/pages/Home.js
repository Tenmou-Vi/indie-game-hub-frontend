import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { assetsAPI, tasksAPI, usersAPI, versionsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    assets: 0,
    tasks: 0,
    users: 0,
    versions: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [assets, tasks, users, versions] = await Promise.all([
        assetsAPI.getAll(),
        tasksAPI.getAll(),
        usersAPI.getAll(),
        versionsAPI.getAll()
      ]);
      
      setStats({
        assets: assets.length,
        tasks: tasks.length,
        users: users.length,
        versions: versions.length
      });
      setError(null);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Failed to fetch statistics. Please try again later.');
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
        <p className="mt-3">Loading data...</p>
      </Container>
    );
  }

  return (
    <Container>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Hero Section with cute gaming elements */}
      <div className="hero-section text-center p-5 mb-4 rounded" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
        borderRadius: '25px',
        boxShadow: '0 15px 35px rgba(255, 140, 0, 0.3)',
        border: '3px solid #ff8c42'
      }}>
        <h1 className="display-3 bounce-animation" style={{color: '#ff6b35', textShadow: '3px 3px 6px rgba(0,0,0,0.2)'}}>
          🎮 {isAuthenticated ? `Welcome back, ${user.name}!` : 'Welcome to Indie Game Hub!'} 🎮
        </h1>
        <p className="lead" style={{color: '#ff8c42', fontSize: '1.4rem', fontWeight: '600'}}>
          ✨ {isAuthenticated ? 'Your personal game development dashboard!' : 'Your magical workspace for indie game development!'} ✨
        </p>
        <p className="mb-4" style={{color: '#ffa726', fontSize: '1.1rem'}}>
          🚀 Complete CRUD operations implemented with love! 💖
        </p>
        <Button variant="primary" size="lg" href="/tasks" className="bounce-animation">
          🎯 Start Your Adventure!
        </Button>
      </div>
      
      {/* Cute Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number bounce-animation">🎨 {stats.assets}</div>
            <div className="stats-label">Game Assets</div>
            <small style={{color: '#ff8c42'}}>Creative treasures!</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number bounce-animation">📋 {stats.tasks}</div>
            <div className="stats-label">Active Tasks</div>
            <small style={{color: '#ff8c42'}}>Things to do!</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number bounce-animation">👥 {stats.users}</div>
            <div className="stats-label">Team Members</div>
            <small style={{color: '#ff8c42'}}>Amazing people!</small>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number bounce-animation">🚀 {stats.versions}</div>
            <div className="stats-label">Game Versions</div>
            <small style={{color: '#ff8c42'}}>Epic milestones!</small>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>✨ Awesome Features ✨</h5>
            </Card.Header>
            <Card.Body>
              <div style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                <div>🎯 <strong>Complete CRUD operations</strong> - Create, read, update, delete!</div>
                <div>📝 <strong>Task management magic</strong> - Organize your workflow!</div>
                <div>🎨 <strong>Asset management power</strong> - Handle your game resources!</div>
                <div>⚡ <strong>Real-time updates</strong> - See changes instantly!</div>
                <div>🛡️ <strong>Error handling shield</strong> - Safe and reliable!</div>
                <div>📱 <strong>Responsive design</strong> - Works everywhere!</div>
                <div>🎮 <strong>Gaming-themed UI</strong> - Fun and beautiful!</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>🚀 Quick Adventure Start! 🗺️</h5>
            </Card.Header>
            <Card.Body>
              <p style={{fontSize: '1.1rem', color: '#ff8c42', fontWeight: '600', marginBottom: '20px'}}>
                Choose your path, brave developer! 🧙‍♂️
              </p>
              <div className="d-grid gap-3">
                <Button variant="primary" href="/tasks" style={{fontSize: '1.1rem', padding: '12px'}}>
                  📋 Quest Management (Tasks)
                </Button>
                <Button variant="success" href="/assets" style={{fontSize: '1.1rem', padding: '12px'}}>
                  🎨 Treasure Vault (Assets)
                </Button>
                <Button variant="warning" href="/team" style={{fontSize: '1.1rem', padding: '12px'}}>
                  👥 Guild Members (Team)
                </Button>
                <Button variant="info" href="/versions" style={{fontSize: '1.1rem', padding: '12px'}}>
                  🚀 Milestone Castle (Versions)
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Fun achievement section */}
      <Row className="mt-4">
        <Col>
          <Card style={{background: 'linear-gradient(135deg, #fff9e6, #ffe0b3)', border: '2px solid #ffa726'}}>
            <Card.Header style={{background: 'linear-gradient(90deg, #ffa726, #ffcc02)', color: 'white'}}>
              <h5>🏆 Development Achievements 🏆</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <Row>
                <Col md={4}>
                  <div className="mb-3">
                    <div style={{fontSize: '3rem'}}>🥇</div>
                    <strong>Full-Stack Hero</strong>
                    <br />
                    <small>Completed frontend + backend integration!</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <div style={{fontSize: '3rem'}}>🎯</div>
                    <strong>CRUD Master</strong>
                    <br />
                    <small>Implemented all CRUD operations!</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <div style={{fontSize: '3rem'}}>☁️</div>
                    <strong>Cloud Deployer</strong>
                    <br />
                    <small>Successfully deployed to Google Cloud!</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
