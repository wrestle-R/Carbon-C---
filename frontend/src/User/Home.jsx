import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Monitor & Reduce Your Carbon Footprint
        </h1>
        <p className="text-xl text-gray-600">
          Join the global initiative to combat climate change
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Track Emissions</h3>
          <p className="text-gray-600">
            Real-time monitoring of carbon emissions
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Carbon Credits</h3>
          <p className="text-gray-600">
            Trade and manage your carbon credits
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Analytics</h3>
          <p className="text-gray-600">
            Detailed insights and reporting
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/company/login"
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;