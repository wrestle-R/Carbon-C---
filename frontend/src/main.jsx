import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from '../Context/UserContext';
import { CompanyProvider } from '../Context/CompanyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CompanyProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CompanyProvider>
  </React.StrictMode>,
);