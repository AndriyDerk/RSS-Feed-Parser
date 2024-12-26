import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuthStatus } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
    };

    initializeAuth();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    document.cookie = 'accessToken=; Max-Age=0; path=/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
