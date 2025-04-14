import React, { useState } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = () => {
  const [timeRange, setTimeRange] = useState('ytd');
  
  // Color scheme
  const colors = {
    darkGreen: '#14281D',
    mediumGreen: '#588157',
    lightGreen: '#a3b18a',
    cream: '#fffcdc'
  };

  const timeRangeOptions = [
    { id: '3m', label: '3 Months' },
    { id: '6m', label: '6 Months' },
    { id: 'ytd', label: 'Year to Date' },
    { id: '1y', label: '1 Year' },
    { id: 'all', label: 'All Time' },
  ];

  // Monthly emissions by source chart data
  const monthlyEmissionsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Electricity',
        data: [150, 145, 152, 144, 130, 125, 120, 115, 110],
        backgroundColor: colors.darkGreen,
        stack: 'Stack 0',
      },
      {
        label: 'Transport',
        data: [90, 85, 95, 90, 85, 80, 85, 75, 70],
        backgroundColor: colors.mediumGreen,
        stack: 'Stack 0',
      },
      {
        label: 'Manufacturing',
        data: [120, 125, 115, 110, 105, 100, 105, 110, 105],
        backgroundColor: colors.lightGreen,
        stack: 'Stack 0',
      },
      {
        label: 'Other',
        data: [40, 35, 45, 30, 35, 40, 35, 30, 25],
        backgroundColor: '#dad7cd',
        stack: 'Stack 0',
      },
    ]
  };

  // Emissions by source chart data
  const emissionsBySourceData = {
    labels: ['Electricity', 'Transport', 'Manufacturing', 'Other'],
    datasets: [
      {
        data: [35, 25, 30, 10],
        backgroundColor: [
          colors.darkGreen,
          colors.mediumGreen,
          colors.lightGreen,
          '#dad7cd'
        ],
        borderColor: 'white',
        borderWidth: 2,
        hoverBorderWidth: 0,
      }
    ]
  };

  // Emissions by facility chart data
  const emissionsByFacilityData = {
    labels: ['Main Factory', 'Office HQ', 'Distribution Center', 'Retail Stores', 'Data Center'],
    datasets: [
      {
        data: [40, 15, 20, 10, 15],
        backgroundColor: [
          'rgba(20, 40, 29, 0.8)',
          'rgba(20, 40, 29, 0.6)',
          'rgba(20, 40, 29, 0.4)',
          'rgba(20, 40, 29, 0.3)',
          'rgba(20, 40, 29, 0.2)',
        ],
      }
    ]
  };

  // Emissions vs Target chart data
  const emissionsVsTargetData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Actual Emissions',
        data: [400, 390, 407, 374, 355, 345, 345, 330, 310],
        borderColor: colors.mediumGreen,
        backgroundColor: 'rgba(88, 129, 87, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.darkGreen
      },
      {
        label: 'Target Path',
        data: [400, 390, 380, 370, 360, 350, 340, 330, 320],
        borderColor: '#e63946',
        borderDash: [5, 5],
        backgroundColor: 'rgba(230, 57, 70, 0.05)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#e63946'
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Emissions Analytics</h1>
        <p className="text-gray-600">Detailed analysis of your carbon emissions data</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#14281D]">Emissions Overview</h2>
          <div className="flex bg-gray-100 rounded-md p-1">
            {timeRangeOptions.map((option) => (
              <button
                key={option.id}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  timeRange === option.id
                    ? 'bg-[#14281D] text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTimeRange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <Line 
              data={emissionsVsTargetData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'end'
                  },
                  tooltip: {
                    backgroundColor: colors.darkGreen,
                    titleColor: colors.cream,
                    bodyColor: colors.cream,
                    padding: 10,
                    cornerRadius: 8,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: 'tCO2e'
                    },
                    grid: {
                      color: 'rgba(20, 40, 29, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                interaction: {
                  intersect: false,
                  mode: 'index'
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-[#14281D]">Emissions by Source</h2>
          </div>
          <div className="p-6 flex justify-center">
            <div style={{ width: '300px', height: '300px' }}>
              <Doughnut 
                data={emissionsBySourceData}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20
                      }
                    },
                    tooltip: {
                      backgroundColor: colors.darkGreen,
                      titleColor: colors.cream,
                      bodyColor: colors.cream,
                      callbacks: {
                        label: function(context) {
                          const value = context.raw;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = Math.round((value / total) * 100);
                          return `${context.label}: ${percentage}% (${value} tCO2e)`;
                        }
                      }
                    }
                  },
                  cutout: '65%',
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-[#14281D]">Emissions by Facility</h2>
          </div>
          <div className="p-6 flex justify-center">
            <div style={{ width: '300px', height: '300px' }}>
              <PolarArea 
                data={emissionsByFacilityData}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20
                      }
                    },
                    tooltip: {
                      backgroundColor: colors.darkGreen,
                      titleColor: colors.cream,
                      bodyColor: colors.cream,
                    }
                  },
                  scales: {
                    r: {
                      ticks: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">Monthly Emissions by Source</h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <Bar
              data={monthlyEmissionsData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'end'
                  },
                  tooltip: {
                    backgroundColor: colors.darkGreen,
                    titleColor: colors.cream,
                    bodyColor: colors.cream,
                    padding: 10,
                    cornerRadius: 8,
                  }
                },
                scales: {
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'tCO2e'
                    },
                    grid: {
                      color: 'rgba(20, 40, 29, 0.05)'
                    }
                  },
                  x: {
                    stacked: true,
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 p-6">
        <h2 className="text-lg font-semibold text-[#14281D] mb-4">Insights & Recommendations</h2>
        <div className="space-y-4">
          <div className="bg-[#14281D] bg-opacity-5 p-4 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-md font-semibold text-[#14281D]">Electricity Usage Trend</h3>
                <p className="text-gray-700 mt-1">Your electricity-related emissions have decreased by 26.7% over the past 9 months, showing good progress toward your reduction goals.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#588157] bg-opacity-5 p-4 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#588157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-md font-semibold text-[#588157]">On Track for Target</h3>
                <p className="text-gray-700 mt-1">You are currently ahead of your emissions reduction target by approximately 2.5%. Keep up the good work!</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-md font-semibold text-amber-700">Manufacturing Opportunity</h3>
                <p className="text-gray-700 mt-1">Manufacturing emissions have remained relatively stable. Consider implementing energy efficiency measures in this area to further reduce your carbon footprint.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;