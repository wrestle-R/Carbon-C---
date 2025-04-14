import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Overview = () => {
  const emissionData = {
    total: 2450,
    credits: 150,
    target: -15
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Emissions (tCO2e)',
        data: [420, 380, 450, 400, 380, 420],
        fill: true,
        backgroundColor: 'rgba(88, 129, 87, 0.2)',
        borderColor: '#588157',
        tension: 0.4,
        pointBackgroundColor: '#14281D'
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your carbon footprint and sustainability metrics</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#14281D] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Emissions</h2>
                <p className="text-2xl font-semibold text-gray-900">{emissionData.total} <span className="text-sm font-normal">tCO2e</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">YTD Change</div>
                <div className="text-sm font-medium text-red-500">+5.2%</div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#588157] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#588157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Carbon Credits</h2>
                <p className="text-2xl font-semibold text-[#588157]">{emissionData.credits} <span className="text-sm font-normal">credits</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Available Balance</div>
                <div className="text-sm font-medium text-[#588157]">$3,750 value</div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-[#588157] rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Reduction Target</h2>
                <p className="text-2xl font-semibold text-blue-600">{emissionData.target}% <span className="text-sm font-normal">annually</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-sm font-medium text-blue-600">8.3% of 15%</div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
        <h3 className="text-xl font-semibold text-[#14281D] mb-4">Emissions Trend</h3>
        <div className="h-80">
          <Line 
            data={chartData} 
            options={{ 
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top'
                },
                tooltip: {
                  backgroundColor: '#14281D',
                  titleColor: '#fffcdc',
                  bodyColor: '#fffcdc',
                  padding: 10,
                  cornerRadius: 8,
                  displayColors: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(20, 40, 29, 0.05)'
                  },
                  ticks: {
                    font: {
                      size: 12
                    }
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
          <h3 className="text-xl font-semibold text-[#14281D] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-[#14281D] text-white px-4 py-3 rounded-md font-medium hover:bg-[#3a5a40] transition-colors duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Emissions Data
            </button>
            <button className="w-full bg-[#588157] text-white px-4 py-3 rounded-md font-medium hover:bg-[#3a5a40] transition-colors duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Purchase Carbon Credits
            </button>
            <button className="w-full bg-[#a3b18a] text-white px-4 py-3 rounded-md font-medium hover:bg-[#3a5a40] transition-colors duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
          <h3 className="text-xl font-semibold text-[#14281D] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-[#14281D]">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">Updated emission data</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Energy consumption data updated for Q2</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-[#588157]">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">Purchased carbon credits</p>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">10 credits purchased for $2,500</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">New reduction target</p>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Set annual reduction target to 15%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;