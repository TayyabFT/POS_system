"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
import {
  FiClock,
  FiUsers,
  FiMapPin,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiEdit3,
  FiX,
  FiRefreshCw,
  FiSearch,
  FiPrinter,
} from "react-icons/fi";

// Dummy data that would come from backend
const initialOrders = [
  {
    id: "XO86378",
    type: "Dine In",
    table: "Table T1",
    time: "06:00",
    date: "Wed, March 27, 2024",
    timePosted: "7:30 PM",
    customer: { waitress: "Elena", server: "Ava" },
    status: "cooked",
    guests: 2,
    items: [
      {
        id: 1,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "Add-ons Sauce",
        size: "Size: Medium",
        hasCheckmark: true,
      },
      {
        id: 2,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "Add-ons Sauce",
        size: "Size: Medium",
      },
      {
        id: 3,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "",
        size: "",
        hasCheckmark: true,
      },
    ],
  },
  {
    id: "XO86379",
    type: "Dine In",
    table: "Harry",
    time: "06:00",
    date: "Wed, March 27, 2024",
    timePosted: "7:30 PM",
    customer: { waitress: "Elena", server: "Ava" },
    status: "cooked",
    guests: 2,
    items: [
      {
        id: 1,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "",
        size: "",
        isNewOrder: true,
      },
    ],
  },
  {
    id: "XO86380",
    type: "Dine In",
    table: "Max",
    time: "06:00",
    date: "Wed, March 27, 2024",
    timePosted: "7:30 PM",
    customer: { waitress: "Elena", server: "Ava" },
    status: "served",
    guests: 2,
    items: [
      {
        id: 1,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "Add-ons Sauce",
        size: "Size: Medium",
      },
      {
        id: 2,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "Add-ons Sauce",
        size: "Size: Medium",
      },
      {
        id: 3,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "",
        size: "",
        hasCheckmark: true,
      },
    ],
  },
  {
    id: "XO86381",
    type: "Dine In",
    table: "Table T1",
    time: "06:00",
    date: "Wed, March 27, 2024",
    timePosted: "7:30 PM",
    customer: { waitress: "Elena", server: "Ava" },
    status: "cooked",
    guests: 2,
    items: [
      {
        id: 1,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "",
        size: "",
        hasCheckmark: true,
      },
    ],
  },
  {
    id: "XO86382",
    type: "Dine In",
    table: "Table T1",
    time: "06:00",
    date: "Wed, March 27, 2024",
    timePosted: "7:30 PM",
    customer: { waitress: "Elena", server: "Ava" },
    status: "served",
    guests: 2,
    items: [
      {
        id: 1,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "",
        size: "",
      },
    ],
  },
  {
    id: "XO86383",
    type: "Dine In",
    table: "Harry",
    time: "06:00",
    date: "Wed, March 27, 2024",
    timePosted: "7:30 PM",
    customer: { waitress: "Elena", server: "Ava" },
    status: "served",
    guests: 2,
    items: [
      {
        id: 1,
        name: "Fried Beef with Paper",
        price: 15.99,
        quantity: 1,
        addOns: [],
        sauce: "",
        size: "",
      },
    ],
  },
];

// History orders (mock data for history functionality)
const historyOrders = [
  {
    id: "XO86300",
    type: "Dine In",
    table: "Table T2",
    time: "05:30",
    date: "Wed, March 27, 2024",
    timePosted: "6:00 PM",
    customer: { waitress: "Elena", server: "Ava" },
    status: "completed",
    guests: 4,
    items: [{ id: 1, name: "Grilled Chicken", price: 18.99, quantity: 2 }],
  },
];

const RestaurantPOSPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("order");
  const [serviceType, setServiceType] = useState("Dine in");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'cooked', 'served'
  const [showHistory, setShowHistory] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter orders based on search and status
  const filteredOrders = showHistory
    ? historyOrders
    : orders.filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.table.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
      });

  // Count orders by status
  const cookedCount = orders.filter(
    (order) => order.status === "cooked"
  ).length;
  const servedCount = orders.filter(
    (order) => order.status === "served"
  ).length;
  const totalOrdersInQueue = orders.length;

  // Pagination
  const ordersPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "cooked":
        return "bg-gray-800 text-white";
      case "served":
        return "bg-orange-400 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In real implementation, you would fetch fresh data from API
    setOrders([...orders]); // Refresh with same data for demo
    setIsRefreshing(false);
  };

  const handleHistory = () => {
    setShowHistory(!showHistory);
    setCurrentPage(1);
  };

  const updateItemQuantity = (orderId, itemId, change) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items
                .map((item) =>
                  item.id === itemId
                    ? { ...item, quantity: Math.max(0, item.quantity + change) }
                    : item
                )
                .filter((item) => item.quantity > 0),
            }
          : order
      )
    );
  };

  const removeItem = (orderId, itemId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.filter((item) => item.id !== itemId),
            }
          : order
      )
    );
  };

  const startOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "cooking" } : order
      )
    );
  };

  const finishOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "served" } : order
      )
    );
  };

  const printOrder = (orderId) => {
    const order =
      orders.find((o) => o.id === orderId) ||
      historyOrders.find((o) => o.id === orderId);
    if (!order) return;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate the print content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Receipt - ${order.id}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            line-height: 1.4;
          }
          .receipt {
            max-width: 300px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .restaurant-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .order-info {
            margin-bottom: 15px;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          .order-info div {
            margin-bottom: 3px;
          }
          .items {
            margin-bottom: 15px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            padding: 2px 0;
          }
          .item-details {
            font-size: 10px;
            color: #666;
            margin-left: 10px;
            margin-bottom: 5px;
          }
          .totals {
            border-top: 1px solid #000;
            padding-top: 10px;
            margin-top: 15px;
          }
          .total-line {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
          }
          .total-final {
            font-weight: bold;
            font-size: 14px;
            border-top: 1px solid #000;
            padding-top: 5px;
            margin-top: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px dashed #000;
            font-size: 10px;
          }
          .staff-info {
            margin-top: 10px;
            font-size: 10px;
          }
          @media print {
            body { margin: 0; padding: 10px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="restaurant-name">XO RESTAURANT</div>
            <div>Order Receipt</div>
          </div>
          
          <div class="order-info">
            <div><strong>Order #:</strong> ${order.id}</div>
            <div><strong>Type:</strong> ${order.type}</div>
            <div><strong>Table:</strong> ${order.table}</div>
            <div><strong>Date:</strong> ${order.date}</div>
            <div><strong>Time:</strong> ${order.time}</div>
            <div><strong>Status:</strong> ${order.status.toUpperCase()}</div>
            <div><strong>Guests:</strong> ${order.guests}</div>
          </div>

          <div class="staff-info">
            <div><strong>Waitress:</strong> ${order.customer.waitress}</div>
            <div><strong>Server:</strong> ${order.customer.server}</div>
          </div>

          <div class="items">
            <div style="border-bottom: 1px dashed #000; padding-bottom: 5px; margin-bottom: 10px;">
              <strong>ITEMS:</strong>
            </div>
            ${order.items
              .map(
                (item) => `
              <div class="item">
                <div>
                  <div>${item.quantity}x ${item.name}</div>
                  ${
                    item.sauce
                      ? `<div class="item-details">${item.sauce}</div>`
                      : ""
                  }
                  ${
                    item.size
                      ? `<div class="item-details">${item.size}</div>`
                      : ""
                  }
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="totals">
            <div class="total-line">
              <span>Subtotal:</span>
              <span>${calculateTotal(order.items).toFixed(2)}</span>
            </div>
            <div class="total-line">
              <span>Tax (12%):</span>
              <span>${(calculateTotal(order.items) * 0.12).toFixed(2)}</span>
            </div>
            <div class="total-line total-final">
              <span>TOTAL:</span>
              <span>${(calculateTotal(order.items) * 1.12).toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <div>Thank you for your visit!</div>
            <div>Printed: ${new Date().toLocaleString()}</div>
            <div class="no-print">
              <button onclick="window.print()" style="margin: 10px; padding: 10px 20px; background: #000; color: white; border: none; cursor: pointer;">Print Receipt</button>
              <button onclick="window.close()" style="margin: 10px; padding: 10px 20px; background: #666; color: white; border: none; cursor: pointer;">Close</button>
            </div>
          </div>
        </div>

        <script>
          // Auto print when page loads
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
      </html>
    `;

    // Write content to the new window
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Focus the print window
    printWindow.focus();
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const OrderCard = ({ order }) => (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedOrder(order)}
    >
      {/* Header with Order Type and Status */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{order.type}</h3>
          <p className="text-xs text-gray-500">Order: #{order.id}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Table and Time Info */}
      <div className="mb-3">
        <div className="text-lg font-semibold text-gray-900 mb-1">
          {order.table}
        </div>
        <div className="text-xs text-gray-500">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              order.status === "served"
                ? "bg-orange-100 text-orange-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {order.time}
          </span>
        </div>
      </div>

      {/* Date and Time Posted */}
      <div className="text-xs text-gray-500 mb-3">
        <div>{order.date}</div>
        <div>{order.timePosted}</div>
      </div>

      {/* Guests and Items Count */}
      <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
        <span className="flex items-center">
          <FiUsers className="w-3 h-3 mr-1" />
          {order.guests} Guests
        </span>
        <span className="flex items-center">
          <span className="w-3 h-3 mr-1 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
          </span>
          {order.items.length} Items
        </span>
      </div>

      {/* Staff Info */}
      <div className="border-t pt-3 mb-4">
        <div className="flex justify-between text-xs">
          <div>
            <span className="text-gray-500">Waitress</span>
            <div className="font-medium text-gray-900">
              {order.customer.waitress}
            </div>
          </div>
          <div className="text-right">
            <span className="text-gray-500">Customer</span>
            <div className="font-medium text-gray-900">
              {order.customer.server}
            </div>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              {item.isNewOrder && (
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              )}
              <span className="font-medium text-gray-700 mr-2">
                {item.quantity}
              </span>
              <span className="text-gray-900">{item.name}</span>
              {item.hasCheckmark && (
                <div className="ml-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            {order.status === "served" && (
              <button className="text-gray-400 hover:text-gray-600">
                <FiPrinter className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {/* Additional item details */}
        {order.items[0]?.sauce && (
          <div className="text-xs text-gray-500 ml-6 -mt-1">
            {order.items[0].sauce}
          </div>
        )}
        {order.items[0]?.size && (
          <div className="text-xs text-gray-500 ml-6">
            {order.items[0].size}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {order.status === "cooked" && (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              startOrder(order.id);
            }}
            className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Start
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              finishOrder(order.id);
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Finish
          </button>
        </div>
      )}

      {order.status === "served" && (
        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              printOrder(order.id);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <FiPrinter className="w-4 h-4" />
            Print
          </button>
        </div>
      )}

      {order.status === "completed" && (
        <div className="text-center text-sm text-green-600 font-medium">
          Order Completed
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {showHistory
                  ? "Order History"
                  : `${totalOrdersInQueue} Order${
                      totalOrdersInQueue !== 1 ? "s" : ""
                    }`}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 text-blue-600 text-sm hover:text-blue-700 disabled:opacity-50"
              >
                <FiRefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <div className="relative">
                <FiSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Status Filter */}
          {!showHistory && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={() =>
                  setStatusFilter(statusFilter === "cooked" ? "all" : "cooked")
                }
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  statusFilter === "cooked"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Cooked ({cookedCount})
              </button>
              <button
                onClick={() =>
                  setStatusFilter(statusFilter === "served" ? "all" : "served")
                }
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  statusFilter === "served"
                    ? "bg-orange-400 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Served ({servedCount})
              </button>
            </div>
          )}

          {/* Orders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
            {paginatedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Bottom Pagination Bar */}
          <div className="flex justify-between items-center py-4 border-t border-gray-200 bg-white sticky bottom-0">
            <span className="text-sm text-gray-600">
              {filteredOrders.length} Order
              {filteredOrders.length !== 1 ? "s" : ""}{" "}
              {showHistory ? "in history" : "in queue"}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                «
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + Math.max(1, currentPage - 2);
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded text-sm ${
                      currentPage === pageNum
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <span className="text-gray-400 text-sm">...</span>
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                »
              </button>
            </div>

            <button
              onClick={handleHistory}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              {showHistory ? "Back to Orders" : "History"}
            </button>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="border-b pb-4">
                  <p className="font-medium">Order #{selectedOrder.id}</p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.type} • {selectedOrder.table}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.date} at {selectedOrder.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.timePosted}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          {item.hasCheckmark && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        {!showHistory && (
                          <button
                            onClick={() =>
                              removeItem(selectedOrder.id, item.id)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {!showHistory && (
                            <>
                              <button
                                onClick={() =>
                                  updateItemQuantity(
                                    selectedOrder.id,
                                    item.id,
                                    -1
                                  )
                                }
                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                            </>
                          )}
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          {!showHistory && (
                            <button
                              onClick={() =>
                                updateItemQuantity(selectedOrder.id, item.id, 1)
                              }
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {item.sauce && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.sauce}
                        </p>
                      )}
                      {item.size && (
                        <p className="text-xs text-gray-500">{item.size}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      ${calculateTotal(selectedOrder.items).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax (12%):</span>
                    <span>
                      ${(calculateTotal(selectedOrder.items) * 0.12).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>
                      ${(calculateTotal(selectedOrder.items) * 1.12).toFixed(2)}
                    </span>
                  </div>
                </div>

                {!showHistory && (
                  <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      router.push("/payment");
                    }}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPOSPage;
