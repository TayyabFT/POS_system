"use client";

import { useState } from "react";
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
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer 
} from "recharts";

const DashboardPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  const salesData = [
    { month: "Feb", sales: 2400, purchases: 1400 },
    { month: "Mar", sales: 3800, purchases: 2000 },
    { month: "Apr", sales: 2200, purchases: 1800 },
    { month: "May", sales: 3400, purchases: 2900 },
    { month: "Jun", sales: 3000, purchases: 2500 },
    { month: "Jul", sales: 3200, purchases: 2700 },
  ];

  const pieData = [
    { name: "iOS", value: 400 },
    { name: "MacBook", value: 300 },
    { name: "Smart TV", value: 300 },
    { name: "Tesla Model S", value: 200 },
    { name: "Google Pixel", value: 100 },
  ];

  const recentTransactions = [
    { id: 1, customer: "John Doe", amount: 249.99, status: "completed", date: "2023-07-15" },
    { id: 2, customer: "Sarah Smith", amount: 129.99, status: "pending", date: "2023-07-14" },
    { id: 3, customer: "Michael Johnson", amount: 89.99, status: "completed", date: "2023-07-14" },
    { id: 4, customer: "Emily Wilson", amount: 199.99, status: "failed", date: "2023-07-13" },
    { id: 5, customer: "David Brown", amount: 59.99, status: "completed", date: "2023-07-12" },
  ];

  const COLORS = ["#3B82F6", "#6366F1", "#10B981", "#F59E0B", "#EF4444"];

  const statusStyles = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800"
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 w-64 bg-white text-black h-full transition-all duration-300 ${isMobileMenuOpen ? 'left-0' : '-left-64 md:left-0'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="text-2xl font-bold flex items-center text-blue-400">
            <FiShoppingCart className="mr-2" /> Flow POS
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-400 text-white font-semibold">
            <FiPieChart className="w-5 h-5" /> <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-colors">
            <FiPackage className="w-5 h-5" /> <span>Products</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-colors">
            <FiShoppingBag className="w-5 h-5" /> <span>Sales</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-colors">
            <FiClipboard className="w-5 h-5" /> <span>Invoices</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-colors">
            <FiBarChart2 className="w-5 h-5" /> <span>Reports</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-colors">
            <FiUsers className="w-5 h-5" /> <span>Customers</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 cursor-pointer transition-colors">
            <FiSettings className="w-5 h-5" /> <span>Settings</span>
          </div>
          <div className="border-t border-gray-800 pt-2 mt-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-red-400 hover:text-red-300 cursor-pointer transition-colors">
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100">
              <FiBell className="w-5 h-5 text-gray-600" />
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

        {/* Date Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setActiveTab("today")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "today" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Today
            </button>
            <button 
              onClick={() => setActiveTab("week")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "week" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              This Week
            </button>
            <button 
              onClick={() => setActiveTab("month")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "month" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              This Month
            </button>
          </div>
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
            <FiCalendar className="text-gray-500" />
            <span className="text-sm text-gray-700">Jul 15, 2023</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold mt-1">$12,345</p>
                <p className="text-sm text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 12.5% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FiDollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Expense</p>
                <p className="text-2xl font-bold mt-1">$3,213</p>
                <p className="text-sm text-red-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 5.3% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <FiBox className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Sent</p>
                <p className="text-2xl font-bold mt-1">$65,920</p>
                <p className="text-sm text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 8.1% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <FiTrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Received</p>
                <p className="text-2xl font-bold mt-1">$72,840</p>
                <p className="text-sm text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 15.7% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <FiShoppingCart className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Sales & Purchases</h2>
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <FiRefreshCw className="mr-1 w-4 h-4" /> Refresh
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
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
                  <Bar 
                    dataKey="sales" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]} 
                    name="Sales"
                  />
                  <Bar 
                    dataKey="purchases" 
                    fill="#6366F1" 
                    radius={[4, 4, 0, 0]} 
                    name="Purchases"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Top Selling Products</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Sales']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View All Transactions
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[transaction.status]}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;