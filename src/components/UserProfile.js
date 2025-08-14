import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        variant="link" 
        id="user-dropdown"
        className="d-flex align-items-center text-decoration-none p-0 border-0"
        style={{ background: 'transparent' }}
      >
        <img 
          src={user.avatar} 
          alt={user.name}
          className="user-avatar"
        />
        <span className="user-name d-none d-md-inline">{user.name}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item disabled>
          <div className="d-flex align-items-center">
            <img 
              src={user.avatar} 
              alt={user.name}
              style={{width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px'}}
            />
            <div>
              <div style={{fontWeight: '600', fontSize: '14px'}}>{user.name}</div>
              <div style={{fontSize: '12px', color: '#666'}}>{user.email}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#profile">
          👤 个人资料
        </Dropdown.Item>
        <Dropdown.Item href="#settings">
          ⚙️ 设置
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout} style={{color: '#dc3545'}}>
          🚪 退出登录
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfile;
