import { FiX, FiSearch, FiPlus, FiPhone, FiMail, FiRefreshCw, FiCheck, FiBriefcase, FiHeart, FiUsers, FiInstagram } from "react-icons/fi";
import { useState, useEffect } from "react";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

const CustomerModal = ({ isOpen, setIsOpen, isCreateModalOpen, setIsCreateModalOpen, onCustomerSelect }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchCustomers();
    }
  }, [isOpen]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Get user ID from localStorage
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await fetch(`${API_BASE_URL}/getcustomers/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setCustomers(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch customers');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.includes(searchQuery)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold">Select Customer</h2>

        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center flex-1 border rounded-lg px-3 py-2 bg-gray-50">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search customer"
              className="bg-transparent outline-none px-2 w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm"
          >
            <FiPlus size={14} /> Create Customer
          </button>
          <button
            onClick={fetchCustomers}
            className="p-2 border rounded-lg hover:bg-gray-100 text-sm"
            title="Refresh customers"
          >
            <FiRefreshCw size={14} />
          </button>
        </div>

        <div className="mt-5">
          <h3 className="text-sm text-gray-500 mb-3">All Customers</h3>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
              <button 
                onClick={fetchCustomers}
                className="ml-2 text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-gray-500">Loading customers...</div>
            </div>
          ) : filteredCustomers.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between border rounded-lg px-3 py-3 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => onCustomerSelect(customer)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {customer.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{customer.full_name}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 gap-3 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <FiPhone /> {customer.phone || 'No phone'}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMail /> {customer.email || 'No email'}
                        </span>
                      </div>
                      {/* Additional customer info */}
                      {(customer.occupation || customer.social) && (
                        <div className="flex items-center text-xs text-gray-400 gap-3 mt-1">
                          {customer.occupation && (
                            <span className="flex items-center gap-1">
                              <FiBriefcase size={10} /> {customer.occupation}
                            </span>
                          )}
                          {customer.social && (
                            <span className="flex items-center gap-1">
                              <FiInstagram size={10} /> {customer.social}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <FiCheck className="text-blue-600" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              {searchQuery ? (
                <>
                  <FiSearch size={32} className="mb-2 opacity-70" />
                  <p>No customers found for "{searchQuery}"</p>
                </>
              ) : (
                <>
                  <FiSearch size={32} className="mb-2 opacity-70" />
                  <p>No customers found</p>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    Create your first customer
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {isCreateModalOpen && (
          <CreateCustomerModal 
            setIsCreateModalOpen={setIsCreateModalOpen}
            setIsOpen={setIsOpen}
            onCustomerCreated={fetchCustomers}
            onCustomerSelect={onCustomerSelect}
          />
        )}
      </div>
    </div>
  );
};

const CreateCustomerModal = ({ setIsCreateModalOpen, setIsOpen, onCustomerCreated, onCustomerSelect }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    birthday: "",
    occupation: "",
    married: "",
    kids: "",
    social: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCustomer = async () => {
    // Basic validation
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone_number.trim()) {
      setError("Please fill in all required fields (Name, Email, Phone)");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Get user ID from localStorage
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const requestBody = {
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        birthday: formData.birthday || null,
        occupation: formData.occupation || null,
        married: formData.married === "true" ? true : formData.married === "false" ? false : null,
        kids: formData.kids ? parseInt(formData.kids) : null,
        social: formData.social || null
      };

      const response = await fetch(`${API_BASE_URL}/addcustomer/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create customer");
      }

      // Create a customer object to pass to the parent
      const newCustomer = {
        id: data.customer_id || Date.now(),
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone_number,
        birthday: formData.birthday,
        occupation: formData.occupation,
        married: formData.married === "true",
        kids: formData.kids ? parseInt(formData.kids) : null,
        social: formData.social
      };

      // Select the newly created customer
      if (onCustomerSelect) {
        onCustomerSelect(newCustomer);
      }

      // Refresh the customer list
      if (onCustomerCreated) {
        onCustomerCreated();
      }
      
      // Close modals and reset form
      setIsCreateModalOpen(false);
      setIsOpen(false);
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        birthday: "",
        occupation: "",
        married: "",
        kids: "",
        social: ""
      });
      
    } catch (err) {
      setError(err.message);
      console.error("Error creating customer:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsCreateModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Create New Customer</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Required Fields */}
          <div>
            <label className="text-sm text-gray-500">Full Name *</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter full name"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Phone Number *</label>
            <input
              type="tel"
              name="phone_number"
              placeholder="+1 (555) 000-0000"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Optional Fields */}
          <div>
            <label className="text-sm text-gray-500">Birthday</label>
            <div className="relative mt-1">
              <input
                type="date"
                name="birthday"
                className="w-full border rounded-lg px-3 py-2 pl-10 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
                value={formData.birthday}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Occupation</label>
            <div className="relative mt-1">
              <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="occupation"
                placeholder="Enter occupation"
                className="w-full border rounded-lg px-3 py-2 pl-10 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
                value={formData.occupation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Marital Status</label>
            <select
              name="married"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={formData.married}
              onChange={handleInputChange}
            >
              <option value="">Select status</option>
              <option value="true">Married</option>
              <option value="false">Single</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Number of Kids</label>
            <div className="relative mt-1">
              <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="kids"
                placeholder="0"
                min="0"
                className="w-full border rounded-lg px-3 py-2 pl-10 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
                value={formData.kids}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Social Media Handle</label>
            <div className="relative mt-1">
              <FiInstagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="social"
                placeholder="@username"
                className="w-full border rounded-lg px-3 py-2 pl-10 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
                value={formData.social}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            Back
          </button>
          <button
            onClick={handleCreateCustomer}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Customer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;