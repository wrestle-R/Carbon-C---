import React, { createContext, useContext, useState, useEffect } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to retrieve company data from localStorage on initial load
    const storedCompany = localStorage.getItem('company');
    if (storedCompany && token) {
      try {
        setCompany(JSON.parse(storedCompany));
      } catch (error) {
        console.error('Failed to parse stored company data:', error);
      }
    }
    setLoading(false);
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    setToken(null);
    setCompany(null);
  };

  return (
    <CompanyContext.Provider value={{ 
      company,
      setCompany,
      token,
      setToken,
      loading,
      logout
    }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};