import axios from 'axios';

// Constants
const API_URL = 'http://localhost:5000/api/auth';
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Company Auth Functions
const loginCompany = async (credentials) => {
  try {
    console.log('Making login request:', credentials);
    const response = await axiosInstance.post('/login', credentials);
    
    if (!response.data.token) {
      throw new Error('No token received from server');
    }
    
    console.log('Login response:', response.data);
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
    throw error.response?.data?.error || 'Login failed';
  }
};

const registerCompany = async (companyData) => {
  try {
    console.log('Making registration request:', companyData);
    const response = await axiosInstance.post('/register', companyData);
    console.log('Registration response:', response.data);
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error);
    throw error.response?.data?.error || 'Registration failed';
  }
};

// User Auth Functions
const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/users/login', credentials);
    
    if (!response.data.token) {
      throw new Error('No token received from server');
    }
    
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('User login error:', error.response?.data || error);
    throw error.response?.data?.error || 'Login failed';
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('User registration error:', error.response?.data || error);
    throw error.response?.data?.error || 'Registration failed';
  }
};

// Profile Management
const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await axiosInstance.get('/profile');
    return response.data.profile;
  } catch (error) {
    console.error('Get profile error:', error.response?.data || error);
    throw error.response?.data?.error || 'Failed to fetch profile';
  }
};

const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await axiosInstance.patch('/profile', profileData);
    return response.data.profile;
  } catch (error) {
    console.error('Update profile error:', error.response?.data || error);
    throw error.response?.data?.error || 'Failed to update profile';
  }
};

const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await axiosInstance.post('/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Change password error:', error.response?.data || error);
    throw error.response?.data?.error || 'Failed to change password';
  }
};

// Token Verification
const verifyToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    setAuthToken(token);
    const response = await axiosInstance.get('/verify-token');
    
    // Update token if a new one was issued
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
    }
    
    return response.data.valid;
  } catch (error) {
    console.error('Token verification error:', error);
    localStorage.removeItem('token');
    setAuthToken(null);
    return false;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

// Exports
export {
  loginCompany,
  registerCompany,
  loginUser,
  registerUser,
  getUserProfile,
  updateProfile,
  changePassword,
  verifyToken,
  logout,
  setAuthToken
};