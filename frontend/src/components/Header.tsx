import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');  
      logout();
      alert('Logged out successfully');
    } catch (error) {
      alert('Failed to log out');
    }
  };

  return (
    <header className="header">
      <h1>Blog App</h1>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="secondary-button">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate('/auth')} className="secondary-button">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
