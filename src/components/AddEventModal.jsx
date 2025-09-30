"use client";
import React, { useState } from "react";
import { FiX, FiPlus, FiTrash2, FiCalendar, FiDollarSign, FiTag, FiPackage, FiImage } from "react-icons/fi";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

const AddEventModal = ({ isOpen, setIsOpen, onEventAdded }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    sku: "",
    barcode: "",
    category_name: "",
    price: "",
    cost: "",
    stock: "",
    status: "active",
    is_merchandise: false,
    is_event: true,
    event_dates: []
  });
  
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addEventDate = () => {
    if (newDate && !formData.event_dates.includes(newDate)) {
      setFormData(prev => ({
        ...prev,
        event_dates: [...prev.event_dates, newDate]
      }));
      setNewDate("");
    }
  };

  const removeEventDate = (dateToRemove) => {
    setFormData(prev => ({
      ...prev,
      event_dates: prev.event_dates.filter(date => date !== dateToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.event_dates.length === 0) {
      setError("Please add at least one event date");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Prepare the product data with event_dates as JSON array
      // This will be sent to /addproduct API endpoint
      const productData = {
        is_merchandise: formData.is_merchandise, // false for events
        is_event: formData.is_event, // true for events
        product_name: formData.product_name,
        description: formData.description,
        sku: formData.sku,
        barcode: formData.barcode,
        category_name: formData.category_name,
        price: parseFloat(formData.price) || 0,
        cost: parseFloat(formData.cost) || 0,
        stock: parseInt(formData.stock) || 0,
        status: formData.status,
        event_dates: formData.event_dates // JSON array: ["2024-01-15", "2024-01-16", "2024-01-17"]
      };

      const response = await fetch(`${API_BASE_URL}/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        alert('Event created successfully!');
        onEventAdded();
        handleClose();
      } else {
        throw new Error(data.message || 'Failed to create event');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      product_name: "",
      description: "",
      sku: "",
      barcode: "",
      category_name: "",
      price: "",
      cost: "",
      stock: "",
      status: "active",
      is_merchandise: false,
      is_event: true,
      event_dates: []
    });
    setNewDate("");
    setError(null);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <FiX size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Event</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Concert, Workshop, Conference"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the event..."
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Person *
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost per Person
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Capacity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Event Dates Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiCalendar className="text-blue-500" />
                Event Dates *
              </h3>
              
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addEventDate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <FiPlus size={16} />
                    Add Date
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Add all available dates for this event
                </p>
              </div>

              {formData.event_dates.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Selected Dates:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {formData.event_dates.map((date, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                      >
                        <span className="text-sm font-medium text-blue-800">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeEventDate(date)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Event-SKU-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Barcode
                </label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123456789"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || formData.event_dates.length === 0}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Event..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
