import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleLogin from './GoogleLogin';
import UserProfile from './UserProfile';

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <Navbar expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Indie Game Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
            >
              🏠 Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/assets" 
              active={location.pathname === '/assets'}
            >
              🎨 Assets
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/tasks" 
              active={location.pathname === '/tasks'}
            >
              📋 Tasks
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/team" 
              active={location.pathname === '/team'}
            >
              👥 Team
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/versions" 
              active={location.pathname === '/versions'}
            >
              📦 Versions
            </Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <GoogleLogin />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
