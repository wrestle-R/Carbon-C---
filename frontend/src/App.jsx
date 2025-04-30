import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useCompany } from '../Context/CompanyContext';
import { useAuth } from '../Context/UserContext';
import CompanyNavbar from './Company/CompanyNavbar';
import Home from './User/Home';
import CompanyLogin from './Company/Login';
import CompanyRegister from './Company/Register';
import CompanyDashboard from './Company/CompanyDashboard';

// User components
import UserLogin from './User/Login';
import UserRegister from './User/Register';
import UserDashboard from './User/Dashboard';

const App = () => {
  const { company, companyLoading } = useCompany();
  const { user, userLoading } = useAuth();
  
  // Combined loading state
  const loading = companyLoading || userLoading;

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
        {/* Public route */}
        <Route path="/" element={<Home />} />
        
        {/* Company routes */}
        <Route 
          path="/company/login" 
          element={
            loading ? <LoadingScreen /> : 
            company ? <Navigate to="/company/dashboard" /> : <CompanyLogin />
          } 
        />
        <Route 
          path="/company/register" 
          element={
            loading ? <LoadingScreen /> : 
            company ? <Navigate to="/company/dashboard" /> : <CompanyRegister />
          } 
        />
        <Route 
          path="/company/dashboard/*" 
          element={
            loading ? <LoadingScreen /> : 
            company ? <CompanyDashboard /> : <Navigate to="/company/login" />
          } 
        />
        
        {/* User routes */}
        <Route 
          path="/login" 
          element={
            loading ? <LoadingScreen /> : 
            user ? <Navigate to="/user/dashboard" /> : <UserLogin />
          } 
        />
        <Route 
          path="/register" 
          element={
            loading ? <LoadingScreen /> : 
            user ? <Navigate to="/user/dashboard" /> : <UserRegister />
          } 
        />
        <Route 
          path="/user/dashboard/*" 
          element={
            loading ? <LoadingScreen /> : 
            user ? <UserDashboard /> : <Navigate to="/login" />
          } 
        />

        {/* 404 route */}
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