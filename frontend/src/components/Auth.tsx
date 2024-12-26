import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await api.post('/user/login', { username, password });
        login(); 
        alert('Login successful');
        navigate('/home');
      } else {
       
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        await api.post('/user/register', { username, password });
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      alert(isLogin ? 'Login failed' : 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleAuth} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        )}
        <button type="submit" className="primary-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="login-links">
        <button type="button" onClick={() => setIsLogin((prev) => !prev)} className="secondary-button">
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
        <button type="button" onClick={() => navigate('/home')} className="secondary-button">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Auth;
