import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const GoogleLogin = () => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth flow
      // In a real application, you would integrate with Google OAuth 2.0
      const mockGoogleUser = {
        id: 'google_' + Date.now(),
        name: 'Demo User',
        email: 'demo@indiegamehub.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo&backgroundColor=ffb347',
        provider: 'google',
        loginTime: new Date().toISOString()
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login(mockGoogleUser);
      
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Button 
      className="google-login-btn"
      onClick={handleGoogleLogin}
      variant="outline-light"
    >
      <div className="google-icon"></div>
      使用 Google 账号登录
    </Button>
  );
};

export default GoogleLogin;
