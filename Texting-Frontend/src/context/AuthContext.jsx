import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import userService from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const userData = await userService.getUserById(decoded.id);
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, logout, setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
