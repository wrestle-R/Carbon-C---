import React, { useState } from 'react';
import { FaWallet, FaHistory, FaExchangeAlt, FaArchive } from 'react-icons/fa';

const Credits = () => {
  const [walletAddress, setWalletAddress] = useState('0x7a86c0b064171007716bbd6af96676935799a63e');
  
  const availableCredits = [
    { id: 1, name: "Clean Energy Portfolio", price: 1850, location: "Pan-India", type: "Renewable Energy", verified: "TERI" },
    { id: 2, name: "Himalayan Forest Conservation", price: 2250, location: "Uttarakhand", type: "Forestry", verified: "Gold Standard" },
    { id: 3, name: "Solar Village Initiative", price: 1650, location: "Tamil Nadu", type: "Renewable Energy", verified: "BEE" },
    { id: 4, name: "Ganges Methane Capture", price: 1350, location: "Uttar Pradesh", type: "Industrial", verified: "CPCB" },
    { id: 5, name: "Rajasthan Wind Farm", price: 1950, location: "Rajasthan", type: "Renewable Energy", verified: "IREDA" }
  ];

  const ownedCredits = [
    { id: 101, name: "Himalayan Forest Conservation", quantity: 50, purchaseDate: "2025-02-15", tokenId: "0x7d2c..9f1a", status: "Active", hash: "0x8a72c...6b21" },
    { id: 102, name: "Solar Village Initiative", quantity: 25, purchaseDate: "2025-03-12", tokenId: "0x3e6f..8c2d", status: "Active", hash: "0x45d7b...3f9c" },
    { id: 103, name: "Rajasthan Wind Farm", quantity: 30, purchaseDate: "2025-01-05", tokenId: "0x2a9b..7d4e", status: "Active", hash: "0x19a3c...5e7d" }
  ];

  const transactions = [
    { id: 1001, type: "Purchase", project: "Himalayan Forest Conservation", quantity: 50, amount: 112500, date: "2025-02-15", hash: "0x8a72c...6b21" },
    { id: 1002, type: "Purchase", project: "Solar Village Initiative", quantity: 25, amount: 41250, date: "2025-03-12", hash: "0x45d7b...3f9c" },
    { id: 1003, type: "Purchase", project: "Rajasthan Wind Farm", quantity: 30, amount: 58500, date: "2025-01-05", hash: "0x19a3c...5e7d" },
    { id: 1004, type: "Retirement", project: "Solar Village Initiative", quantity: 5, amount: 0, date: "2025-03-25", hash: "0x67d8b...9a4c" },
    { id: 1005, type: "Minting", project: "Carbon Credit Generation", quantity: 10, amount: 0, date: "2025-04-01", hash: "0x34a2c...7b6d" }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Carbon Credits Wallet</h1>
        <p className="text-gray-600">Manage your decentralized carbon credits on our blockchain platform</p>
      </div>
      
      {/* Wallet Info */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-3 rounded-full bg-[#14281D] mr-4">
              <FaWallet className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Wallet Address</h2>
              <p className="font-mono text-xs md:text-sm text-[#14281D] bg-gray-100 p-2 rounded">{walletAddress}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-[#14281D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#3a5a40] transition-colors flex items-center">
              <FaExchangeAlt className="mr-2" /> Swap Credits
            </button>
            <button className="border border-[#14281D] text-[#14281D] px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
              Connect Different Wallet
            </button>
          </div>
        </div>
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
                <p className="text-2xl font-semibold text-gray-900">105 <span className="text-sm font-normal">tokens</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Market Value</div>
                <div className="text-sm font-medium text-gray-700">₹212,250</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#588157] bg-opacity-10 p-3 rounded-md">
                <FaArchive className="h-5 w-5 text-[#588157]" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Retired Credits</h2>
                <p className="text-2xl font-semibold text-gray-900">5 <span className="text-sm font-normal">tokens</span></p>
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
                <p className="text-2xl font-semibold text-gray-900">₹50,000 <span className="text-sm font-normal">remaining</span></p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Budget Used</div>
                <div className="text-sm font-medium text-gray-700">₹0 this month</div>
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
          <h2 className="text-lg font-semibold text-[#14281D]">Available Carbon Credits Marketplace</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified By</th>
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
                      <div className="text-sm text-gray-500">{credit.verified}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{credit.price}/token</div>
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
          <h2 className="text-lg font-semibold text-[#14281D]">My Carbon Credit Tokens</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                      <div className="text-sm text-gray-500 font-mono">{credit.tokenId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {credit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="bg-[#588157] text-white px-3 py-1 rounded-md text-sm hover:bg-[#3a5a40] transition-colors">Retire</button>
                        <button className="border border-[#14281D] text-[#14281D] px-3 py-1 rounded-md text-sm hover:bg-gray-50 transition-colors">Sell</button>
                      </div>
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
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#14281D]">Blockchain Transaction History</h2>
          <div className="text-sm text-gray-500">
            <a href="#" className="flex items-center text-[#14281D] hover:underline">
              <FaHistory className="mr-1" /> View on Explorer
            </a>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TX Hash</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === "Purchase" 
                          ? "bg-blue-100 text-blue-800" 
                          : transaction.type === "Retirement"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
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
                      <div className="text-sm text-gray-900">
                        {transaction.amount > 0 ? `₹${transaction.amount}` : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-blue-600 font-mono hover:underline cursor-pointer">
                        {transaction.hash}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mint New Credits Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-[#14281D]">Mint New Carbon Credits</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">As a verified carbon offset project owner or authority, you can mint new carbon credit tokens.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#14281D] focus:border-[#14281D]">
                <option>Renewable Energy</option>
                <option>Forestry</option>
                <option>Energy Efficiency</option>
                <option>Waste Management</option>
                <option>Sustainable Agriculture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (tCO2e)</label>
              <input type="number" min="1" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#14281D] focus:border-[#14281D]" placeholder="Enter quantity" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Document</label>
            <input type="file" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mt-6">
            <button className="bg-[#14281D] text-white px-6 py-2 rounded-md hover:bg-[#3a5a40] transition-colors">Submit for Verification</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;