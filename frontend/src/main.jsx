import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CompanyProvider } from '../context/CompanyContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CompanyProvider>
      <App />
    </CompanyProvider>
  </StrictMode>,
)