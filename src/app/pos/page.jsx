'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiTrash2, FiUser, FiChevronRight, FiChevronLeft, FiEdit, FiShoppingCart, FiTag, FiClock, FiCheckCircle, FiAlertCircle, FiPrinter, FiPhone, FiHome } from 'react-icons/fi';
import { FiX } from 'react-icons/fi'; // for modal close button
export default function POSOrderPage() {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState('Dine in');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('12:00 PM');
const [showPickupModal, setShowPickupModal] = useState(false);

const handleOrderTypeChange = (type) => {
    setOrderType(type);
    if (type === 'Pickup') {
      setShowPickupModal(true); // open modal on Pickup
    }
  };

  const categories = [
    { name: 'Breakfast', count: 12, icon: '☕' },
    { name: 'Lunch', count: 24, icon: '🍔' },
    { name: 'Dinner', count: 8, icon: '🍽️' },
    { name: 'Appetizer', count: 9, icon: '🥗' },
    { name: 'Main Courses', count: 16, icon: '🍛' },
    { name: 'Dessert', count: 10, icon: '🍰' },
    { name: 'Beverages', count: 22, icon: '🥤' },
    { name: 'Wine', count: 10, icon: '🍷' },
  ];

  const items = [
    { id: 1, name: 'Fettuccini with Spinach', price: 15, status: 'Sold out', category: 'Dinner', image: '/food1.jpg' },
    { id: 2, name: 'Black Bean Chili', price: 15, status: 'Trending', category: 'Lunch', image: '/food2.jpg' },
    { id: 3, name: 'Spicy Healthy Sauté', price: 12.5, discount: 17.25, status: 'Running Low', category: 'Main Courses', image: '/food3.jpg' },
    { id: 4, name: 'Spicy Black Bean Burger', price: 15, status: 'New', category: 'Lunch', image: '/food4.jpg' },
    { id: 5, name: 'Avocado Toast', price: 9.5, status: 'Popular', category: 'Breakfast', image: '/food5.jpg' },
    { id: 6, name: 'Chocolate Lava Cake', price: 8, status: '', category: 'Dessert', image: '/food6.jpg' },
    { id: 7, name: 'Margherita Pizza', price: 14, status: '', category: 'Dinner', image: '/food7.jpg' },
    { id: 8, name: 'Iced Caramel Latte', price: 5.5, status: '', category: 'Beverages', image: '/food8.jpg' },
  ];

  const filteredItems = items.filter(item => 
    item.category === selectedCategory && 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItemToOrder = (item) => {
    setOrderItems([...orderItems, {...item, id: Date.now()}]);
  };

  const removeItemFromOrder = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((acc, item) => acc + item.price, 0);
    const tax = subtotal * 0.12;
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  };

  const { subtotal, tax, total } = calculateTotal();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Sold out': return 'bg-gray-600';
      case 'Trending': return 'bg-pink-500';
      case 'Running Low': return 'bg-yellow-500';
      case 'New': return 'bg-green-500';
      case 'Popular': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = () => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-20 bg-indigo-900 flex flex-col items-center py-6">
        <div className="w-14 h-14 bg-white rounded-lg mb-8 flex items-center justify-center text-indigo-900 font-bold text-xl">POS</div>
        
        <nav className="flex flex-col items-center gap-8">
          <button className="p-3 bg-indigo-800 rounded-lg text-white">
            <FiShoppingCart size={20} />
          </button>
          <button className="p-3 text-indigo-300 hover:text-white">
            <FiUser size={20} />
          </button>
          <button className="p-3 text-indigo-300 hover:text-white">
            <FiPrinter size={20} />
          </button>
          <button className="p-3 text-indigo-300 hover:text-white">
            <FiHome size={20} />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b">
          <div className="flex gap-6 items-center">
            <button className="px-5 py-2 bg-indigo-700 text-white rounded-lg font-medium shadow-md hover:bg-indigo-800 transition">
              Order
            </button>
            <button className="text-gray-600 hover:text-indigo-700 transition">Reservation</button>
            <button className="text-gray-600 hover:text-indigo-700 transition">Transaction</button>
            <button className="text-gray-600 hover:text-indigo-700 transition">Table</button>
          </div>
          
          <div className="text-sm text-gray-500">{formatDate()}</div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
              <FiUser size={16} />
            </div>
            <span className="font-medium">Bizer Alex</span>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Menu Section */}
          <section className="w-2/3 p-6 overflow-y-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input 
                className="border rounded-lg px-4 py-2.5 w-full pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Search menu or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex flex-col items-center justify-center rounded-xl px-4 py-3 min-w-[100px] transition-all ${selectedCategory === cat.name ? 'bg-indigo-700 text-white shadow-md' : 'bg-white hover:bg-gray-100 shadow-sm'}`}
                >
                  <span className="text-xl mb-1">{cat.icon}</span>
                  <div className="font-medium text-sm">{cat.name}</div>
                  <div className="text-xs mt-1">{cat.count}</div>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['All', 'Popular', 'Running Low', 'Low', 'Sale', 'Sold Out'].map(tag => (
                <button 
                  key={tag} 
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group">
                    {item.status && (
                      <span className={`absolute top-3 left-3 text-xs ${getStatusColor(item.status)} text-white px-2 py-1 rounded-full`}>
                        {item.status}
                      </span>
                    )}
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      {/* In a real app, you would use an actual image */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {item.name.split(' ')[0]}
                      </div>
                    </div>
                    <div className="font-medium text-gray-800 truncate">{item.name}</div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-indigo-700">${item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => addItemToOrder(item)}
                        className="text-white bg-indigo-600 p-1.5 rounded-full hover:bg-indigo-700 transition group-hover:scale-110"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <FiSearch size={48} className="mb-4" />
                <p>No items found for "{searchQuery}" in {selectedCategory}</p>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <aside className="w-1/3 border-l bg-white flex flex-col">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Order #X086378</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">2 Guests</span>
              </div>
              
               <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => handleOrderTypeChange('Dine in')}
                  className={`px-3 py-1.5 text-sm rounded-lg ${orderType === 'Dine in' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                >
                  Dine in
                </button>
                <button 
                  onClick={() => {
  setOrderType('Pickup');
  setShowPickupModal(true);
}}
                  className={`px-3 py-1.5 text-sm rounded-lg ${orderType === 'Pickup' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                >
                  Pickup
                </button>
                <button 
                  onClick={() => handleOrderTypeChange('Delivery')}
                  className={`px-3 py-1.5 text-sm rounded-lg ${orderType === 'Delivery' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                >
                  Delivery
                </button>
              </div>
              
              <div className="flex gap-2 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
                  <FiUser size={16} /> Add Customer
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
                  <FiHome size={16} /> Select Table
                </button>
              </div>

              {/* Order Items */}
              {orderItems.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => removeItemFromOrder(item.id)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <div>
                          <div className="font-medium text-gray-800">{item.name}</div>
                          <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300">
                          -
                        </button>
                        <span>1</span>
                        <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300">
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500 mb-6">
                  <FiShoppingCart size={24} className="mx-auto mb-2" />
                  <p>No items selected</p>
                  <p className="text-sm">Select items from the menu to add to order</p>
                </div>
              )}

              {/* Order Actions */}
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg">
                  <FiTag size={16} /> Add Discount
                </button>
                <button className="w-full flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg">
                  <FiEdit size={16} /> Add Order Note
                </button>
              </div>
            </div>

            {/* Order Summary Footer */}
            <div className="p-6 border-t bg-white">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax 12%</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-800 pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-medium transition"
                  disabled={orderItems.length === 0}
                >
                  Save Order
                </button>
                <button 
                  className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-lg font-medium shadow-md transition"
                  disabled={orderItems.length === 0}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
{/* MODAL for Pickup */}
{showPickupModal && (
  <div className="fixed inset-0 bg-white/10 backdrop-blur flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
      {/* Modal Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Schedule Pickup</h2>
        <button 
          onClick={() => setShowPickupModal(false)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6 space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['Today', 'Tomorrow', 'Fri 28', 'Sat 29', 'Sun 30', 'Mon 31'].map((date) => (
              <button
                key={date}
                className={`px-4 py-2.5 rounded-lg border whitespace-nowrap transition-all ${
                  selectedDate === date 
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700 font-medium' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
          <div className="grid grid-cols-3 gap-2">
            {['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
              <button
                key={time}
                className={`py-2 rounded-lg border transition ${
                  selectedTime === time
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
          <input
            type="text"
            placeholder="Enter customer name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex">
            <select className="border border-gray-300 rounded-l-lg px-3 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500">
              <option>+1</option>
              <option>+44</option>
              <option>+91</option>
            </select>
            <input
              type="tel"
              placeholder="Phone number"
              className="flex-1 border-t border-r border-b border-gray-300 rounded-r-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
        <button
          onClick={() => setShowPickupModal(false)}
          className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Handle confirmation logic
            setShowPickupModal(false);
          }}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          Confirm Pickup
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}