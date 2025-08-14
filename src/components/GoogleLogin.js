import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const GoogleLogin = () => {
  const { login } = useAuth();

  // Google OAuth 2.0 配置
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI || 'https://indie-game-hub-2024.uc.r.appspot.com';

  const handleGoogleLogin = () => {
    // 构建Google OAuth URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent('openid email profile')}&` +
      `access_type=offline&` +
      `prompt=consent`;

    // 打开Google登录弹窗
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    const popup = window.open(
      googleAuthUrl,
      'googleLogin',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    // 监听弹窗消息
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
        const userData = event.data.user;
        login(userData);
        popup.close();
        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);

    // 检查弹窗是否被关闭
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
      }
    }, 1000);
  };

  return (
    <Button
      variant="outline-primary"
      onClick={handleGoogleLogin}
      className="google-login-btn d-flex align-items-center gap-2"
      style={{
        backgroundColor: '#fff',
        color: '#757575',
        border: '1px solid #dadce0',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.2s ease'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"/>
        <path fill="#34A853" d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.9245455 3.96409091,10.91 L0.957272727,10.91 L0.957272727,13.0290909 C2.43818182,15.5245455 5.48181818,18 9,18 L9,18 Z"/>
        <path fill="#FBBC05" d="M3.96409091,10.91 C3.78409091,10.33 3.68181818,9.70454545 3.68181818,9 C3.68181818,8.29545455 3.78409091,7.67 3.96409091,7.09 L3.96409091,4.97090909 L0.957272727,4.97090909 C0.347727273,6.44772727 0,8.19409091 0,9 C0,9.80590909 0.347727273,11.5522727 0.957272727,13.0290909 L3.96409091,10.91 L3.96409091,10.91 Z"/>
        <path fill="#EA4335" d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.47545455 0.957272727,4.97090909 L3.96409091,7.09 C4.67181818,5.07545455 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"/>
      </svg>
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
