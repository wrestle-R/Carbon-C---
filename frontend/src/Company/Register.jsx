import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerCompany } from '../../Api/Auth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    token: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
  
    setLoading(true);
    try {
      const { confirmPassword, ...registrationData } = formData;
      console.log('Sending registration data:', registrationData);
      await registerCompany(registrationData);
      console.log('Registration successful');
      navigate('/company/login', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      setError(typeof err === 'string' ? err : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionRequest = () => {
    window.location.href = 'mailto:admin@carbontrack.com?subject=Company Registration Permission Request&body=Hello, I would like to request permission to register my company on CarbonTrack.';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Register Your Company</h2>
          <p className="text-sm text-gray-600">Fill in the details below to create an account.</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Token
              </label>
              <input
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.token}
                onChange={(e) => setFormData({...formData, token: e.target.value})}
                placeholder="Enter your registration token"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <select
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              >
                <option value="">Select Industry</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="energy">Energy</option>
                <option value="transportation">Transportation</option>
                <option value="technology">Technology</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/company/login" className="font-medium text-green-600 hover:text-green-500">
                Sign in here
              </Link>
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">or</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePermissionRequest}
              className="text-sm text-blue-600 hover:text-blue-700 underline focus:outline-none"
            >
              Request Permission to Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;