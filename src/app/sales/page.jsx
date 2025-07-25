'use client';

import { useState, useEffect } from 'react';
import { getSales, addNewSale } from "@/services/addSale";
import {
  FiPieChart,
  FiEdit,
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
  FiPrinter,
  FiDownload,
  FiFilter,
  FiCreditCard,
  FiDollarSign as FiCash,
  FiQrCode,
  FiArrowUp,
  FiArrowDown,
  FiPlus,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { IoQrCodeSharp } from "react-icons/io5";
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
} from 'recharts';

const SalesPage = () => {
  // State management
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState('today');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    invoice_id: '',
    customer_name: '',
    total_items: 1,
    total_amount: 0,
    payment_method: 'card',
    status: 'Completed'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch sales data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getSales();
        setSalesData(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load sales data');
        setSalesData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sales overview data (could be fetched from server in a real app)
  const salesOverview = {
    totalToday: 2450.75,
    monthlySales: 18750.40,
    paymentBreakdown: {
      card: 1560.50,
      cash: 680.25,
      qr: 210.00
    },
    returns: 3,
    todayChange: 12.5,
    monthlyChange: 8.2
  };

  // Chart data (could be fetched from server in a real app)
  const salesTrendData = [
    { date: '01 Jul', sales: 1200 },
    { date: '02 Jul', sales: 1900 },
    { date: '03 Jul', sales: 1500 },
    { date: '04 Jul', sales: 2100 },
    { date: '05 Jul', sales: 1800 },
    { date: '06 Jul', sales: 2500 },
    { date: '07 Jul', sales: 2200 },
    { date: '08 Jul', sales: 1950 },
    { date: '09 Jul', sales: 2300 },
    { date: '10 Jul', sales: 2800 },
    { date: '11 Jul', sales: 2100 },
    { date: '12 Jul', sales: 2450 },
    { date: '13 Jul', sales: 2600 }
  ];

  const paymentTypeData = [
    { name: 'Card', value: salesOverview.paymentBreakdown.card },
    { name: 'Cash', value: salesOverview.paymentBreakdown.cash },
    { name: 'QR Code', value: salesOverview.paymentBreakdown.qr }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#6366F1'];

  // Helper functions
  const generateInvoiceId = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `INV-${randomNum}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'total_items' || name === 'total_amount' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Validate form data
      if (!formData.customer_name) {
        throw new Error('Customer name is required');
      }
      if (formData.total_amount <= 0) {
        throw new Error('Total amount must be greater than 0');
      }

      const finalFormData = {
        ...formData,
        invoice_id: formData.invoice_id || generateInvoiceId()
      };

      await addNewSale(finalFormData);
      
      // Refresh sales data after successful submission
      const updatedSales = await getSales();
      setSalesData(updatedSales);

      setIsModalOpen(false);
      setFormData({
        invoice_id: '',
        customer_name: '',
        total_items: 1,
        total_amount: 0,
        payment_method: 'card',
        status: 'Completed'
      });

      setSuccessMessage('Sale added successfully!');
    } catch (err) {
      setError(err.message || 'Failed to add new sale');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter and sort sales data
  const filteredSales = salesData.filter(sale => {
    const matchesSearch = searchQuery === '' || 
      sale.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sale.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPayment = paymentMethodFilter === 'all' || sale.payment_method === paymentMethodFilter;
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    
    return matchesSearch && matchesPayment && matchesStatus;
  });

  const sortedSales = [...filteredSales].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedSales.length / itemsPerPage);
  const paginatedSales = sortedSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiArrowUp className="ml-1 inline" /> : <FiArrowDown className="ml-1 inline" />;
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
          <a href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiPieChart className="w-5 h-5" /> <span>Dashboard</span>
          </a>
          <a href="/products" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiPackage className="w-5 h-5" /> <span>Products</span>
          </a>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-100 text-blue-600 font-semibold">
            <FiShoppingBag className="w-5 h-5" /> <span>Sales</span>
          </div>
          <a href="/invoices" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiClipboard className="w-5 h-5" /> <span>Invoices</span>
          </a>
          <a href="/reports" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiBarChart2 className="w-5 h-5" /> <span>Reports</span>
          </a>
          <a href="/customers" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiUsers className="w-5 h-5" /> <span>Customers</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiSettings className="w-5 h-5" /> <span>Settings</span>
          </a>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-100 text-red-500 hover:text-red-700 cursor-pointer transition-colors">
              <FiLogOut className="w-5 h-5" /> <span>Logout</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Sales Dashboard</h1>
            <p className="text-gray-600">Track and manage all your sales transactions</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" /> New Sale
            </button>
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

        {/* Sales Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales Today */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales Today</p>
                <p className="text-2xl font-bold mt-1">${salesOverview.totalToday.toFixed(2)}</p>
                <p className={`text-sm ${salesOverview.todayChange >= 0 ? 'text-green-500' : 'text-red-500'} mt-2 flex items-center`}>
                  {salesOverview.todayChange >= 0 ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
                  {Math.abs(salesOverview.todayChange)}% from yesterday
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FiDollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          {/* Monthly Sales */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Sales</p>
                <p className="text-2xl font-bold mt-1">${salesOverview.monthlySales.toFixed(2)}</p>
                <p className={`text-sm ${salesOverview.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'} mt-2 flex items-center`}>
                  {salesOverview.monthlyChange >= 0 ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
                  {Math.abs(salesOverview.monthlyChange)}% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <FiTrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          {/* Payment Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Breakdown</p>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center">
                    <FiCreditCard className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">Card: ${salesOverview.paymentBreakdown.card.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCash className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">Cash: ${salesOverview.paymentBreakdown.cash.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <IoQrCodeSharp className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">QR: ${salesOverview.paymentBreakdown.qr.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <FiCreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          {/* Returns */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Returns/Refunds</p>
                <p className="text-2xl font-bold mt-1">{salesOverview.returns}</p>
                <p className="text-sm text-gray-500 mt-2">This month</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <FiRefreshCw className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Sales Trend (Last 14 Days)</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setDateRange('week')} 
                  className={`px-3 py-1 text-sm rounded-md ${dateRange === 'week' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setDateRange('day')} 
                  className={`px-3 py-1 text-sm rounded-md ${dateRange === 'day' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Daily
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
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
                    formatter={(value) => [`$${value}`, 'Sales']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Payment Types Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View Details
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Add New Sale Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Add New Sale</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4">
                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice ID (leave blank to auto-generate)
                    </label>
                    <input
                      type="text"
                      name="invoice_id"
                      value={formData.invoice_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g. INV-1234"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Items
                    </label>
                    <input
                      type="number"
                      name="total_items"
                      min="1"
                      value={formData.total_items}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount ($)
                    </label>
                    <input
                      type="number"
                      name="total_amount"
                      min="0.01"
                      step="0.01"
                      value={formData.total_amount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      name="payment_method"
                      value={formData.payment_method}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="card">Card</option>
                      <option value="cash">Cash</option>
                      <option value="qr">QR Code</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Sale'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sales History */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow mb-8">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Sales History</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <FiFilter className="mr-1" /> Filters
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                <FiDownload className="mr-1" /> Export
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {isFilterOpen && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={paymentMethodFilter}
                    onChange={(e) => setPaymentMethodFilter(e.target.value)}
                  >
                    <option value="all">All Methods</option>
                    <option value="card">Card</option>
                    <option value="cash">Cash</option>
                    <option value="qr">QR Code</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Invoice ID or Customer..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('id')}>
                    # {getSortIcon('id')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('invoiceId')}>
                    Invoice ID {getSortIcon('invoiceId')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('date')}>
                    Date {getSortIcon('date')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('customer')}>
                    Customer {getSortIcon('customer')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('items')}>
                    Items {getSortIcon('total_items')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('total_amount')}>
                    Total {getSortIcon('total_amount')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('payment_method')}>
                    Payment Method {getSortIcon('payment_method')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('status')}>
                    Status {getSortIcon('status')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : paginatedSales.length > 0 ? (
                  paginatedSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {sale.invoice_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.created_at}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.customer_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.total_items || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${sale.total_amount ? Number(sale.total_amount).toFixed(2) : '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {sale.payment_method === 'Card' && <FiCreditCard className="mr-1" />}
                          {sale.payment_method === 'Cash' && <FiCash className="mr-1" />}
                          {sale.payment_method === 'QR Code' && <IoQrCodeSharp className="mr-1" />}
                          {sale.payment_method || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        !sale.status ? 'bg-gray-100 text-gray-800' :
                        sale.status.toLowerCase() === 'Completed' ? 'bg-green-100 text-green-800' :
                        sale.status.toLowerCase() === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {sale.status ? sale.status : 'Unknown'}
                      </span>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiPrinter className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FiEdit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                      {error ? error : 'No sales found matching your criteria'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || isLoading}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, sortedSales.length)}</span> of{' '}
                  <span className="font-medium">{sortedSales.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || isLoading}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      disabled={isLoading}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page 
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      } ${isLoading ? 'opacity-50' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || isLoading}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Panel */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Refund Management</h2>
            <button className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200">
              Process Refund
            </button>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData
                    .filter(sale => sale.status === 'refunded')
                    .map((sale) => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sale.invoice_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {sale.customer_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${sale.total_amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {/* You might want to add a reason field to your data */}
                          Wrong item
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Refunded
                          </span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesPage;