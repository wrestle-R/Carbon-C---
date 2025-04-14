import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import CompanyNavbar from './Company/CompanyNavbar';
import Home from './User/Home';
import Login from './Company/Login';
import Register from './Company/Register';
import CompanyDashboard from './Company/CompanyDashboard';

const App = () => {
  const { company, loading } = useCompany();

  // Loading component to show while checking authentication
  const LoadingScreen = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/company/login" 
          element={
            loading ? <LoadingScreen /> : 
            company ? <Navigate to="/company/dashboard" /> : <Login />
          } 
        />
        <Route 
          path="/company/register" 
          element={
            loading ? <LoadingScreen /> : 
            company ? <Navigate to="/company/dashboard" /> : <Register />
          } 
        />
        <Route 
          path="/company/dashboard" 
          element={
            loading ? <LoadingScreen /> : 
            company ? <CompanyDashboard /> : <Navigate to="/company/login" />
          } 
        />
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600 mb-4">Page not found</p>
              <Link to="/" className="text-green-600 hover:text-green-700">
                Go back home
              </Link>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;