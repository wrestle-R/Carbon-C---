import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              CarbonTrack
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-green-200">
              Home
            </Link>
            <Link to="/calculator" className="text-white hover:text-green-200">
              Calculator
            </Link>
            <Link to="/companies" className="text-white hover:text-green-200">
              Companies
            </Link>
            <Link to="/company/login" 
              className="bg-white text-green-600 px-4 py-2 rounded-md">
              Company Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;