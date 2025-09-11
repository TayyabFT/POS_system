"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
import {
  FiUsers,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiX,
  FiRefreshCw,
  FiSearch,
  FiPrinter,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

const RestaurantPOSPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("order");
  const [serviceType, setServiceType] = useState("Dine in");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showHistory, setShowHistory] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const router = useRouter();
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get user ID from localStorage
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await fetch(`${API_BASE_URL}/getorders/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        // Transform API data to match our frontend structure
        const transformedOrders = data.data.map(order => ({
          id: order.order_id,
          orderNumber: `XO${order.order_id.toString().padStart(5, '0')}`,
          tableNumber: order.table_number ? `T${order.table_number}` : "N/A",
          customer: {
            name: order.customer_name || "Walk-in Customer",
            avatar: "/diverse-woman-avatar.png",
          },
          items: order.selected_items ? order.selected_items.map(item => ({
            id: item.id,
            name: item.product_name || `Item ${item.id}`,
            quantity: item.quantity,
            price: parseFloat(item.price) || 0
          })) : [],
          guestCount: order.guest_count || 2,
          totalPrice: parseFloat(order.total) || 0,
          date: new Date(order.created_at).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          time: new Date(order.created_at).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
          status: order.completed ? "completed" : 
                 order.ready_to_serve ? "ready" : 
                 order.in_preparation ? "preparation" : "preparation",
          type: order.dining ? "dine-in" : 
                order.pickup ? "pickup" : 
                order.delivery ? "delivery" : "dine-in",
          originalData: order
        }));
        
        setOrders(transformedOrders);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Count orders by status
  const preparationCount = orders.filter(
    (order) => order.status === "preparation"
  ).length;
  const readyCount = orders.filter(
    (order) => order.status === "ready"
  ).length;
  const completedCount = orders.filter(
    (order) => order.status === "completed"
  ).length;
  const totalOrdersInQueue = orders.length;

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "preparation":
        return "bg-gray-800 text-white";
      case "ready":
        return "bg-orange-400 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "preparation":
        return "In Preparation";
      case "ready":
        return "Ready to Serve";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchOrders();
  };

  const handleMarkReady = async (orderId) => {
    try {
      setUpdatingOrderId(orderId);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/markready/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update the order status in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: "ready" };
            }
            return order;
          })
        );
        
        // Also update the selected order if it's the one being modified
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: "ready" });
        }
      } else {
        throw new Error(data.message || 'Failed to mark order as ready');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error marking order as ready:", err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleMarkCompleted = async (orderId) => {
    try {
      setUpdatingOrderId(orderId);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/markcompleted/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update the order status in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: "completed" };
            }
            return order;
          })
        );
        
        // Also update the selected order if it's the one being modified
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: "completed" });
        }
      } else {
        throw new Error(data.message || 'Failed to mark order as completed');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error marking order as completed:", err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const printOrder = (order) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate the print content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Receipt - ${order.orderNumber}</title>
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
            <div><strong>Order #:</strong> ${order.orderNumber}</div>
            <div><strong>Type:</strong> ${order.type}</div>
            <div><strong>Table:</strong> ${order.tableNumber}</div>
            <div><strong>Date:</strong> ${order.date}</div>
            <div><strong>Time:</strong> ${order.time}</div>
            <div><strong>Status:</strong> ${getStatusDisplay(order.status)}</div>
            <div><strong>Guests:</strong> ${order.guestCount}</div>
          </div>

          <div class="staff-info">
            <div><strong>Customer:</strong> ${order.customer.name}</div>
          </div>

          <div class="items">
            <div style="border-bottom: 1px dashed #000; padding-bottom: 5px; margin-bottom: 10px;">
              <strong>ITEMS:</strong>
            </div>
            ${order.items
              .map(
                (item) => `
              <div class="item">
                <div>${item.quantity}x ${item.name}</div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="totals">
            <div class="total-line">
              <span>Subtotal:</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
            <div class="total-line">
              <span>Tax (12%):</span>
              <span>${(order.totalPrice * 0.12).toFixed(2)}</span>
            </div>
            <div class="total-line total-final">
              <span>TOTAL:</span>
              <span>${(order.totalPrice * 1.12).toFixed(2)}</span>
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

  const OrderCard = ({ order }) => (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedOrder(order)}
    >
      {/* Header with Order Type and Status */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{order.type}</h3>
          <p className="text-xs text-gray-500">Order: #{order.orderNumber}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {getStatusDisplay(order.status)}
        </span>
      </div>

      {/* Table and Time Info */}
      <div className="mb-3">
        <div className="text-lg font-semibold text-gray-900 mb-1">
          {order.tableNumber}
        </div>
        <div className="text-xs text-gray-500">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              order.status === "ready"
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
        <div>{order.time}</div>
      </div>

      {/* Guests and Items Count */}
      <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
        <span className="flex items-center">
          <FiUsers className="w-3 h-3 mr-1" />
          {order.guestCount} Guests
        </span>
        <span className="flex items-center">
          <span className="w-3 h-3 mr-1 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
          </span>
          {order.items.length} Items
        </span>
      </div>

      {/* Customer Info */}
      <div className="border-t pt-3 mb-4">
        <div className="text-xs">
          <span className="text-gray-500">Customer</span>
          <div className="font-medium text-gray-900">
            {order.customer.name}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2 mb-4">
        {order.items.slice(0, 3).map((item, index) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-2">
                {item.quantity}
              </span>
              <span className="text-gray-900">{item.name}</span>
            </div>
            <span className="text-sm text-gray-600">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        {order.items.length > 3 && (
          <div className="text-xs text-gray-500">
            + {order.items.length - 3} more items
          </div>
        )}
      </div>

      {/* Total Price */}
      <div className="text-sm font-semibold text-gray-900 mb-4">
        Total: ${order.totalPrice.toFixed(2)}
      </div>

      {/* Action Buttons */}
      {order.status === "preparation" && (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMarkReady(order.id);
            }}
            disabled={updatingOrderId === order.id}
            className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {updatingOrderId === order.id ? "Updating..." : "Mark Ready"}
          </button>
        </div>
      )}

      {order.status === "ready" && (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMarkCompleted(order.id);
            }}
            disabled={updatingOrderId === order.id}
            className="flex-1 bg-green-500 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {updatingOrderId === order.id ? "Updating..." : "Mark Completed"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              printOrder(order);
            }}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            <FiPrinter className="w-4 h-4" />
          </button>
        </div>
      )}

      {order.status === "completed" && (
        <div className="flex justify-between items-center">
          <div className="text-center text-sm text-green-600 font-medium">
            Order Completed
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              printOrder(order);
            }}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            <FiPrinter className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar activeTab="kitchen" />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-500">Loading orders...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar activeTab="kitchen" />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {totalOrdersInQueue} Order{totalOrdersInQueue !== 1 ? "s" : ""}
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

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              <p>Error: {error}</p>
              <button 
                onClick={fetchOrders}
                className="mt-2 text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Status Filter */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setStatusFilter(statusFilter === "preparation" ? "all" : "preparation")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                statusFilter === "preparation"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Preparation ({preparationCount})
            </button>
            <button
              onClick={() => setStatusFilter(statusFilter === "ready" ? "all" : "ready")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                statusFilter === "ready"
                  ? "bg-orange-400 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Ready ({readyCount})
            </button>
            <button
              onClick={() => setStatusFilter(statusFilter === "completed" ? "all" : "completed")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                statusFilter === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
            {paginatedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FiSearch size={48} className="mb-4 opacity-70" />
              <p className="text-gray-500">
                {searchTerm 
                  ? `No orders found for "${searchTerm}"` 
                  : "No orders found"}
              </p>
              <button 
                onClick={fetchOrders}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Refresh Orders
              </button>
            </div>
          )}

          {/* Bottom Pagination Bar */}
          {filteredOrders.length > 0 && (
            <div className="flex justify-between items-center py-4 border-t border-gray-200 bg-white sticky bottom-0">
              <span className="text-sm text-gray-600">
                {filteredOrders.length} Order{filteredOrders.length !== 1 ? "s" : ""} in queue
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
            </div>
          )}
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
                  <p className="font-medium">Order #{selectedOrder.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.type} • {selectedOrder.tableNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.date} at {selectedOrder.time}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusDisplay(selectedOrder.status)}
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
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      ${selectedOrder.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax (12%):</span>
                    <span>
                      ${(selectedOrder.totalPrice * 0.12).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>
                      ${(selectedOrder.totalPrice * 1.12).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedOrder.status === "preparation" && (
                    <button
                      onClick={() => {
                        handleMarkReady(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      disabled={updatingOrderId === selectedOrder.id}
                      className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      {updatingOrderId === selectedOrder.id ? "Updating..." : "Mark Ready"}
                    </button>
                  )}
                  {selectedOrder.status === "ready" && (
                    <button
                      onClick={() => {
                        handleMarkCompleted(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      disabled={updatingOrderId === selectedOrder.id}
                      className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {updatingOrderId === selectedOrder.id ? "Updating..." : "Mark Completed"}
                    </button>
                  )}
                  <button
                    onClick={() => printOrder(selectedOrder)}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <FiPrinter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPOSPage;