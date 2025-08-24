"use client";
import React, { useState } from "react";
import {
  FiUser,
  FiClock,
  FiX,
  FiPlus,
  FiMinus,
  FiSearch,
  FiFilter,
  FiSettings,
  FiHome,
  FiBarChart2,
  FiCalendar,
  FiShoppingCart,
  FiMenu,
  FiBell,
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import Navbar from "./navbar";

import Sidebar from "./Sidebar";

const RestaurantPOS = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAllOrdersModal, setShowAllOrdersModal] = useState(false);
  const [orderType, setOrderType] = useState("Dine In");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedOrderFilter, setSelectedOrderFilter] = useState("All");
  const [menuFilter, setMenuFilter] = useState("Most Ordered"); // New state for menu filtering

  // Sample data based on the UI
  const tabButtons = ["XO POS", "Order", "Reservation", "Transaction", "Table"];

  const statsData = [
    { label: "Ongoing Order", value: "5", change: "+34%", color: "blue" },
    { label: "Total Order", value: "212", change: "+34%", color: "green" },
    { label: "Tip Amount", value: "$800", change: "+34%", color: "orange" },
    { label: "Revenue", value: "$1,800", change: "+24%", color: "purple" },
    { label: "Paid Order", value: "45", change: "+24%", color: "teal" },
    { label: "Dishes Sold", value: "180", change: "+7%", color: "pink" },
  ];

  // Most Ordered Items Data
  const mostOrderedItems = [
    {
      id: 1,
      name: "Classic Beef Burger",
      price: "$15.99",
      image: "🍔",
      tag: "#1 Most Ordered",
      tagColor: "green",
      orders: 245,
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: "$18.99",
      image: "🍕",
      tag: "#2 Most Ordered",
      tagColor: "green",
      orders: 198,
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: "$12.99",
      image: "🥗",
      tag: "#3 Most Ordered",
      tagColor: "green",
      orders: 176,
    },
  ];

  // Today's Special Items Data
  const todaySpecials = [
    {
      id: 4,
      name: "Spicy Healthy Sauteed Tofu",
      price: "$12.99",
      image: "🍲",
      tag: "Chef's Special",
      tagColor: "orange",
      discount: "20% OFF",
    },
    {
      id: 5,
      name: "Grilled Salmon Bowl",
      price: "$22.99",
      image: "🐟",
      tag: "Today Only",
      tagColor: "orange",
      discount: "15% OFF",
    },
    {
      id: 6,
      name: "Veggie Ramen Bowl",
      price: "$14.99",
      image: "🍜",
      tag: "Limited Time",
      tagColor: "orange",
      discount: "10% OFF",
    },
  ];

  // Get current items based on filter
  const getCurrentItems = () => {
    return menuFilter === "Most Ordered" ? mostOrderedItems : todaySpecials;
  };

  const ongoingOrders = [
    {
      id: "XO86378",
      customer: "Ava Max",
      table: "T1",
      total: "+$56",
      time: "9 Jul, 2024 • 04:27 PM",
      status: "Success",
      items: ["Spicy Tofu", "Green Salad"],
      orderType: "Dine In",
    },
    {
      id: "XO86379",
      customer: "Ava Max",
      table: "T3",
      total: "+$32",
      time: "9 Jul, 2024 • 04:27 PM",
      status: "Pending",
      items: ["Healthy Bowl"],
      orderType: "Takeout",
    },
  ];

  // Extended orders list for "View All Orders"
  const allOrders = [
    ...ongoingOrders,
    {
      id: "XO86380",
      customer: "John Doe",
      table: "T5",
      total: "+$78",
      time: "9 Jul, 2024 • 03:15 PM",
      status: "Completed",
      items: ["Pasta", "Caesar Salad", "Coffee"],
      orderType: "Dine In",
    },
    {
      id: "XO86381",
      customer: "Sarah Wilson",
      table: "T2",
      total: "+$45",
      time: "9 Jul, 2024 • 02:30 PM",
      status: "Cancelled",
      items: ["Burger", "Fries"],
      orderType: "Delivery",
    },
    {
      id: "XO86382",
      customer: "Mike Johnson",
      table: "T7",
      total: "+$89",
      time: "9 Jul, 2024 • 01:45 PM",
      status: "Completed",
      items: ["Steak", "Mashed Potatoes", "Wine"],
      orderType: "Dine In",
    },
    {
      id: "XO86383",
      customer: "Emma Brown",
      table: "T4",
      total: "+$23",
      time: "9 Jul, 2024 • 12:20 PM",
      status: "Success",
      items: ["Soup", "Bread"],
      orderType: "Takeout",
    },
  ];

  const upcomingReservations = [
    {
      id: "03",
      table: "T1",
      customer: "Jonathan Kelly",
      details: "Main Floor • 2 guests",
      time: "7:00 PM",
      status: "Arrived",
      phone: "+1 234-567-8900",
      date: "Today",
    },
    {
      id: "04",
      table: "T3",
      customer: "Sarah Mitchell",
      details: "Patio • 4 guests",
      time: "8:30 PM",
      status: "Confirmed",
      phone: "+1 234-567-8901",
      date: "Today",
    },
  ];

  const addToOrder = (item) => {
    const existingItem = selectedItems.find(
      (selected) => selected.id === item.id
    );
    if (existingItem) {
      setSelectedItems((prev) =>
        prev.map((selected) =>
          selected.id === item.id
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      case "arrived":
        return "text-green-600 bg-green-100";
      case "confirmed":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredOrders =
    selectedOrderFilter === "All"
      ? allOrders
      : allOrders.filter(
          (order) =>
            order.status.toLowerCase() === selectedOrderFilter.toLowerCase()
        );

  const OrderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-96 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Make Order</h3>
          <button
            onClick={() => setShowOrderModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Order Type
              </label>
              <div className="flex gap-2">
                {["Dine In", "Takeout", "Delivery"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      orderType === type
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Guests
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <FiMinus size={16} />
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {guestCount}
                </span>
                <button
                  onClick={() => setGuestCount(guestCount + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Selected Items</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">x{item.quantity}</span>
                        <span className="text-sm font-semibold">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                alert("Order placed successfully!");
                setShowOrderModal(false);
                setSelectedItems([]);
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AllOrdersModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-6xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold">All Orders</h3>
            <div className="flex items-center gap-2">
              <select
                value={selectedOrderFilter}
                onChange={(e) => setSelectedOrderFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="All">All Orders</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowAllOrdersModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6  max-h-[calc(80vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg">
                      Order #{order.id}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.customer}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span>Table:</span>
                    <span className="font-medium">{order.table}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Type:</span>
                    <span>{order.orderType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-semibold text-green-600">
                      {order.total}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{order.time}</div>
                </div>

                <div className="mb-3">
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    Items:
                  </div>
                  <div className="text-xs text-gray-600">
                    {order.items.join(", ")}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                    <FiEye size={14} />
                    View
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                    <FiEdit size={14} />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No orders found</div>
              <div className="text-gray-400 text-sm">
                Try adjusting your filter settings
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex  bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <div className="flex-1 ">
        {/* Header */}
        <Navbar activeTab="overview" />

        {/* Main Content */}
        <main className="p-6 ">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold">Overview</h1>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 text-sm">
                <FiCalendar size={16} />
                <span>Feb 7 - Feb 9</span>
              </div>
              <button
                onClick={() => setShowOrderModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Make Order
              </button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {/* Left Content */}
            <div className="col-span-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {stat.label}
                      </span>
                      <span className={`text-xs text-green-500`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className="text-xs text-gray-500">vs yesterday</div>
                  </div>
                ))}
              </div>

              {/* Today Upscale Section */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Today Upscale</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMenuFilter("Most Ordered")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        menuFilter === "Most Ordered"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Most Ordered
                    </button>
                    <button
                      onClick={() => setMenuFilter("Today Special")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        menuFilter === "Today Special"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Today Special
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {getCurrentItems().map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="relative mb-3">
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                          {item.image}
                        </div>
                        <span
                          className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${
                            item.tagColor === "green"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {item.tag}
                        </span>
                        {item.discount && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.discount}
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{item.price}</span>
                          <button
                            onClick={() => addToOrder(item)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        {item.orders && (
                          <div className="text-xs text-gray-500">
                            {item.orders} orders this month
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Ongoing Orders */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold mb-4">📊 Ongoing Order</h3>
                <div className="space-y-3">
                  {ongoingOrders.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {order.table}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            Order#{order.id}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                            <FiUser size={14} className="text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {order.customer}
                            </div>
                            <div className="text-xs text-green-600">
                              {order.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Reservations */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">📊 Upcoming Reservation</h3>
                  <button
                    onClick={() => setShowAllOrdersModal(true)}
                    className="text-blue-500 text-sm hover:text-blue-600"
                  >
                    View All Order
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingReservations.map((reservation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {reservation.table}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {reservation.customer}
                          </div>
                          <div className="text-xs text-gray-500">
                            {reservation.details}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {reservation.time}
                        </div>
                        {reservation.status && (
                          <div className="text-xs text-green-600">
                            {reservation.status}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        {showOrderModal && <OrderModal />}
        {showAllOrdersModal && <AllOrdersModal />}
      </div>
    </div>
  );
};

export default RestaurantPOS;
