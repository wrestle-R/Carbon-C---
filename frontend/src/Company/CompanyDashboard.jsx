import React from 'react';

const Dashboard = ({ companyName }) => {
  const emissionData = {
    total: 2450,
    credits: 150,
    target: -15
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {companyName}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Emissions
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {emissionData.total} tCO2e
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Carbon Credits
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">
              {emissionData.credits}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Reduction Target
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-blue-600">
              {emissionData.target}%
            </dd>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Update Emissions Data
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Buy Carbon Credits
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Updated emission data</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Purchased 10 carbon credits</p>
              <p className="text-xs text-gray-400">1 day ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Set new reduction target</p>
              <p className="text-xs text-gray-400">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;