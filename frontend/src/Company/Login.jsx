import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginCompany } from '../../Api/Auth';
import { useCompany } from '../../context/CompanyContext';

const Login = () => {
  const navigate = useNavigate();
  const { setCompany, setToken } = useCompany();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      console.log('Attempting login with:', formData);
      const data = await loginCompany(formData);
      console.log('Login successful:', data);
      
      // Store data in context and localStorage
      setToken(data.token);
      setCompany(data.company);
      localStorage.setItem('token', data.token);
      localStorage.setItem('company', JSON.stringify(data.company));
      
      console.log('Navigating to dashboard...');
      navigate('/company/dashboard', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(typeof err === 'string' ? err : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffcdc] to-[#fffcdc] bg-opacity-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#14281D]">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in to your company account
          </p>
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
                Email address
              </label>
              <input
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#14281D] focus:border-[#14281D] sm:text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#14281D] focus:border-[#14281D] sm:text-sm"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#14281D] focus:ring-[#14281D] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-[#14281D] hover:text-[#3a5a40]">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-[#14281D] hover:bg-[#3a5a40]'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/company/register" className="font-medium text-[#14281D] hover:text-[#3a5a40]">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;