import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth';


const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export const loginCompany = async (credentials) => {
    try {
      console.log('Making login request:', credentials);
      const response = await axiosInstance.post('/login', credentials);
      
      if (!response.data.token) {
        throw new Error('No token received from server');
      }
      
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      throw error.response?.data?.error || 'Login failed';
    }
  };
  
  export const registerCompany = async (companyData) => {
    try {
      console.log('Making registration request:', companyData);
      const response = await axiosInstance.post('/register', companyData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      throw error.response?.data?.error || 'Registration failed';
    }
  };