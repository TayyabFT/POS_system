"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  FiUsers,
  FiSearch,
  FiPlus,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiTrendingUp,
  FiDollarSign,
  FiX,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiRefreshCw
} from "react-icons/fi";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";

const CustomersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  
  const customerData = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1 234-567-8901", location: "New York, USA", totalSpent: 1245.50, lastPurchase: "2023-07-10", status: "active" },
    { id: 2, name: "Sarah Smith", email: "sarah.smith@example.com", phone: "+1 345-678-9012", location: "Los Angeles, USA", totalSpent: 890.25, lastPurchase: "2023-07-08", status: "active" },
    { id: 3, name: "Michael Johnson", email: "michael.j@example.com", phone: "+1 456-789-0123", location: "Chicago, USA", totalSpent: 2450.75, lastPurchase: "2023-07-15", status: "active" },
    { id: 4, name: "Emily Wilson", email: "emily.w@example.com", phone: "+1 567-890-1234", location: "Houston, USA", totalSpent: 675.30, lastPurchase: "2023-06-28", status: "inactive" },
    { id: 5, name: "David Brown", email: "david.b@example.com", phone: "+1 678-901-2345", location: "Miami, USA", totalSpent: 1890.45, lastPurchase: "2023-07-12", status: "active" },
    { id: 6, name: "Jennifer Lee", email: "jennifer.l@example.com", phone: "+1 789-012-3456", location: "Seattle, USA", totalSpent: 3200.10, lastPurchase: "2023-07-05", status: "active" },
    { id: 7, name: "Robert Garcia", email: "robert.g@example.com", phone: "+1 890-123-4567", location: "Boston, USA", totalSpent: 540.20, lastPurchase: "2023-06-20", status: "inactive" },
    { id: 8, name: "Lisa Martinez", email: "lisa.m@example.com", phone: "+1 901-234-5678", location: "Denver, USA", totalSpent: 1125.60, lastPurchase: "2023-07-01", status: "active" }
  ];

  const customerSpendingData = [
    { month: "Jan", spending: 2400 },
    { month: "Feb", spending: 1398 },
    { month: "Mar", spending: 9800 },
    { month: "Apr", spending: 3908 },
    { month: "May", spending: 4800 },
    { month: "Jun", spending: 3800 },
    { month: "Jul", spending: 4300 }
  ];

  const customerSegmentData = [
    { name: "New", value: 25 },
    { name: "Regular", value: 45 },
    { name: "VIP", value: 20 },
    { name: "Inactive", value: 10 }
  ];

  const statusStyles = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800"
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar tabname="customers" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar tabname="customers" />
        
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600">Manage and analyze your customer database.</p>
          </div>

          {/* Customer Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "all" ? "bg-black text-white" : "text-gray-600 hover:text-black"}`}
              >
                All Customers
              </button>
              <button 
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "active" ? "bg-black text-white" : "text-gray-600 hover:text-black"}`}
              >
                Active
              </button>
              <button 
                onClick={() => setActiveTab("inactive")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "inactive" ? "bg-black text-white" : "text-gray-600 hover:text-black"}`}
              >
                Inactive
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search customers..." 
                  className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              <button className="flex items-center space-x-1 bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition">
                <FiFilter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition">
                <FiPlus className="w-4 h-4" />
                <span className="text-sm">Add Customer</span>
              </button>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Customers</p>
                  <p className="text-2xl font-bold mt-1">1,254</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> 12.5% from last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <FiUsers className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Customers</p>
                  <p className="text-2xl font-bold mt-1">1,180</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> 8.3% from last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                  <FiUser className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">New Customers</p>
                  <p className="text-2xl font-bold mt-1">85</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> 15.7% from last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                  <FiPlus className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Spending</p>
                  <p className="text-2xl font-bold mt-1">$248.35</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> 5.2% from last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                  <FiDollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Customer Spending Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Customer Spending Trend</h2>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <FiRefreshCw className="mr-1 w-4 h-4" /> Refresh
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerSpendingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6b7280' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="spending" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Customer Spending"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Customer Segments */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Customer Segments</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Details
                </button>
              </div>
              <div className="space-y-4">
                {customerSegmentData.map((segment, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{segment.name}</span>
                      <span className="text-sm font-medium text-gray-700">{segment.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${segment.value}%`,
                          backgroundColor: index === 0 ? '#3B82F6' : 
                                          index === 1 ? '#10B981' : 
                                          index === 2 ? '#F59E0B' : '#6B7280'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer Retention</h3>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">78%</p>
                    <p className="text-xs text-gray-500">Retention Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-500">22%</p>
                    <p className="text-xs text-gray-500">Churn Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-500">65%</p>
                    <p className="text-xs text-gray-500">Repeat Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Customer List</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Showing 8 of 1,254 customers</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Purchase
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerData.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {customer.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">Customer ID: #{customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FiMail className="mr-1 text-gray-400" /> {customer.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiPhone className="mr-1 text-gray-400" /> {customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FiMapPin className="mr-1 text-gray-400" /> {customer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${customer.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.lastPurchase}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[customer.status]}`}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3 justify-end">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing page 1 of 157
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-black text-white font-medium">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomersPage;