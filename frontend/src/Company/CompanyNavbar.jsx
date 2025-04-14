import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';

const CompanyNavbar = () => {
  const { company, logout } = useCompany();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#14281D] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/company/dashboard" className="text-white text-2xl font-bold">
              CarbonTrack
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/company/dashboard" className="text-white hover:text-[#fffcdc]">
              Dashboard
            </Link>
            <Link to="/company/emissions" className="text-white hover:text-[#fffcdc]">
              Emissions
            </Link>
            <Link to="/company/credits" className="text-white hover:text-[#fffcdc]">
              Carbon Credits
            </Link>
            <span className="text-white">
              Welcome, {company?.companyName || 'Company'}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-[#fffcdc] text-[#14281D] px-4 py-2 rounded-md hover:bg-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CompanyNavbar;