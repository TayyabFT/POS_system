"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

import {
  FiDollarSign,
  FiTrendingUp,
  FiBox,
  FiShoppingBag,
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiFilter
} from "react-icons/fi";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  ResponsiveContainer
} from "recharts";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [activeReport, setActiveReport] = useState("sales");
  const router = useRouter();
  
  // State for summary data
  const [summaryData, setSummaryData] = useState({
    total_sales: "0.00",
    total_orders: 0,
    average_order_value: "0.00",
    gross_profit: "0.00"
  });
  
  // State for charts
  const [dailySalesData, setDailySalesData] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Format day name from date
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Fetch today's sales summary
  const fetchTodaySales = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/today-sales-summary/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch today sales');
      const result = await response.json();
      if (result.success && result.data) {
        setSummaryData({
          total_sales: result.data.total_sales || "0.00",
          total_orders: result.data.total_orders || 0,
          average_order_value: result.data.average_order_value || "0.00",
          gross_profit: result.data.gross_profit || "0.00"
        });
      }
    } catch (err) {
      console.error('Error fetching today sales:', err);
      setError(err.message);
    }
  };

  // Fetch weekly sales
  const fetchWeeklySales = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/weekly-sales/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch weekly sales');
      const result = await response.json();
      if (result.success && result.data && result.data.totals) {
        setSummaryData({
          total_sales: result.data.totals.total_sales || "0.00",
          total_orders: result.data.totals.total_orders || 0,
          average_order_value: result.data.totals.average_order_value || "0.00",
          gross_profit: result.data.totals.gross_profit || "0.00"
        });
      }
    } catch (err) {
      console.error('Error fetching weekly sales:', err);
      setError(err.message);
    }
  };

  // Fetch monthly sales
  const fetchMonthlySales = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/monthly-sales/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch monthly sales');
      const result = await response.json();
      if (result.success && result.data && result.data.totals) {
        setSummaryData({
          total_sales: result.data.totals.total_sales || "0.00",
          total_orders: result.data.totals.total_orders || 0,
          average_order_value: result.data.totals.average_order_value || "0.00",
          gross_profit: result.data.totals.gross_profit || "0.00"
        });
      }
    } catch (err) {
      console.error('Error fetching monthly sales:', err);
      setError(err.message);
    }
  };

  // Fetch yearly sales
  const fetchYearlySales = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/yearly-sales/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch yearly sales');
      const result = await response.json();
      if (result.success && result.data && result.data.totals) {
        setSummaryData({
          total_sales: result.data.totals.total_sales || "0.00",
          total_orders: result.data.totals.total_orders || 0,
          average_order_value: result.data.totals.average_order_value || "0.00",
          gross_profit: result.data.totals.gross_profit || "0.00"
        });
      }
    } catch (err) {
      console.error('Error fetching yearly sales:', err);
      setError(err.message);
    }
  };

  // Fetch daily sales for the week
  const fetchWeeklyDailySales = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/weekly-daily-sales/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch weekly daily sales');
      const result = await response.json();
      if (result.success && result.data) {
        const formattedData = result.data.map((item) => ({
          day: getDayName(item.sale_date),
          sales: parseFloat(item.total_sales) || 0
        }));
        setDailySalesData(formattedData);
      }
    } catch (err) {
      console.error('Error fetching weekly daily sales:', err);
      setError(err.message);
    }
  };

  // Fetch top selling products
  const fetchTopSellingProducts = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/top-selling-products/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch top selling products');
      const result = await response.json();
      // Handle response format: data is an array of products
      if (result.success && Array.isArray(result.data)) {
        setTopSellingProducts(result.data);
      } else if (result.statusCode === 200 && Array.isArray(result.data)) {
        setTopSellingProducts(result.data);
      } else {
        setTopSellingProducts([]);
      }
    } catch (err) {
      console.error('Error fetching top selling products:', err);
      setError(err.message);
      setTopSellingProducts([]);
    }
  };

  // Fetch all data based on active tab
  const fetchData = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch summary data based on active tab
      switch (activeTab) {
        case "today":
          await fetchTodaySales(userId);
          break;
        case "week":
          await fetchWeeklySales(userId);
          break;
        case "month":
          await fetchMonthlySales(userId);
          break;
        case "year":
          await fetchYearlySales(userId);
          break;
        default:
          await fetchTodaySales(userId);
      }

      // Always fetch weekly daily sales and top selling products
      await Promise.all([
        fetchWeeklyDailySales(userId),
        fetchTopSellingProducts(userId)
      ]);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and when activeTab changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Handle refresh
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      <Sidebar tabname="reports" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Reports</h1>
            <p className="text-gray-600">Analyze your business performance with detailed reports.</p>
          </header>

          {/* Report Type Selection */}
          {/* <div className="mb-8"> */}
          {/* <div className="flex flex-wrap gap-3 bg-white p-2 rounded-lg shadow-sm inline-block">
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
          </div> */}
          {/* </div> */}

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
              <span className="text-sm text-gray-700">{formatDate(new Date())}</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow-sm"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
            <button className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg shadow-sm">
              <FiDownload className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
          </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-center">
              Loading data...
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Sales</p>
                  <p className="text-2xl font-bold mt-1">${parseFloat(summaryData.total_sales || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {activeTab === "today" ? "Today" : activeTab === "week" ? "This Week" : activeTab === "month" ? "This Month" : "This Year"}
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
                  <p className="text-2xl font-bold mt-1">${parseFloat(summaryData.gross_profit || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {activeTab === "today" ? "Today" : activeTab === "week" ? "This Week" : activeTab === "month" ? "This Month" : "This Year"}
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
                  <p className="text-2xl font-bold mt-1">{summaryData.total_orders || 0}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {activeTab === "today" ? "Today" : activeTab === "week" ? "This Week" : activeTab === "month" ? "This Month" : "This Year"}
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
                  <p className="text-2xl font-bold mt-1">${parseFloat(summaryData.average_order_value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {activeTab === "today" ? "Today" : activeTab === "week" ? "This Week" : activeTab === "month" ? "This Month" : "This Year"}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                  <FiBox className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row - Removed Sales & Profit Trend and Category Distribution as they're not in the API */}

          {/* Weekly Sales Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Daily Sales This Week</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View Weekly Report
              </button>
            </div>
            <div className="h-64">
              {dailySalesData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No sales data available for this week
                </div>
              ) : (
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
                      formatter={(value) => [`$${parseFloat(value).toFixed(2)}`, 'Sales']}
                    />
                    <Bar 
                      dataKey="sales" 
                      fill="#3B82F6" 
                      radius={[4, 4, 0, 0]} 
                      name="Sales"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : topSellingProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  topSellingProducts.map((product, index) => (
                    <tr key={product.product_id || product.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.product_name || product.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.units_sold || product.total_quantity || product.quantity_sold || product.sales || 0} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ${parseFloat(product.revenue || product.total_revenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center text-sm text-gray-600">
                          {product.growth_percentage !== undefined ? (
                            <>
                              {product.growth_percentage >= 0 ? (
                                <FiTrendingUp className="mr-1" />
                              ) : (
                                <FiTrendingUp className="mr-1 transform rotate-180" />
                              )}
                              {Math.abs(product.growth_percentage)}%
                            </>
                          ) : (
                            'N/A'
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">Details</a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;