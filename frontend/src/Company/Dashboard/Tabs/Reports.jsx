import React, { useState, useEffect } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [reportType, setReportType] = useState('');
  
  const reportTypes = [
    { id: 'emissions', name: 'Emissions Report', description: 'Total carbon emissions during the specified period' },
    { id: 'credits', name: 'Carbon Credits Report', description: 'Carbon credit purchases and retirements on blockchain' },
    { id: 'savings', name: 'Savings Report', description: 'Cost savings from reduced emissions (in ₹)' },
    { id: 'compliance', name: 'Compliance Report', description: 'Regulatory compliance status for Indian standards' }
  ];
  
  const previousReports = [
    { id: 101, name: 'Q1 2025 Emissions Report', date: '2025-04-01', type: 'emissions', size: '1.2 MB' },
    { id: 102, name: 'Q1 2025 Carbon Credits Blockchain Report', date: '2025-04-01', type: 'credits', size: '0.8 MB' },
    { id: 103, name: 'Annual Sustainability Report 2024', date: '2025-01-15', type: 'compliance', size: '3.5 MB' },
    { id: 104, name: 'Q2 2025 Emissions Report', date: '2025-07-01', type: 'emissions', size: '1.3 MB' },
    { id: 105, name: 'Q2 2025 Savings Report (₹)', date: '2025-07-01', type: 'savings', size: '1.0 MB' }
  ];

  // Generate report using Google Gemini API
  const generateReport = async (reportType, startDate, endDate) => {
    setGeneratingReport(true);
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      const prompt = `Generate a detailed ${reportType} report for an Indian company using blockchain-based carbon credits between ${startDate} and ${endDate}. 
      Format the report with proper markdown:
      - Use # for main heading, ## for section headings, and ### for subsection headings
      - Use bullet points with * or - for lists
      - Use tables with | column | column | format where appropriate
      - Use **bold** and *italic* for emphasis
      - Include realistic metrics with rupee (₹) values
      - Make it 70 words around
      Focus on the following:
      
      1. For Emissions Report: Include scope 1, 2, and 3 emissions, total tCO2e, comparison to previous period, and suggestion for reduction.
      2. For Carbon Credits Report: Include blockchain transaction details, tokens purchased/sold/retired, current holdings, and market value in rupees.
      3. For Savings Report: Include cost savings from efficiency measures in rupees, ROI on sustainability initiatives, and projected future savings.
      4. For Compliance Report: Include compliance with Indian environmental regulations, BIS standards, and industry-specific requirements.
      
      Make it realistic but fictional, with detailed tables and metrics.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setGeneratedReport(text);
      setReportType(reportType);
    } catch (error) {
      console.error("Error generating report:", error);
      setGeneratedReport("Error generating report. Please try again.");
    } finally {
      setGeneratingReport(false);
    }
  };
  
  const handleGenerateReport = () => {
    if (!selectedReport || !dateRange.startDate || !dateRange.endDate) {
      alert('Please select a report type and date range');
      return;
    }
    
    const reportTypeName = reportTypes.find(r => r.id === selectedReport)?.name || selectedReport;
    generateReport(reportTypeName, dateRange.startDate, dateRange.endDate);
  };
  
  const handleViewPreviousReport = (report) => {
    setReportType(report.type);
    generateReport(
      report.name, 
      report.date, 
      new Date(new Date(report.date).getTime() + 90*24*60*60*1000).toISOString().split('T')[0]
    );
  };

  const getReportTypeIcon = (type) => {
    switch(type) {
      case 'emissions':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case 'credits':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'savings':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      case 'compliance':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <DocumentTextIcon className="h-6 w-6 text-gray-600" />
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Reports</h1>
        <p className="text-gray-600">Generate and view reports about your emissions and blockchain carbon credits</p>
      </div>
      
      {generatedReport ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center">
              {getReportTypeIcon(reportType)}
              <h2 className="text-lg font-semibold text-[#14281D] ml-3">
                Generated Report
              </h2>
            </div>
            <button 
              onClick={() => setGeneratedReport(null)}
              className="text-sm text-gray-500 hover:text-[#14281D]"
            >
              Close Report
            </button>
          </div>
          <div className="p-6 overflow-auto max-h-[800px]">
            <div className="prose prose-green max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-[#14281D] mt-4 mb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-[#14281D] mt-3 mb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-[#14281D] mt-2 mb-1" {...props} />,
                  p: ({node, ...props}) => <p className="text-gray-700 mb-3" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1 text-gray-700" {...props} />,
                  table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full border border-gray-200 rounded" {...props} /></div>,
                  thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
                  tbody: ({node, ...props}) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
                  tr: ({node, ...props}) => <tr className="hover:bg-gray-50" {...props} />,
                  th: ({node, ...props}) => <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
                  td: ({node, ...props}) => <td className="px-4 py-2 text-sm text-gray-700" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-[#14281D]" {...props} />,
                  em: ({node, ...props}) => <em className="text-gray-800 italic" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#588157] pl-4 py-2 italic text-gray-700 my-3" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-4 border-t border-gray-300" {...props} />,
                  a: ({node, ...props}) => <a className="text-[#588157] hover:text-[#3a5a40] underline" {...props} />,
                  code: ({node, inline, ...props}) => (
                    inline 
                      ? <code className="bg-gray-100 px-1 py-0.5 rounded text-[#14281D] font-mono text-sm" {...props} />
                      : <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-3 font-mono text-sm text-[#14281D]"><code {...props} /></pre>
                  )
                }}
              >
                {generatedReport}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <>
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
                  disabled={generatingReport}
                  className={`px-4 py-2 bg-[#14281D] text-white font-medium rounded-md hover:bg-[#3a5a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#588157] transition-colors ${generatingReport ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {generatingReport ? 'Generating...' : 'Generate Report'}
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
                          <button 
                            onClick={() => handleViewPreviousReport(report)}
                            className="inline-flex items-center px-3 py-1 bg-[#588157] text-white rounded-md text-sm hover:bg-[#3a5a40] transition-colors"
                          >
                            View Report
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
                  <h3 className="text-md font-medium text-gray-800">Monthly Blockchain Carbon Credits Report</h3>
                  <p className="text-sm text-gray-500">Generated on the 1st of each month</p>
                </div>
                <div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 flex items-center justify-between mt-4">
                <div>
                  <h3 className="text-md font-medium text-gray-800">Quarterly Compliance Report</h3>
                  <p className="text-sm text-gray-500">Generated for BIS and environmental standards</p>
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
        </>
      )}
    </div>
  );
};

export default Reports;