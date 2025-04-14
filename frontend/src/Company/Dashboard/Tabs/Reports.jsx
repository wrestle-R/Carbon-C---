import React, { useState } from 'react';

import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  
  const reportTypes = [
    { id: 'emissions', name: 'Emissions Report', description: 'Total carbon emissions during the specified period' },
    { id: 'credits', name: 'Carbon Credits Report', description: 'Carbon credit purchases and retirements' },
    { id: 'savings', name: 'Savings Report', description: 'Cost savings from reduced emissions' },
    { id: 'compliance', name: 'Compliance Report', description: 'Regulatory compliance status' }
  ];
  
  const previousReports = [
    { id: 101, name: 'Q1 2023 Emissions Report', date: '2023-04-01', type: 'emissions', size: '1.2 MB' },
    { id: 102, name: 'Q1 2023 Carbon Credits Report', date: '2023-04-01', type: 'credits', size: '0.8 MB' },
    { id: 103, name: 'Annual Sustainability Report 2022', date: '2023-01-15', type: 'compliance', size: '3.5 MB' },
    { id: 104, name: 'Q2 2023 Emissions Report', date: '2023-07-01', type: 'emissions', size: '1.3 MB' },
    { id: 105, name: 'Q2 2023 Savings Report', date: '2023-07-01', type: 'savings', size: '1.0 MB' }
  ];
  
  const handleGenerateReport = () => {
    if (!selectedReport || !dateRange.startDate || !dateRange.endDate) {
      alert('Please select a report type and date range');
      return;
    }
    
    // In a real application, this would generate the report
    alert(`Generating ${selectedReport} report for ${dateRange.startDate} to ${dateRange.endDate}`);
  };
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Reports</h1>
        <p className="text-gray-600">Generate and download reports about your emissions and carbon credits</p>
      </div>
      
      {/* Generate New Report */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">Generate New Report</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <div className="space-y-4">
                {reportTypes.map((report) => (
                  <div key={report.id} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`report-${report.id}`}
                        name="report-type"
                        type="radio"
                        checked={selectedReport === report.id}
                        onChange={() => setSelectedReport(report.id)}
                        className="h-4 w-4 text-[#588157] border-gray-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`report-${report.id}`} className="font-medium text-gray-700">
                        {report.name}
                      </label>
                      <p className="text-gray-500">{report.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="space-y-4">
                <div>
                  <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    id="start-date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#588157] focus:border-[#588157] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    id="end-date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#588157] focus:border-[#588157] sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleGenerateReport}
              className="px-4 py-2 bg-[#14281D] text-white font-medium rounded-md hover:bg-[#3a5a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#588157] transition-colors"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Previous Reports */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">Previous Reports</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Generated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previousReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.type === 'emissions' 
                          ? 'bg-orange-100 text-orange-800'
                          : report.type === 'credits'
                          ? 'bg-blue-100 text-blue-800'
                          : report.type === 'savings'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{report.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{report.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="inline-flex items-center px-3 py-1 bg-[#588157] text-white rounded-md text-sm hover:bg-[#3a5a40] transition-colors">
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">Report Scheduling</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">Set up automatic report generation and email delivery to key stakeholders</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-800">Monthly Emissions Report</h3>
              <p className="text-sm text-gray-500">Generated on the 1st of each month</p>
            </div>
            <div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="text-[#588157] hover:text-[#3a5a40] font-medium text-sm">
              + Schedule a new report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;