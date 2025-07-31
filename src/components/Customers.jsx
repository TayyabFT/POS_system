"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

import {
  FiPieChart,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiShoppingCart,
  FiSettings,
  FiPackage,
  FiBox,
  FiShoppingBag,
  FiClipboard,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiSearch,
  FiChevronDown,
  FiCalendar,
  FiRefreshCw,
  FiPlus,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiMapPin
} from "react-icons/fi";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  ResponsiveContainer 
} from "recharts";

const CustomersPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 w-64 bg-white text-gray-800 h-full transition-all duration-300 ${isMobileMenuOpen ? 'left-0' : '-left-64 md:left-0'} shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="text-2xl font-bold flex items-center text-blue-600">
            <FiShoppingCart className="mr-2" /> Flow POS
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          <div onClick={() => router.push('/dashboard')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiPieChart className="w-5 h-5" /> <span>Dashboard</span>
          </div>
          <div onClick={() => router.push('/products')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiPackage className="w-5 h-5" /> <span>Products</span>
          </div>
          <div onClick={() => router.push('/sales')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiShoppingBag className="w-5 h-5" /> <span>Sales</span>
          </div>
          <div onClick={() => router.push('/invoice')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiClipboard className="w-5 h-5" /> <span>Invoices</span>
          </div>
          <div onClick={() => router.push('/reports')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiBarChart2 className="w-5 h-5" /> <span>Reports</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-100 text-blue-600 font-semibold">
            <FiUsers className="w-5 h-5" /> <span>Customers</span>
          </div>
          <div onClick={() => router.push('/settings')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiSettings className="w-5 h-5" /> <span>Settings</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-100 text-red-500 hover:text-red-700 cursor-pointer transition-colors">
              <FiLogOut className="w-5 h-5" /> <span>Logout</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Customers</h1>
            <p className="text-gray-600">Manage and analyze your customer database.</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 relative">
              <FiBell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FiUser className="w-4 h-4" />
              </div>
              <span className="hidden md:inline text-gray-700">Admin</span>
              <FiChevronDown className="hidden md:inline text-gray-500" />
            </div>
          </div>
        </header>

        {/* Customer Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "all" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              All Customers
            </button>
            <button 
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "active" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab("inactive")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "inactive" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Inactive
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 bg-white px-3 py-2 rounded-lg shadow-sm text-gray-600 hover:bg-gray-50">
              <FiFilter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
            <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow-sm">
              <FiPlus className="w-4 h-4" />
              <span className="text-sm">Add Customer</span>
            </button>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
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
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
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
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
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
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
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
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
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
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Customer Segments</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-blue-50 text-blue-600 font-medium">
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
      </main>
    </div>
  );
};

export default CustomersPage;