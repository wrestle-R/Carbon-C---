import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken, verifyToken } from '../Api/Auth';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setUserLoading(false);
          return;
        }

        // Set the token for requests
        setAuthToken(token);
        
        // Verify that the token is valid
        const isValid = await verifyToken();
        
        if (isValid) {
          // Fetch user data from token
          const userData = parseJwt(token);
          
          if (userData && userData.role !== 'company') {
            setUser({
              id: userData.id,
              name: userData.name || 'User', // Fallback if name is not in token
              email: userData.email,
              role: userData.role
            });
          } else {
            // If role is company, don't set the user
            localStorage.removeItem('token');
            setAuthToken(null);
          }
        } else {
          // If token is invalid, remove it
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setError(error.message);
        localStorage.removeItem('token');
        setAuthToken(null);
      } finally {
        setUserLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Parse JWT token to get user data
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  };

  // Login function
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  // Context value
  const value = {
    user,
    userLoading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;