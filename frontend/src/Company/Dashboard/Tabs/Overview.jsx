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
import { FaWallet, FaExchangeAlt, FaHistory, FaRupeeSign } from 'react-icons/fa';

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
    credits: 105,
    target: -15,
    walletAddress: '0x7a86c0b064171007716bbd6af96676935799a63e'
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
  
  // Market data for carbon credits
  const marketData = {
    currentPrice: 1950,
    dailyChange: +50,
    dailyChangePercent: 2.63,
    weeklyAverage: 1875,
    monthlyVolume: 12450,
    projectedTrend: 'increasing'
  };
  
  // Credit issuers for Indian market
  const topIssuers = [
    { name: 'Solar India Initiative', verified: true, avgPrice: 1850, rating: 4.8 },
    { name: 'Himalayan Conservation Trust', verified: true, avgPrice: 2250, rating: 4.9 },
    { name: 'Rajasthan Wind Farms', verified: true, avgPrice: 1950, rating: 4.7 }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your carbon footprint and sustainability metrics</p>
      </div>
      
      {/* Blockchain Wallet Status */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#14281D] mr-4">
              <FaWallet className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Carbon Credit Wallet</h2>
              <p className="font-mono text-xs text-[#14281D] bg-gray-100 p-1 px-2 rounded">{emissionData.walletAddress}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-6">
              <p className="text-sm text-gray-500">Token Balance</p>
              <p className="text-xl font-semibold">{emissionData.credits} <span className="text-sm font-normal">tCO2e</span></p>
            </div>
            <button className="bg-[#14281D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#3a5a40] transition-colors flex items-center">
              <FaExchangeAlt className="mr-2" /> Trade Credits
            </button>
          </div>
        </div>
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
                <p className="text-2xl font-semibold text-[#588157]">{emissionData.credits} <span className="text-sm font-normal">tokens</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Market Value</div>
                <div className="text-sm font-medium text-[#588157]">₹212,250</div>
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

      {/* Carbon Credit Market Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
          <h3 className="text-xl font-semibold text-[#14281D] mb-4">Carbon Credit Market</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Current Token Price</p>
                <div className="flex items-center">
                  <FaRupeeSign className="text-gray-700 mr-1" />
                  <p className="text-2xl font-semibold text-gray-900">{marketData.currentPrice}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-sm font-medium flex items-center ${marketData.dailyChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span>{marketData.dailyChange >= 0 ? '↑' : '↓'}</span>
                <span className="ml-1">{Math.abs(marketData.dailyChangePercent)}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Weekly Average</p>
                <p className="font-medium">₹{marketData.weeklyAverage}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Volume</p>
                <p className="font-medium">{marketData.monthlyVolume} tokens</p>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <p className="text-sm font-medium">Verified Projects in India</p>
            <div className="space-y-2">
              {topIssuers.map((issuer, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {issuer.name} 
                      {issuer.verified && (
                        <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-1 py-0.5 rounded">Verified</span>
                      )}
                    </p>
                    <div className="flex items-center text-xs text-amber-500 mt-0.5">
                      {'★'.repeat(Math.floor(issuer.rating))}
                      {issuer.rating % 1 > 0 && '☆'}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{issuer.avgPrice}</p>
                    <p className="text-xs text-gray-500">per token</p>
                  </div>
                </div>
              ))}
            </div>
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
              <p className="text-sm text-gray-600 mt-1">10 tokens purchased for ₹18,500</p>
              <p className="text-xs text-blue-600 font-mono mt-1 hover:underline cursor-pointer">TX: 0x6723c...9a4e</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">Tokens minted</p>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">5 new tokens minted from verified project</p>
              <p className="text-xs text-blue-600 font-mono mt-1 hover:underline cursor-pointer">TX: 0x8f91b...2c7d</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">BIS Certification Received</p>
                <span className="text-xs text-gray-500">5 days ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Project verified by Bureau of Indian Standards</p>
              <p className="text-xs text-blue-600 font-mono mt-1 hover:underline cursor-pointer">Certificate: BIS25/CCM/2341</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;