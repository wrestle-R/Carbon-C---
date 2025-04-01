import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TypewriterEffect = ({ phrases }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        if (currentChar > 0) {
          setDisplayText(phrases[currentPhrase].substring(0, currentChar - 1));
          setCurrentChar(currentChar - 1);
        } else {
          setIsDeleting(false);
          setCurrentPhrase((currentPhrase + 1) % phrases.length);
        }
      } else {
        if (currentChar < phrases[currentPhrase].length) {
          setDisplayText(phrases[currentPhrase].substring(0, currentChar + 1));
          setCurrentChar(currentChar + 1);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [currentChar, currentPhrase, isDeleting, phrases]);

  return <span className="text-5xl font-bold text-[#fffcdc]">{displayText}</span>;
};

const Home = () => {
  const phrases = ["Carbon--", "C--"];
  
  // Data for emissions line chart
  const emissionsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Your Carbon Emissions (tons)',
        data: [12, 19, 8, 7, 6, 5],
        borderColor: '#fffcdc',
        backgroundColor: 'rgba(255, 252, 220, 0.2)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Industry Average',
        data: [15, 17, 14, 13, 12, 11],
        borderColor: '#14281D',
        backgroundColor: 'rgba(20, 40, 29, 0.2)',
        tension: 0.3,
        borderDash: [5, 5],
        fill: true
      }
    ]
  };

  // Data for sources pie chart
  const sourcesData = {
    labels: ['Energy', 'Transport', 'Waste', 'Water', 'Materials'],
    datasets: [
      {
        data: [35, 25, 15, 10, 15],
        backgroundColor: [
          '#fffcdc',
          '#14281D',
          '#3a5a40',
          '#588157',
          '#a3b18a'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#fffcdc]">
      {/* Navigation Bar */}
      <nav className="bg-[#14281D] text-[#fffcdc] p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-[#fffcdc] flex items-center justify-center">
              <span className="text-[#14281D] font-bold text-xl">C</span>
            </div>
            <span className="font-bold text-xl">Carbon--</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-white transition duration-300 font-medium">Home</a>
            <a href="#" className="hover:text-white transition duration-300 font-medium">Solutions</a>
            <a href="#" className="hover:text-white transition duration-300 font-medium">Resources</a>
            <a href="#" className="hover:text-white transition duration-300 font-medium">About</a>
            <a href="#" className="hover:text-white transition duration-300 font-medium">Contact</a>
          </div>

          <div className="flex space-x-4">
            <Link to="/company/login" className="bg-[#fffcdc] text-[#14281D] px-6 py-2 rounded-full font-medium hover:bg-white transition duration-300">
              Login
            </Link>
            <Link to="/company/signup" className="bg-transparent border-2 border-[#fffcdc] text-[#fffcdc] px-6 py-2 rounded-full font-medium hover:bg-[#fffcdc] hover:text-[#14281D] transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#14281D] text-[#fffcdc] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="h-16 mb-4">
                <TypewriterEffect phrases={phrases} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Intelligent Carbon Footprint Management for Sustainable Businesses
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-lg">
                Our AI-powered platform helps you measure, analyze, and reduce your environmental impact while improving operational efficiency.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/company/signup"
                  className="bg-[#fffcdc] text-[#14281D] px-8 py-3 rounded-full font-bold hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-105 text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/demo"
                  className="border-2 border-[#fffcdc] text-[#fffcdc] px-8 py-3 rounded-full font-bold hover:bg-[#fffcdc] hover:text-[#14281D] transition-all duration-300 text-center"
                >
                  Request Demo
                </Link>
              </div>
              <div className="mt-6 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-10 h-10 rounded-full bg-[#fffcdc] border-2 border-[#14281D]"></div>
                  ))}
                </div>
                <div className="text-sm">
                  <p>Trusted by 5,000+ sustainability leaders</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-lg bg-[#fffcdc] bg-opacity-20 rounded-xl shadow-2xl overflow-hidden border border-[#fffcdc] border-opacity-30 backdrop-blur-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Your Carbon Dashboard</h3>
                  <div className="h-64">
                    <Line 
                      data={emissionsData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: {
                              color: '#fffcdc'
                            }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: 'rgba(255, 252, 220, 0.1)'
                            },
                            ticks: {
                              color: '#fffcdc'
                            }
                          },
                          x: {
                            grid: {
                              color: 'rgba(255, 252, 220, 0.1)'
                            },
                            ticks: {
                              color: '#fffcdc'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm">
                      <p className="font-medium">Last 6 months reduction</p>
                      <p className="text-green-300">↓ 58% improvement</p>
                    </div>
                    <button className="text-[#14281D] bg-[#fffcdc] px-4 py-2 rounded-lg text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Cloud */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-gray-600">TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {['Tesla', 'Patagonia', 'Unilever', 'Microsoft', 'IKEA'].map((company) => (
            <div key={company} className="flex justify-center">
              <div className="h-12 w-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-bold">
                {company}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#14281D] mb-4">Comprehensive Carbon Management</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            End-to-end solutions to measure, reduce, and report your environmental impact with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 border-t-4 border-[#14281D] hover:shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#14281D] bg-opacity-10 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#14281D] mb-4">Real-time Monitoring</h3>
            <p className="text-gray-600 mb-6">
              Continuous tracking of emissions across all operations with automated data collection from IoT devices and enterprise systems.
            </p>
            <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-full px-4">
                <div className="h-2 bg-gray-300 rounded-full mb-2">
                  <div className="h-2 bg-[#14281D] rounded-full w-3/4"></div>
                </div>
                <div className="h-2 bg-gray-300 rounded-full mb-2">
                  <div className="h-2 bg-[#14281D] rounded-full w-1/2"></div>
                </div>
                <div className="h-2 bg-gray-300 rounded-full">
                  <div className="h-2 bg-[#14281D] rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
            <a href="#" className="text-[#14281D] font-semibold hover:underline inline-flex items-center">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 border-t-4 border-[#14281D] hover:shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#14281D] bg-opacity-10 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#14281D] mb-4">Carbon Offset Marketplace</h3>
            <p className="text-gray-600 mb-6">
              Access verified carbon offset projects worldwide with transparent pricing and blockchain-based tracking.
            </p>
            <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-32 h-32">
                <Pie 
                  data={sourcesData}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          usePointStyle: true,
                          padding: 20
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <a href="#" className="text-[#14281D] font-semibold hover:underline inline-flex items-center">
              Explore projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 border-t-4 border-[#14281D] hover:shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#14281D] bg-opacity-10 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#14281D] mb-4">AI-Powered Recommendations</h3>
            <p className="text-gray-600 mb-6">
              Get personalized reduction strategies powered by machine learning analyzing your operational data.
            </p>
            <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center p-4">
              <div className="w-full space-y-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#14281D] flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Switch to renewable energy providers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#14281D] flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Optimize logistics routes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#14281D] flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Implement waste reduction program</span>
                </div>
              </div>
            </div>
            <a href="#" className="text-[#14281D] font-semibold hover:underline inline-flex items-center">
              View suggestions
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div className="bg-[#14281D] text-[#fffcdc] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">Advanced Sustainability Analytics</h2>
              <p className="text-xl mb-8 opacity-90">
                Dive deep into your environmental data with our powerful analytics platform that helps you identify reduction opportunities and track progress against goals.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#fffcdc] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Customizable Dashboards</p>
                    <p className="opacity-80">Create tailored views for different stakeholders and departments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#fffcdc] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Scenario Modeling</p>
                    <p className="opacity-80">Test different reduction strategies before implementation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#fffcdc] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Regulatory Compliance</p>
                    <p className="opacity-80">Automated reporting for all major sustainability frameworks</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white bg-opacity-10 p-8 rounded-xl border border-[#fffcdc] border-opacity-20 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Emissions Forecast</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-[#fffcdc] bg-opacity-10 rounded-lg text-sm">1Y</button>
                    <button className="px-3 py-1 bg-[#fffcdc] text-[#14281D] rounded-lg text-sm">3Y</button>
                    <button className="px-3 py-1 bg-[#fffcdc] bg-opacity-10 rounded-lg text-sm">5Y</button>
                  </div>
                </div>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: ['2023', '2024', '2025', '2026', '2027'],
                      datasets: [
                        {
                          label: 'Business as Usual',
                          data: [100, 110, 121, 133, 146],
                          borderColor: '#fffcdc',
                          backgroundColor: 'rgba(255, 252, 220, 0.1)',
                          borderDash: [5, 5],
                          tension: 0.4
                        },
                        {
                          label: 'With Reduction Strategies',
                          data: [100, 90, 81, 73, 66],
                          borderColor: '#a3b18a',
                          backgroundColor: 'rgba(163, 177, 138, 0.1)',
                          tension: 0.4
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: '#fffcdc'
                          }
                        },
                        tooltip: {
                          mode: 'index',
                          intersect: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: false,
                          grid: {
                            color: 'rgba(255, 252, 220, 0.1)'
                          },
                          ticks: {
                            color: '#fffcdc'
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(255, 252, 220, 0.1)'
                          },
                          ticks: {
                            color: '#fffcdc'
                          }
                        }
                      }
                    }}
                  />
                </div>
                <div className="mt-4 text-sm opacity-80">
                  <p>Implementing recommended strategies could reduce your emissions by 55% over 5 years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#14281D] mb-4">Trusted by Sustainability Leaders</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Companies across industries are achieving their sustainability goals with our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              title: "Sustainability Director, TechCorp",
              quote: "Carbon-- helped us reduce emissions by 42% in just 18 months while saving $1.2M in operational costs.",
              avatar: "SJ"
            },
            {
              name: "Michael Chen",
              title: "COO, GreenRetail",
              quote: "The AI recommendations identified savings opportunities we never would have found on our own.",
              avatar: "MC"
            },
            {
              name: "Elena Rodriguez",
              title: "VP Operations, EcoManufacturing",
              quote: "Finally, a carbon management platform that integrates seamlessly with our ERP and provides actionable insights.",
              avatar: "ER"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#14281D] flex items-center justify-center text-[#fffcdc] font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-[#14281D] to-[#3a5a40] rounded-2xl p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fffcdc" d="M45.5,-47.1C58.5,-33.4,68.2,-16.7,67.4,-0.9C66.6,14.9,55.3,29.8,42.3,42.5C29.3,55.2,14.7,65.7,-1.3,67C-17.3,68.3,-34.6,60.4,-47.4,47.7C-60.2,35,-68.5,17.5,-68.2,0.3C-67.9,-16.9,-59,-33.8,-46.2,-47.5C-33.4,-61.2,-16.7,-71.7,0.4,-72.1C17.5,-72.5,35,-62.8,45.5,-47.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-[#fffcdc] mb-4">Ready to Transform Your Sustainability Strategy?</h2>
            <p className="text-xl text-[#fffcdc] opacity-90 mb-8 max-w-2xl mx-auto">
              Join the growing community of businesses committed to measurable environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/company/signup"
                className="bg-[#fffcdc] text-[#14281D] px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Start Your Free Trial
              </Link>
              <Link
                to="/demo"
                className="bg-transparent border-2 border-[#fffcdc] text-[#fffcdc] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#fffcdc] hover:text-[#14281D] transition-all duration-300"
              >
                Schedule a Demo
              </Link>
            </div>
            <p className="mt-6 text-[#fffcdc] opacity-80 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#14281D] text-[#fffcdc] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#fffcdc] flex items-center justify-center">
                  <span className="text-[#14281D] font-bold text-xl">C</span>
                </div>
                <span className="font-bold text-xl">Carbon--</span>
              </div>
              <p className="text-sm opacity-80 mb-4">
                The most comprehensive carbon management platform for forward-thinking businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="opacity-80 hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="opacity-80 hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
                <a href="#" className="opacity-80 hover:opacity-100">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Features</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Pricing</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">API</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Integrations</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Documentation</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Guides</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Blog</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Case Studies</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Webinars</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">About</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Careers</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Press</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Partners</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Privacy</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Terms</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Security</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Compliance</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#fffcdc] border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 md:mb-0">
              © 2023 Carbon--. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-white">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;