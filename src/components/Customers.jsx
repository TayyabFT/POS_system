"use client";

import { useState, useEffect } from "react";
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
  FiRefreshCw,
  FiAward,
  FiStar
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
import { getTopCustomers, getCustomerStats, getAllCustomers, deleteCustomer as deleteCustomerService, updateCustomer as updateCustomerService } from "@/services/customerService";

const CustomersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerStats, setCustomerStats] = useState({
    total_customers: 0,
    new_customers_current_month: 0,
    average_spending: 0
  });
  const [customers, setCustomers] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topCustomersLoading, setTopCustomersLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editFormData, setEditFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });
  const router = useRouter();

  useEffect(() => {
    fetchCustomerStats();
    fetchCustomers();
    fetchTopCustomers();
  }, []);

  const fetchCustomerStats = async () => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error("User ID not found");
      }
      
      setLoading(true);
      const result = await getCustomerStats(userId);
      
      if (result.success) {
        setCustomerStats(result.data);
      } else {
        throw new Error('Failed to fetch customer statistics');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching customer stats:", err);
      setCustomerStats({
        total_customers: 1254,
        new_customers_current_month: 85,
        average_spending: 248.35
      });
    }
  };

  const fetchCustomers = async () => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const result = await getAllCustomers(userId);
      
      if (result.success) {
        setCustomers(result.data);
      } else {
        throw new Error('Failed to fetch customers');
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomers([
        { id: 1, full_name: "John Doe", email: "john.doe@example.com", phone: "+1 234-567-8901", total_spent: "250.50" },
        { id: 2, full_name: "Sarah Smith", email: "sarah.smith@example.com", phone: "+1 345-678-9012", total_spent: "1890.25" },
        { id: 3, full_name: "Michael Johnson", email: "michael.j@example.com", phone: "+1 456-789-0123", total_spent: "2450.75" },
        { id: 4, full_name: "Emily Wilson", email: "emily.w@example.com", phone: "+1 567-890-1234", total_spent: "675.30" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopCustomers = async () => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error("User ID not found");
      }

      setTopCustomersLoading(true);
      const result = await getTopCustomers(userId);
      
      if (result.success) {
        setTopCustomers(result.data);
        console.log("Top customers fetched successfully:", result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch top customers');
      }
    } catch (err) {
      console.error("Error fetching top customers:", err);
      // Fallback data for development/testing
      setTopCustomers([
        { id: 1, full_name: "John Doe", email: "john.doe@example.com", total_spent: "250.50" },
        { id: 2, full_name: "Sarah Smith", email: "sarah.smith@example.com", total_spent: "1890.25" },
        { id: 3, full_name: "Michael Johnson", email: "michael.j@example.com", total_spent: "2450.75" }
      ]);
    } finally {
      setTopCustomersLoading(false);
    }
  };

  const deleteCustomer = async (customerId) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      const result = await deleteCustomerService(customerId);
      
      if (result.success) {
        setCustomers(customers.filter(customer => customer.id !== customerId));
        setTopCustomers(topCustomers.filter(customer => customer.id !== customerId));
        alert('Customer deleted successfully!');
        fetchCustomerStats();
      } else {
        throw new Error(result.message || 'Failed to delete customer');
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
      alert(`Failed to delete customer: ${err.message}`);
    }
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setEditFormData({
      full_name: customer.full_name || "",
      email: customer.email || "",
      phone: customer.phone || ""
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCustomer(null);
    setEditFormData({
      full_name: "",
      email: "",
      phone: ""
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const updateCustomer = async () => {
    if (!editingCustomer) return;

    try {
      const result = await updateCustomerService(editingCustomer.id, editFormData);
      
      if (result.success) {
        setCustomers(customers.map(customer => 
          customer.id === editingCustomer.id 
            ? { ...customer, ...editFormData }
            : customer
        ));
        setTopCustomers(topCustomers.map(customer => 
          customer.id === editingCustomer.id 
            ? { ...customer, ...editFormData }
            : customer
        ));
        closeEditModal();
        alert('Customer updated successfully!');
      } else {
        throw new Error(result.message || 'Failed to update customer');
      }
    } catch (err) {
      console.error("Error updating customer:", err);
      alert(`Failed to update customer: ${err.message}`);
    }
  };

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

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white font-sans text-gray-900">
        <Sidebar tabname="customers" />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Navbar tabname="customers" />
          <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    );
  }

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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>Error: {error}</p>
            </div>
          )}

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
                  <p className="text-2xl font-bold mt-1">{customerStats.total_customers}</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> {customerStats.new_customers_current_month} new this month
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
                  <p className="text-2xl font-bold mt-1">{customerStats.total_customers}</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> All customers
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
                  <p className="text-2xl font-bold mt-1">{customerStats.new_customers_current_month}</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> This month
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
                  <p className="text-2xl font-bold mt-1">${customerStats.average_spending.toFixed(2)}</p>
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <FiTrendingUp className="mr-1" /> Per customer
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                  <FiDollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Customers Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FiAward className="text-yellow-500" /> Top Customers of the Week
                </h2>
                <button 
                  onClick={fetchTopCustomers}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <FiRefreshCw className="mr-1 w-4 h-4" /> Refresh
                </button>
              </div>
            </div>
            <div className="p-6">
              {topCustomersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">Loading top customers...</span>
                </div>
              ) : topCustomers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topCustomers.map((customer, index) => (
                    <div key={customer.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                            {customer.full_name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <div className="font-medium">{customer.full_name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                            {customer.social && (
                              <div className="text-xs text-gray-400">{customer.social}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FiStar className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">#{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Spent This Week</span>
                        <span className="font-bold text-green-600">${parseFloat(customer.total_spent || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FiAward className="w-12 h-12 mx-auto mb-2 opacity-70" />
                  <p>No top customers data available for this week</p>
                  <p className="text-sm mt-1">Try refreshing or check back later</p>
                </div>
              )}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Customer Spending Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Customer Spending Trend</h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={fetchCustomerStats}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
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
                  <span className="text-sm text-gray-500">Showing {customers.length} of {customerStats.total_customers} customers</span>
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
                      Additional Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {customer.full_name?.charAt(0) || 'C'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.full_name}</div>
                            <div className="text-sm text-gray-500">ID: #{customer.id}</div>
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
                        <div className="text-sm text-gray-600">
                          {customer.occupation && (
                            <div className="mb-1">Occupation: {customer.occupation}</div>
                          )}
                          {customer.social && (
                            <div>Social: {customer.social}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          ${parseFloat(customer.total_spent || 0).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3 justify-end">
                          <button 
                            onClick={() => openEditModal(customer)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteCustomer(customer.id)}
                            className="text-red-600 hover:text-red-900"
                          >
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
                Showing page 1 of {Math.ceil(customerStats.total_customers / 10)}
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-black font-medium">
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

      {/* Edit Customer Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Edit Customer</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="text-sm text-gray-500">Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={editFormData.full_name}
                onChange={handleEditInputChange}
                placeholder="Customer name"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm text-gray-500">Email *</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                placeholder="customer@email.com"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="text-sm text-gray-500">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditInputChange}
                placeholder="+1 (555) 000-0000"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={closeEditModal}
                className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={updateCustomer}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;