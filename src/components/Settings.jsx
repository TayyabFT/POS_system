"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

import {
  FiPieChart,
  FiDollarSign,
  FiUsers,
  FiShoppingCart,
  FiSettings,
  FiPackage,
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
  FiSave,
  FiEdit,
  FiGlobe,
  FiCreditCard,
  FiLock,
  FiMail,
  FiPhone,
  FiHome,
  FiPlus
} from "react-icons/fi";

const SettingsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const router = useRouter();
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    store_name: "Flow POS Store",
    currency: "USD",
    time_zone: "UTC-5",
    date_format: "MM/DD/YYYY",
    show_prices_tax_inclusive: false
  });
  const [settingsId, setSettingsId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Fetch general settings on component mount
  useEffect(() => {
    fetchGeneralSettings();
  }, []);

  const fetchGeneralSettings = async () => {
    try {
      setLoading(true);
      
      // Get user ID from localStorage
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        console.log("User ID not found. Using default settings.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/getgeneralsetting/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.message) {
        // data.message contains the settings object
        setGeneralSettings({
          store_name: data.message.store_name || "Flow POS Store",
          currency: data.message.currency || "USD",
          time_zone: data.message.time_zone || "UTC-5",
          date_format: data.message.date_format || "MM/DD/YYYY",
          show_prices_tax_inclusive: data.message.show_prices_tax_inclusive || false
        });
        // Store the settings ID from the response
        setSettingsId(data.message.id);
      }
    } catch (err) {
      console.error("Error fetching general settings:", err);
      // Keep default values if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGeneralSettings = async () => {
    try {
      setSaving(true);
      setSaveMessage("");
      
      // Check if settingsId exists
      if (!settingsId) {
        throw new Error("Settings ID not found. Please refresh the page.");
      }

      const response = await fetch(`${API_BASE_URL}/updategeneralsetting/${settingsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generalSettings),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setSaveMessage("Settings saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        throw new Error(data.error || 'Failed to save settings');
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      setSaveMessage(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
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
          <div onClick={() => router.push('/customers')} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiUsers className="w-5 h-5" /> <span>Customers</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-100 text-blue-600 font-semibold">
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Manage your business settings and preferences.</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search settings..." 
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

        {/* Settings Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 bg-white p-2 rounded-lg shadow-sm inline-block">
            <button 
              onClick={() => setActiveTab("general")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "general" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              General
            </button>
            <button 
              onClick={() => setActiveTab("business")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "business" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Business Profile
            </button>
            <button 
              onClick={() => setActiveTab("payment")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "payment" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Payment Methods
            </button>
            <button 
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "users" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"}`}
            >
              Users & Permissions
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === "general" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">General Settings</h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading settings...</span>
                </div>
              ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={generalSettings.store_name}
                    onChange={(e) => setGeneralSettings({...generalSettings, store_name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={generalSettings.currency}
                    onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={generalSettings.time_zone}
                    onChange={(e) => setGeneralSettings({...generalSettings, time_zone: e.target.value})}
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={generalSettings.date_format}
                    onChange={(e) => setGeneralSettings({...generalSettings, date_format: e.target.value})}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input 
                    id="tax-inclusive" 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={generalSettings.show_prices_tax_inclusive}
                    onChange={(e) => setGeneralSettings({...generalSettings, show_prices_tax_inclusive: e.target.checked})}
                  />
                  <label htmlFor="tax-inclusive" className="ml-2 block text-sm text-gray-700">
                    Show prices tax inclusive
                  </label>
                </div>
                
                {saveMessage && (
                  <div className={`p-3 rounded-md ${saveMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {saveMessage}
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleSaveGeneralSettings}
                    disabled={saving}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FiSave className="mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
              )}
            </div>
          )}
          
          {activeTab === "business" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Business Profile</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FiShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                    Upload Logo
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="Flow POS Store"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Retail</option>
                    <option>Restaurant</option>
                    <option>Service</option>
                    <option>E-commerce</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID / Business Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="123-45-6789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Information
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-2" />
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="contact@flowpos.com"
                      />
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-2" />
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="flex items-center">
                      <FiHome className="text-gray-400 mr-2" />
                      <textarea 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        defaultValue="123 Business Street, Suite 101&#10;San Francisco, CA 94107&#10;United States"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                    <FiSave className="mr-2" /> Save Profile
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "payment" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiCreditCard className="text-blue-500 mr-3 w-6 h-6" />
                      <div>
                        <h3 className="font-medium">Credit Card</h3>
                        <p className="text-sm text-gray-500">Accept Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-3">Active</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 pl-9">
                    <button className="text-blue-500 text-sm hover:underline flex items-center">
                      <FiEdit className="mr-1" /> Configure
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiDollarSign className="text-blue-500 mr-3 w-6 h-6" />
                      <div>
                        <h3 className="font-medium">Cash</h3>
                        <p className="text-sm text-gray-500">Accept cash payments</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-3">Active</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiGlobe className="text-blue-500 mr-3 w-6 h-6" />
                      <div>
                        <h3 className="font-medium">Online Payment</h3>
                        <p className="text-sm text-gray-500">PayPal, Stripe, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-3">Inactive</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 pl-9">
                    <button className="text-blue-500 text-sm hover:underline flex items-center">
                      <FiEdit className="mr-1" /> Configure
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                    <FiSave className="mr-2" /> Save Payment Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "users" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Users & Permissions</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm flex items-center">
                  <FiPlus className="mr-1" /> Add New User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            A
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Admin User</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        admin@flowpos.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Administrator
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Today, 10:30 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3 justify-end">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <FiLock className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                            S
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Sales Staff</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        sales@flowpos.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Sales
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Yesterday, 4:15 PM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3 justify-end">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <FiLock className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;