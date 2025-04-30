import React, { useState } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/UserContext";
import { getUserProfile } from "../../Api/Auth";
import { 
  HomeIcon,
  ChartBarIcon, 
  CogIcon,
  IdentificationIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import CarbonCalculator from "../Company/Dashboard/Tabs/CarbonCalculator";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-green-800">Carbon Minus</h1>
          <p className="text-sm text-gray-500">User Dashboard</p>
        </div>
        
        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-800 font-bold">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/user/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "hover:bg-green-50 text-gray-700"
                  }`
                }
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/dashboard/calculator"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "hover:bg-green-50 text-gray-700"
                  }`
                }
              >
                <ChartBarIcon className="h-5 w-5 mr-3" />
                <span>Carbon Calculator</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/dashboard/history"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "hover:bg-green-50 text-gray-700"
                  }`
                }
              >
                <DocumentTextIcon className="h-5 w-5 mr-3" />
                <span>History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/dashboard/insights"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "hover:bg-green-50 text-gray-700"
                  }`
                }
              >
                <PresentationChartLineIcon className="h-5 w-5 mr-3" />
                <span>Insights</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "hover:bg-green-50 text-gray-700"
                  }`
                }
              >
                <IdentificationIcon className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/dashboard/settings"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "hover:bg-green-50 text-gray-700"
                  }`
                }
              >
                <CogIcon className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex w-full items-center p-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="calculator" element={<CarbonCalculator />} />
            <Route path="history" element={<CalculationHistory />} />
            <Route path="insights" element={<Insights />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<DashboardHome user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || "User"}!</h1>
        <p className="text-gray-600">Here's your carbon footprint overview</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h2 className="text-sm font-medium text-gray-500 mb-2">This Month</h2>
          <p className="text-3xl font-bold text-gray-800">256 <span className="text-lg font-normal text-gray-500">kg CO2e</span></p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-600">↓ 12% </span>
            <span className="text-gray-500 ml-1">vs. last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Yearly Total</h2>
          <p className="text-3xl font-bold text-gray-800">1,842 <span className="text-lg font-normal text-gray-500">kg CO2e</span></p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-600">↓ 8% </span>
            <span className="text-gray-500 ml-1">vs. last year</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Carbon Target</h2>
          <p className="text-3xl font-bold text-gray-800">68% <span className="text-lg font-normal text-gray-500">of goal</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "68%" }}></div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NavLink 
            to="/user/dashboard/calculator"
            className="flex items-center p-4 bg-white rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="rounded-full bg-green-100 p-2 mr-4">
              <ChartBarIcon className="h-6 w-6 text-green-800" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Calculate Emissions</h3>
              <p className="text-gray-500 text-sm">Upload a receipt or bill to calculate its carbon footprint</p>
            </div>
          </NavLink>
          
          <NavLink 
            to="/user/dashboard/insights"
            className="flex items-center p-4 bg-white rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="rounded-full bg-green-100 p-2 mr-4">
              <PresentationChartLineIcon className="h-6 w-6 text-green-800" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">View Insights</h3>
              <p className="text-gray-500 text-sm">Check your carbon reduction progress and insights</p>
            </div>
          </NavLink>
        </div>
      </div>
      
      {/* Recent Calculations */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Calculations</h2>
        <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emissions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  April 14, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Electricity
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $85.45
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                  357 kg CO2e
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  April 10, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Grocery
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $124.37
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                  42 kg CO2e
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  April 8, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Petrol
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $68.12
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                  69 kg CO2e
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other routes
const CalculationHistory = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold text-gray-800">Calculation History</h1>
    <p className="text-gray-600">View your past carbon footprint calculations</p>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p>Your calculation history will appear here.</p>
    </div>
  </div>
);

const Insights = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold text-gray-800">Carbon Insights</h1>
    <p className="text-gray-600">View detailed analytics about your carbon footprint</p>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p>Your carbon insights will appear here.</p>
    </div>
  </div>
);

const UserProfile = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
    <p className="text-gray-600">Manage your profile information</p>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p>Your profile information will appear here.</p>
    </div>
  </div>
);

const Settings = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
    <p className="text-gray-600">Manage your account settings and preferences</p>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p>Your settings will appear here.</p>
    </div>
  </div>
);

export default Dashboard;