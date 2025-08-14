import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';

const GoogleCallback = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // 获取URL中的授权码
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // 发送授权码到后端换取用户信息
        const response = await fetch('/api/auth/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate with Google');
        }

        const userData = await response.json();

        // 发送消息给父窗口
        if (window.opener) {
          window.opener.postMessage({
            type: 'GOOGLE_LOGIN_SUCCESS',
            user: userData
          }, window.location.origin);
          
          // 关闭弹窗
          window.close();
        } else {
          // 如果不是弹窗，重定向到主页
          window.location.href = '/';
        }

      } catch (error) {
        console.error('Google OAuth callback error:', error);
        
        // 发送错误消息给父窗口
        if (window.opener) {
          window.opener.postMessage({
            type: 'GOOGLE_LOGIN_ERROR',
            error: error.message
          }, window.location.origin);
          
          window.close();
        } else {
          // 显示错误信息
          setError(error.message);
        }
      }
    };

    handleGoogleCallback();
  }, []);

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">
          <h4>Authentication Error</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status" className="mb-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h4>Authenticating with Google...</h4>
      <p>Please wait while we complete your login.</p>
    </Container>
  );
};

export default GoogleCallback;
