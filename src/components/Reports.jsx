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
  FiDownload,
  FiFilter
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
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const ReportsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [activeReport, setActiveReport] = useState("sales");
  const router = useRouter();
  
  const salesData = [
    { month: "Feb", sales: 2400, profit: 1400 },
    { month: "Mar", sales: 3800, profit: 2000 },
    { month: "Apr", sales: 2200, profit: 1800 },
    { month: "May", sales: 3400, profit: 2900 },
    { month: "Jun", sales: 3000, profit: 2500 },
    { month: "Jul", sales: 3200, profit: 2700 },
  ];

  const categoryData = [
    { name: "Electronics", value: 4000 },
    { name: "Clothing", value: 3000 },
    { name: "Food", value: 2000 },
    { name: "Books", value: 1500 },
    { name: "Toys", value: 1000 },
  ];

  const COLORS = ["#3B82F6", "#6366F1", "#10B981", "#F59E0B", "#EF4444"];

  const dailySalesData = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1900 },
    { day: "Wed", sales: 1500 },
    { day: "Thu", sales: 2200 },
    { day: "Fri", sales: 2500 },
    { day: "Sat", sales: 1800 },
    { day: "Sun", sales: 1400 },
  ];

  const topSellingProducts = [
    { id: 1, name: "iPhone 13 Pro", sales: 245, revenue: 294000, growth: 12.5 },
    { id: 2, name: "MacBook Air M1", sales: 187, revenue: 224400, growth: 8.3 },
    { id: 3, name: "Samsung Smart TV", sales: 134, revenue: 120600, growth: 5.7 },
    { id: 4, name: "AirPods Pro", sales: 219, revenue: 43800, growth: 15.2 },
    { id: 5, name: "iPad Air", sales: 92, revenue: 55200, growth: -2.1 },
  ];

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
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-100 text-blue-600 font-semibold">
            <FiBarChart2 className="w-5 h-5" /> <span>Reports</span>
          </div>
          <div onClick={() => router.push('/customers')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports</h1>
            <p className="text-gray-600">Analyze your business performance with detailed reports.</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search reports..." 
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

        {/* Report Type Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 bg-white p-2 rounded-lg shadow-sm inline-block">
            <button 
              onClick={() => setActiveReport("sales")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeReport === "sales" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Sales Reports
            </button>
            <button 
              onClick={() => setActiveReport("inventory")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeReport === "inventory" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Inventory Reports
            </button>
            <button 
              onClick={() => setActiveReport("customer")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeReport === "customer" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Customer Reports
            </button>
            <button 
              onClick={() => setActiveReport("tax")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeReport === "tax" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Tax Reports
            </button>
          </div>
        </div>

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
            <button 
              onClick={() => setActiveTab("year")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "year" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              This Year
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <FiCalendar className="text-gray-500" />
              <span className="text-sm text-gray-700">Jul 15, 2023</span>
            </div>
            <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow-sm">
              <FiDownload className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold mt-1">$45,621</p>
                <p className="text-sm text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 12.5% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FiDollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Gross Profit</p>
                <p className="text-2xl font-bold mt-1">$28,345</p>
                <p className="text-sm text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 8.3% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <FiTrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold mt-1">1,254</p>
                <p className="text-sm text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 5.7% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <FiShoppingBag className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Order Value</p>
                <p className="text-2xl font-bold mt-1">$36.38</p>
                <p className="text-sm text-green-500 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" /> 3.2% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <FiBox className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Sales & Profit Trend</h2>
              <div className="flex items-center space-x-2">
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <FiFilter className="mr-1 w-4 h-4" /> Filter
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <FiRefreshCw className="mr-1 w-4 h-4" /> Refresh
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
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
                  <Area 
                    type="monotone"
                    dataKey="sales" 
                    fill="#3B82F6" 
                    stroke="#3B82F6"
                    fillOpacity={0.2}
                    name="Sales"
                  />
                  <Area 
                    type="monotone"
                    dataKey="profit" 
                    fill="#10B981" 
                    stroke="#10B981"
                    fillOpacity={0.2}
                    name="Profit"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Sales by Category</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View Details
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
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

        {/* Weekly Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Daily Sales This Week</h2>
            <button className="text-sm text-blue-500 hover:text-blue-700">
              View Weekly Report
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
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
                <Bar 
                  dataKey="sales" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  name="Sales"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Top Selling Products</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View All Products
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units Sold
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSellingProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sales} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth >= 0 ? <FiTrendingUp className="mr-1" /> : <FiTrendingUp className="mr-1 transform rotate-180" />}
                        {Math.abs(product.growth)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900">Details</a>
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

export default ReportsPage;