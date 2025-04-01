import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import UserNavbar from './User/UserNavbar';
import CompanyNavbar from './Company/CompanyNavbar';
import Home from './User/Home';
import Login from './Company/Login';
import Register from './Company/Register';
import CompanyDashboard from './Company/CompanyDashboard';

const App = () => {
  const { company } = useCompany();

  return (
    <BrowserRouter>
      {company ? <CompanyNavbar /> : <UserNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/company/login" 
          element={company ? <Navigate to="/company/dashboard" /> : <Login />} 
        />
        <Route 
          path="/company/register" 
          element={company ? <Navigate to="/company/dashboard" /> : <Register />} 
        />
        <Route 
          path="/company/dashboard" 
          element={company ? <CompanyDashboard /> : <Navigate to="/company/login" />} 
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