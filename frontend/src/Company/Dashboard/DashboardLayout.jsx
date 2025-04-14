import React, { useState } from 'react';
import { useCompany } from '../../../context/CompanyContext';
import { 
  HomeIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  CreditCardIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

import Overview from './Tabs/Overview';
import Charts from './Tabs/Charts';
import Reports from './Tabs/Reports';
import Credits from './Tabs/Credits';
import EmissionsForm from './Tabs/EmissionsForm';
import CarbonCalculator from './Tabs/CarbonCalculator';

const tabs = [
  { name: 'Overview', icon: HomeIcon, component: Overview },
  { name: 'Analytics', icon: ChartBarIcon, component: Charts },
  { name: 'Emissions Entry', icon: ClipboardDocumentListIcon, component: EmissionsForm },
  { name: 'Carbon Calculator', icon: CalculatorIcon, component: CarbonCalculator },
  { name: 'Carbon Credits', icon: CreditCardIcon, component: Credits },
  { name: 'Reports', icon: DocumentTextIcon, component: Reports },
];

const DashboardLayout = () => {
  const { company } = useCompany();
  const [activeTab, setActiveTab] = useState('Overview');

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component;
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-[#14281D]">{company?.companyName || 'Dashboard'}</h2>
        </div>
        <nav className="mt-4">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`w-full flex items-center px-4 py-3 text-left ${
                activeTab === name 
                  ? 'bg-green-50 text-[#14281D] border-r-4 border-[#14281D]' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;