import { FiX, FiSearch, FiPlus, FiPhone, FiMail, FiRefreshCw } from "react-icons/fi";
import { useState, useEffect } from "react";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

const CustomerModal = ({ isOpen, setIsOpen, isCreateModalOpen, setIsCreateModalOpen }) => {
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
    customer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
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

        <h2 className="text-lg font-semibold">Add Customer</h2>

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
                  className="flex items-center justify-between border rounded-lg px-3 py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {customer.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{customer.full_name}</span>
                        {/* You can add VIP logic here if needed */}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 gap-3 mt-0.5">
                        <span className="flex items-center gap-1">
                          <FiPhone /> {customer.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMail /> {customer.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">
                    + Add to order
                  </button>
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
          />
        )}
      </div>
    </div>
  );
};

const CreateCustomerModal = ({ setIsCreateModalOpen, setIsOpen, onCustomerCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCustomer = async () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

      const response = await fetch(`${API_BASE_URL}/addcustomer/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: name,
          email: email,
          phone_number: phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create customer");
      }

      // Success - close modals and reset form
      setIsCreateModalOpen(false);
      setIsOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      
      // Refresh the customer list
      if (onCustomerCreated) {
        onCustomerCreated();
      }
      
      // Show success message
      alert("Customer created successfully!");
      
    } catch (err) {
      setError(err.message);
      console.error("Error creating customer:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6 relative">
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

        <div className="mb-4">
          <label className="text-sm text-gray-500">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-500">Phone Number</label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
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