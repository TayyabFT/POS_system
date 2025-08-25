"use client";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import CreateGroupOrderModal from "@/components/GroupModal";
import {
  FiHome,
  FiUsers,
  FiBarChart,
  FiSearch,
  FiMoreHorizontal,
  FiClock,
  FiUser,
  FiChevronDown,
  FiX,
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiBook,
  FiPause,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
const TableReservationSystem = () => {
  const [groupModal, setGroupModal] = useState(false);
  const [currentView, setCurrentView] = useState("tables"); // 'tables', 'selectTable', 'guestNumber', 'order'
  const [activeTab, setActiveTab] = useState("Main Floor");
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  // Dummy table data - Replace with API call
  const tables = [
    { id: "T1", capacity: 2, status: "available", floor: "main", x: 1, y: 1 },
    { id: "T2", capacity: 2, status: "available", floor: "main", x: 2, y: 1 },
    {
      id: "T3",
      capacity: 2,
      status: "occupied",
      time: "15 Min",
      orders: 3,
      floor: "main",
      x: 3,
      y: 1,
    },
    { id: "T4", capacity: 2, status: "available", floor: "main", x: 4, y: 1 },
    { id: "T5", capacity: 2, status: "available", floor: "main", x: 0, y: 1 },
    {
      id: "T6",
      capacity: 2,
      status: "occupied",
      time: "25 Min",
      orders: 2,
      floor: "main",
      x: 5,
      y: 1,
    },
    { id: "T7", capacity: 2, status: "available", floor: "main", x: 6, y: 1 },
    {
      id: "T8",
      capacity: 4,
      status: "occupied",
      time: "45 Min",
      orders: 8,
      floor: "main",
      x: 0,
      y: 2,
    },
    {
      id: "T9",
      capacity: 4,
      status: "occupied",
      time: "30 Min",
      orders: 5,
      floor: "main",
      x: 1,
      y: 2,
    },
    { id: "T10", capacity: 6, status: "available", floor: "main", x: 0, y: 3 },
    { id: "T11", capacity: 6, status: "available", floor: "main", x: 1, y: 3 },
    { id: "T12", capacity: 6, status: "available", floor: "main", x: 2, y: 3 },
    { id: "T13", capacity: 6, status: "available", floor: "main", x: 3, y: 3 },
    { id: "T14", capacity: 6, status: "available", floor: "main", x: 4, y: 3 },
    {
      id: "T15",
      capacity: 6,
      status: "occupied",
      time: "20 Min",
      orders: 6,
      floor: "main",
      x: 5,
      y: 3,
    },
    { id: "T16", capacity: 6, status: "available", floor: "main", x: 6, y: 3 },
    { id: "T17", capacity: 6, status: "available", floor: "main", x: 0, y: 4 },
    { id: "T18", capacity: 6, status: "available", floor: "main", x: 1, y: 4 },
    { id: "T19", capacity: 6, status: "available", floor: "main", x: 2, y: 4 },
    { id: "T20", capacity: 8, status: "reserved", floor: "main", x: 0, y: 5 },
    { id: "T21", capacity: 8, status: "reserved", floor: "main", x: 1, y: 5 },
  ];

  // Dummy menu data - Replace with API call
  const menuCategories = ["Breakfast", "Lunch", "Main Courses", "Dessert"];

  const menuItems = {
    Breakfast: [
      {
        id: 1,
        name: "Fettuccine with Spinach",
        price: 15.0,
        image: "/api/placeholder/80/80",
        popular: true,
      },
      {
        id: 2,
        name: "Black Bean Quesadilla",
        price: 15.0,
        image: "/api/placeholder/80/80",
        popular: false,
      },
    ],
    Lunch: [
      {
        id: 3,
        name: "Caesar Salad",
        price: 12.0,
        image: "/api/placeholder/80/80",
        popular: false,
      },
      {
        id: 4,
        name: "Grilled Chicken",
        price: 18.0,
        image: "/api/placeholder/80/80",
        popular: true,
      },
    ],
    "Main Courses": [
      {
        id: 5,
        name: "Moroccan Eggplant",
        price: 22.0,
        image: "/api/placeholder/80/80",
        popular: false,
      },
      {
        id: 6,
        name: "Grilled Lamb",
        price: 28.0,
        image: "/api/placeholder/80/80",
        popular: true,
      },
    ],
    Dessert: [
      {
        id: 7,
        name: "Chocolate Cake",
        price: 8.0,
        image: "/api/placeholder/80/80",
        popular: true,
      },
      {
        id: 8,
        name: "Ice Cream",
        price: 6.0,
        image: "/api/placeholder/80/80",
        popular: false,
      },
    ],
  };

  const formatDate = () => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const getTableStatusColor = (status) => {
    switch (status) {
      case "occupied":
        return "bg-blue-500";
      case "reserved":
        return "bg-cyan-500";
      case "available":
      default:
        return "bg-gray-300";
    }
  };

  const getTableTextColor = (status) => {
    return status === "available" ? "text-gray-700" : "text-white";
  };

  const handleTableClick = (table) => {
    if (currentView === "tables") {
      if (table.status === "occupied") {
        // Go directly to order view for occupied tables
        setSelectedTable(table);
        setCurrentView("order");
      }
    } else if (currentView === "selectTable" && table.status === "available") {
      setSelectedTable(table);
      setCurrentView("guestNumber");
    }
  };

  const handleGuestSelection = () => {
    setCurrentView("order");
  };

  const handleMakeNewOrder = () => {
    setCurrentView("selectTable");
    // router.push("/pos");
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const TabButton = ({ active, children, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border border-gray-200 font-medium transition cursor-pointer text-sm ${
        active
          ? "bg-black text-white shadow hover:bg-gray-800"
          : "text-gray-600 hover:text-black bg-white"
      }`}
    >
      {children}
    </button>
  );

  // Render different views based on current state
  const renderHeader = () => <Navbar />;

  const renderControls = () => (
    <div className="bg-white  p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Tab buttons instead of dropdowns */}
          <div className="flex items-center gap-2 border border-black rounded-full">
            <button
              onClick={() => setActiveTab("Main Floor")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                activeTab === "Main Floor"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Main Floor
            </button>
            <button
              onClick={() => setActiveTab("Dining Room")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                activeTab === "Dining Room"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Dining Room
            </button>
            <button
              onClick={() => setActiveTab("Bar")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                activeTab === "Bar"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Bar
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex gap-1 px-3 py-1.5 rounded-full border border-black text-sm font-medium transition hover:bg-black hover:text-white">
            <FiPause size={20} /> Board
          </button>
          <button className="flex gap-1 px-3 py-1.5 rounded-full border border-black text-sm font-medium transition hover:bg-black hover:text-white">
            <FiBook size={20} />
            Properties
          </button>
          <button className="flex gap-1 px-3 py-1.5 rounded-full border border-black text-sm font-medium transition hover:bg-black hover:text-white">
            <FiSearch size={20} /> Search
          </button>

          {/* Dropdown for Make New Order */}
          <div className="relative">
            <button
              onClick={() => {
                if (activeTab === "Dining Room" || activeTab === "Bar") {
                  setCurrentView("guestNumber");
                } else {
                  setShowOrderDropdown(!showOrderDropdown);
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition flex items-center gap-2"
            >
              {activeTab === "Dining Room" || activeTab === "Bar"
                ? "+Make Order"
                : "Make Order"}
              {!(activeTab === "Dining Room" || activeTab === "Bar") && (
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showOrderDropdown ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {showOrderDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-full">
                <button
                  onClick={() => {
                    handleMakeNewOrder();
                    setShowOrderDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg transition-colors"
                >
                  Create Order
                </button>
                <button
                  onClick={() => {
                    setGroupModal(true);
                    setShowOrderDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 last:rounded-b-lg transition-colors border-t border-gray-100"
                >
                  Create Group Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTables = () => {
    // Filter tables based on active tab
    let filteredTables = tables;
    if (activeTab === "Main Floor") {
      // Show all tables for main floor
      filteredTables = tables.filter((t) => t.floor === "main");
    } else if (activeTab === "Dining Room") {
      // Show dining room specific tables
      filteredTables = tables.filter(
        (t) => t.floor === "main" && t.capacity >= 4
      );
    } else if (activeTab === "Bar") {
      // Show bar specific tables (smaller tables)
      filteredTables = tables.filter(
        (t) => t.floor === "main" && t.capacity <= 4
      );
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab}
              </h2>
              <span className="text-sm text-gray-600">40% (2/5)</span>
            </div>
            {currentView === "selectTable" && (
              <button
                onClick={() => setCurrentView("tables")}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* 2 Person Tables */}
          {filteredTables.some((t) => t.capacity === 2) && (
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <span>2 Person</span>
              </div>
              <div className="grid grid-cols-7 gap-4">
                {filteredTables
                  .filter((t) => t.capacity === 2)
                  .map((table) => (
                    <div
                      key={table.id}
                      onClick={() => handleTableClick(table)}
                      className={`${getTableStatusColor(
                        table.status
                      )} rounded-lg p-3 cursor-pointer hover:opacity-90 transition-opacity ${
                        currentView === "selectTable" &&
                        table.status !== "available"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div
                        className={`text-center ${getTableTextColor(
                          table.status
                        )}`}
                      >
                        <div className="font-semibold text-lg mb-1">
                          {table.id}
                        </div>
                        {table.status === "occupied" && (
                          <div className="text-xs">
                            <div>{table.time}</div>
                            <div>{table.orders} Orders</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 4 Person Tables */}
          {filteredTables.some((t) => t.capacity === 4) && (
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <span>4 Person</span>
              </div>
              <div className="flex gap-4">
                {filteredTables
                  .filter((t) => t.capacity === 4)
                  .map((table) => (
                    <div
                      key={table.id}
                      onClick={() => handleTableClick(table)}
                      className={`${getTableStatusColor(
                        table.status
                      )} rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity ${
                        currentView === "selectTable" &&
                        table.status !== "available"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div
                        className={`text-center ${getTableTextColor(
                          table.status
                        )}`}
                      >
                        <div className="font-semibold text-lg mb-1">
                          {table.id}
                        </div>
                        {table.status === "occupied" && (
                          <div className="text-xs">
                            <div>{table.time}</div>
                            <div>{table.orders} Orders</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {groupModal && (
            <CreateGroupOrderModal
              groupModal={groupModal}
              setGroupModal={setGroupModal}
            />
          )}
          {/* 6 Person Tables */}
          {filteredTables.some((t) => t.capacity === 6) && (
            <div className="grid grid-cols-7 gap-4">
              {filteredTables
                .filter((t) => t.capacity === 6)
                .map((table) => (
                  <div
                    key={table.id}
                    onClick={() => handleTableClick(table)}
                    className={`${getTableStatusColor(
                      table.status
                    )} rounded-lg p-3 cursor-pointer hover:opacity-90 transition-opacity ${
                      currentView === "selectTable" &&
                      table.status !== "available"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <div
                      className={`text-center ${getTableTextColor(
                        table.status
                      )}`}
                    >
                      <div className="font-semibold text-lg mb-1">
                        {table.id}
                      </div>
                      {table.status === "occupied" && (
                        <div className="text-xs">
                          <div>{table.time}</div>
                          <div>{table.orders} Orders</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* 8 Person Tables */}
          {filteredTables.some((t) => t.capacity === 8) && (
            <div className="flex gap-4">
              {filteredTables
                .filter((t) => t.capacity === 8)
                .map((table) => (
                  <div
                    key={table.id}
                    onClick={() => handleTableClick(table)}
                    className={`${getTableStatusColor(
                      table.status
                    )} rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity ${
                      currentView === "selectTable" &&
                      table.status !== "available"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <div
                      className={`text-center ${getTableTextColor(
                        table.status
                      )}`}
                    >
                      <div className="font-semibold text-lg mb-1">
                        {table.id}
                      </div>
                      {table.status === "occupied" && (
                        <div className="text-xs">
                          <div>{table.time}</div>
                          <div>{table.orders} Orders</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Status Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              Table Status
            </span>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Served</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="text-gray-600">Reserved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGuestNumberModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Number of Guest</h3>
          <button
            onClick={() => setCurrentView("selectTable")}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <label key={num} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="guests"
                value={num}
                checked={guestCount === num}
                onChange={() => setGuestCount(num)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{num}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleGuestSelection}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Select
        </button>
      </div>
    </div>
  );

  const renderOrderInterface = () => (
    <div className="flex gap-6 h-screen bg-gray-50 pt-6">
      {/* Left Panel - Menu */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Make Group Order</h2>

          {/* Search */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-6">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems[activeCategory]?.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-3">
                <img
                  src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop&crop=faces`}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {item.name}
                    </h4>
                    {item.popular && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 w-full bg-blue-500 text-white py-1.5 rounded text-sm hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Order Summary */}
      <div className="w-80 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Table {selectedTable?.id}</h3>
          <button
            onClick={() => setCurrentView("tables")}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          {guestCount} Guest{guestCount > 1 ? "s" : ""}
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items added yet</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
              >
                <img
                  src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=40&h=40&fit=crop&crop=faces`}
                  alt={item.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-sm">{item.name}</h5>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                  >
                    <FiMinus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                  >
                    <FiPlus size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        {cart.length > 0 && (
          <>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition">
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex  bg-white font-sans text-gray-900 h-screen ">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <Navbar activeTab="table" />

        <div className="p-6 overflow-y-auto">
          {(currentView === "tables" || currentView === "selectTable") &&
            renderControls()}
          {(currentView === "tables" || currentView === "selectTable") &&
            renderTables()}
          {currentView === "guestNumber" && renderGuestNumberModal()}
          {currentView === "order" && renderOrderInterface()}
        </div>
      </main>
    </div>
  );
};

export default TableReservationSystem;
