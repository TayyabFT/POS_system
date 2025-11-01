"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import API_BASE_URL from "@/apiconfig/API_BASE_URL";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";

import {
  FiSave,
  FiGlobe,
  FiCreditCard,
  FiLock,
  FiMail,
  FiPhone,
  FiHome,
  FiPlus
} from "react-icons/fi";

const SettingsPage = () => {
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

  // Business profile settings state
  const [businessProfile, setBusinessProfile] = useState({
    business_name: "Flow POS Store",
    business_type: "Retail",
    tax_id: "123-45-6789",
    contact_email: "contact@flowpos.com",
    contact_phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    logo_url: null
  });
  const [businessProfileId, setBusinessProfileId] = useState(null);
  const [businessSaving, setBusinessSaving] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(false);
  const [businessSaveMessage, setBusinessSaveMessage] = useState("");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Payment methods settings state
  const [paymentMethods, setPaymentMethods] = useState({
    credit_card_active: true,
    cash_active: true,
    online_payment_active: false
  });
  const [paymentMethodsId, setPaymentMethodsId] = useState(null);
  const [paymentMethodsSaving, setPaymentMethodsSaving] = useState(false);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);
  const [paymentMethodsSaveMessage, setPaymentMethodsSaveMessage] = useState("");

  // Fetch general settings on component mount
  useEffect(() => {
    fetchGeneralSettings();
    fetchBusinessProfileSettings();
    fetchPaymentMethodsSettings();
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

  const fetchBusinessProfileSettings = async () => {
    try {
      setBusinessLoading(true);
      
      // Get user ID from localStorage
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        console.log("User ID not found. Using default business settings.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/getbusinessprofilesetting/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.message) {
        // data.message contains the business profile object
        setBusinessProfile({
          business_name: data.message.business_name || "Flow POS Store",
          business_type: data.message.business_type || "Retail",
          tax_id: data.message.tax_id || "",
          contact_email: data.message.contact_email || "",
          contact_phone: data.message.contact_phone || "",
          address: data.message.address || "",
          logo_url: data.message.logo_url
        });
        // Store the business profile ID from the response
        setBusinessProfileId(data.message.id);
        // Set logo preview if logo_url exists
        if (data.message.logo_url) {
          setLogoPreview(data.message.logo_url);
        }
      }
    } catch (err) {
      console.error("Error fetching business profile settings:", err);
      // Keep default values if fetch fails
    } finally {
      setBusinessLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedLogo(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBusinessProfile = async () => {
    try {
      setBusinessSaving(true);
      setBusinessSaveMessage("");
      
      // Check if businessProfileId exists
      if (!businessProfileId) {
        throw new Error("Business profile ID not found. Please refresh the page.");
      }

      // Create form data for file upload
      const formData = new FormData();
      formData.append("business_name", businessProfile.business_name);
      formData.append("business_type", businessProfile.business_type);
      formData.append("tax_id", businessProfile.tax_id);
      formData.append("contact_email", businessProfile.contact_email);
      formData.append("contact_phone", businessProfile.contact_phone);
      formData.append("address", businessProfile.address);
      
      // Append logo file if selected
      if (selectedLogo) {
        formData.append("image", selectedLogo);
      }

      const response = await fetch(`${API_BASE_URL}/updatebusinessprofilesetting/${businessProfileId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setBusinessSaveMessage("Business profile saved successfully!");
        setTimeout(() => setBusinessSaveMessage(""), 3000);
        setSelectedLogo(null); // Clear selected file after successful save
      } else {
        throw new Error(data.error || 'Failed to save business profile');
      }
    } catch (err) {
      console.error("Error saving business profile:", err);
      setBusinessSaveMessage(err.message || "Failed to save business profile");
    } finally {
      setBusinessSaving(false);
    }
  };

  const fetchPaymentMethodsSettings = async () => {
    try {
      setPaymentMethodsLoading(true);
      
      // Get user ID from localStorage
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        console.log("User ID not found. Using default payment methods settings.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/getpaymentmethodssetting/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.message) {
        // data.message contains the payment methods object with id
        setPaymentMethods({
          credit_card_active: data.message.credit_card_active ?? true,
          cash_active: data.message.cash_active ?? true,
          online_payment_active: data.message.online_payment_active ?? false
        });
        // Store the payment methods ID from the response
        setPaymentMethodsId(data.message.id);
      }
    } catch (err) {
      console.error("Error fetching payment methods settings:", err);
      // Keep default values if fetch fails
    } finally {
      setPaymentMethodsLoading(false);
    }
  };

  const handleSavePaymentMethods = async () => {
    try {
      setPaymentMethodsSaving(true);
      setPaymentMethodsSaveMessage("");
      
      // Check if paymentMethodsId exists (from GET API response)
      if (!paymentMethodsId) {
        throw new Error("Payment methods settings ID not found. Please refresh the page.");
      }

      const response = await fetch(`${API_BASE_URL}/updatepaymentmethodssetting/${paymentMethodsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credit_card_active: paymentMethods.credit_card_active,
          cash_active: paymentMethods.cash_active,
          online_payment_active: paymentMethods.online_payment_active
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setPaymentMethodsSaveMessage("Payment methods saved successfully!");
        setTimeout(() => setPaymentMethodsSaveMessage(""), 3000);
        // Update the ID if it's returned in the response
        if (data.message?.id) {
          setPaymentMethodsId(data.message.id);
        } else if (data.id) {
          setPaymentMethodsId(data.id);
        }
      } else {
        throw new Error(data.error || 'Failed to save payment methods');
      }
    } catch (err) {
      console.error("Error saving payment methods:", err);
      setPaymentMethodsSaveMessage(err.message || "Failed to save payment methods");
    } finally {
      setPaymentMethodsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      <Sidebar tabname="settings" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
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
              
              {businessLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading business profile...</span>
                </div>
              ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Business Logo" className="w-full h-full object-cover" />
                    ) : (
                      <FiShoppingCart className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer inline-block">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                      Upload Logo
                    </label>
                    {selectedLogo && (
                      <p className="text-xs text-gray-500 mt-1">{selectedLogo.name}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={businessProfile.business_name}
                    onChange={(e) => setBusinessProfile({...businessProfile, business_name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={businessProfile.business_type}
                    onChange={(e) => setBusinessProfile({...businessProfile, business_type: e.target.value})}
                  >
                    <option value="Retail">Retail</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Service">Service</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID / Business Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={businessProfile.tax_id}
                    onChange={(e) => setBusinessProfile({...businessProfile, tax_id: e.target.value})}
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
                        value={businessProfile.contact_email}
                        onChange={(e) => setBusinessProfile({...businessProfile, contact_email: e.target.value})}
                      />
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-2" />
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={businessProfile.contact_phone}
                        onChange={(e) => setBusinessProfile({...businessProfile, contact_phone: e.target.value})}
                      />
                    </div>
                    <div className="flex items-center">
                      <FiHome className="text-gray-400 mr-2" />
                      <textarea 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        value={businessProfile.address}
                        onChange={(e) => setBusinessProfile({...businessProfile, address: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                {businessSaveMessage && (
                  <div className={`p-3 rounded-md ${businessSaveMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {businessSaveMessage}
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleSaveBusinessProfile}
                    disabled={businessSaving}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FiSave className="mr-2" /> {businessSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
              )}
            </div>
          )}
          
          {activeTab === "payment" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
              
              {paymentMethodsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading payment methods...</span>
                </div>
              ) : (
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
                      <span className={`${paymentMethods.credit_card_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs px-2 py-1 rounded-full mr-3`}>
                        {paymentMethods.credit_card_active ? 'Active' : 'Inactive'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.credit_card_active}
                          onChange={(e) => setPaymentMethods({...paymentMethods, credit_card_active: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 pl-9">
                    <button className="text-blue-500 text-sm hover:underline flex items-center">
                      Configure
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <h3 className="font-medium">Cash</h3>
                        <p className="text-sm text-gray-500">Accept cash payments</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`${paymentMethods.cash_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs px-2 py-1 rounded-full mr-3`}>
                        {paymentMethods.cash_active ? 'Active' : 'Inactive'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.cash_active}
                          onChange={(e) => setPaymentMethods({...paymentMethods, cash_active: e.target.checked})}
                          className="sr-only peer" 
                        />
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
                      <span className={`${paymentMethods.online_payment_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs px-2 py-1 rounded-full mr-3`}>
                        {paymentMethods.online_payment_active ? 'Active' : 'Inactive'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.online_payment_active}
                          onChange={(e) => setPaymentMethods({...paymentMethods, online_payment_active: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 pl-9">
                    <button className="text-blue-500 text-sm hover:underline flex items-center">
                      Configure
                    </button>
                  </div>
                </div>
                
                {paymentMethodsSaveMessage && (
                  <div className={`p-3 rounded-md ${paymentMethodsSaveMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {paymentMethodsSaveMessage}
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleSavePaymentMethods}
                    disabled={paymentMethodsSaving}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FiSave className="mr-2" /> {paymentMethodsSaving ? 'Saving...' : 'Save Payment Settings'}
                  </button>
                </div>
              </div>
              )}
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
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;