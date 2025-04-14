import React from 'react';

const Credits = () => {
  const availableCredits = [
    { id: 1, name: "Clean Energy Portfolio", price: 25, location: "Global", type: "Renewable Energy" },
    { id: 2, name: "Forest Conservation", price: 30, location: "Brazil", type: "Forestry" },
    { id: 3, name: "Wind Farm Project", price: 22, location: "India", type: "Renewable Energy" },
    { id: 4, name: "Methane Capture", price: 18, location: "United States", type: "Industrial" },
    { id: 5, name: "Solar Array Initiative", price: 27, location: "Kenya", type: "Renewable Energy" }
  ];

  const ownedCredits = [
    { id: 101, name: "Forest Conservation", quantity: 50, purchaseDate: "2023-04-15", expiryDate: "2030-04-15", status: "Active" },
    { id: 102, name: "Wind Farm Project", quantity: 25, purchaseDate: "2023-06-22", expiryDate: "2030-06-22", status: "Active" },
    { id: 103, name: "Solar Array Initiative", quantity: 30, purchaseDate: "2023-02-10", expiryDate: "2030-02-10", status: "Active" }
  ];

  const transactions = [
    { id: 1001, type: "Purchase", project: "Forest Conservation", quantity: 50, amount: 1500, date: "2023-04-15" },
    { id: 1002, type: "Purchase", project: "Wind Farm Project", quantity: 25, amount: 550, date: "2023-06-22" },
    { id: 1003, type: "Purchase", project: "Solar Array Initiative", quantity: 30, amount: 810, date: "2023-02-10" },
    { id: 1004, type: "Retirement", project: "Wind Farm Project", quantity: 5, amount: 0, date: "2023-08-05" }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Carbon Credits</h1>
        <p className="text-gray-600">Manage your carbon offsets and credits</p>
      </div>
      
      {/* Credits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#14281D] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#14281D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Credits</h2>
                <p className="text-2xl font-semibold text-gray-900">105 <span className="text-sm font-normal">credits</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Market Value</div>
                <div className="text-sm font-medium text-gray-700">$2,860</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#588157] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#588157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Retired Credits</h2>
                <p className="text-2xl font-semibold text-gray-900">5 <span className="text-sm font-normal">credits</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Carbon Offset</div>
                <div className="text-sm font-medium text-gray-700">5 tCO2e</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Monthly Budget</h2>
                <p className="text-2xl font-semibold text-gray-900">$500 <span className="text-sm font-normal">remaining</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Budget Used</div>
                <div className="text-sm font-medium text-gray-700">$0 this month</div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Carbon Credits */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">Available Carbon Credits</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {availableCredits.map((credit) => (
                  <tr key={credit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{credit.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{credit.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{credit.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${credit.price}/credit</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="bg-[#14281D] text-white px-4 py-1 rounded-md text-sm hover:bg-[#3a5a40] transition-colors">Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* My Carbon Credits */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">My Carbon Credits</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ownedCredits.map((credit) => (
                  <tr key={credit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{credit.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{credit.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{credit.purchaseDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{credit.expiryDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {credit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="bg-[#588157] text-white px-4 py-1 rounded-md text-sm hover:bg-[#3a5a40] transition-colors">Retire</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">Transaction History</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === "Purchase" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.project}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;