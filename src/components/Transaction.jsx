"use client";
import { useState } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import OrderDetailModal from "./order-detail-modal";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";

const initialOrders = [
  {
    id: 1,
    orderNumber: "XO68378",
    tableNumber: "T1",
    customer: {
      name: "Ava Max",
      avatar: "/diverse-woman-avatar.png",
    },
    items: [
      { id: 1, name: "Fried Beef with Paper", quantity: 1, price: 17.5 },
      { id: 2, name: "Fried Beef with Paper", quantity: 2, price: 17.5 },
      { id: 3, name: "Fried Beef with Paper", quantity: 1, price: 17.5 },
    ],
    guestCount: 3,
    totalPrice: 52.5,
    date: "Wed, March 27, 2024",
    time: "7:30 PM",
    status: "preparation",
    type: "dine-in",
  },
  {
    id: 2,
    orderNumber: "XO68379",
    tableNumber: "T3",
    customer: {
      name: "Erica Wyatt",
      avatar: "/woman-avatar-2.png",
    },
    items: [
      { id: 1, name: "Fried Beef with Paper", quantity: 1, price: 17.5 },
      { id: 2, name: "Caesar Salad", quantity: 1, price: 12.0 },
    ],
    guestCount: 2,
    totalPrice: 29.5,
    date: "Wed, March 27, 2024",
    time: "7:30 PM",
    status: "preparation",
    type: "dine-in",
  },
  {
    id: 3,
    orderNumber: "XO68380",
    tableNumber: "T5",
    customer: {
      name: "John Smith",
      avatar: "/diverse-woman-avatar.png",
    },
    items: [{ id: 1, name: "Grilled Chicken", quantity: 2, price: 15.0 }],
    guestCount: 4,
    totalPrice: 30.0,
    date: "Wed, March 27, 2024",
    time: "7:45 PM",
    status: "ready",
    type: "dine-in",
  },
  {
    id: 4,
    orderNumber: "XO68381",
    tableNumber: "T2",
    customer: {
      name: "Sarah Johnson",
      avatar: "/woman-avatar-2.png",
    },
    items: [{ id: 1, name: "Pasta Carbonara", quantity: 1, price: 22.0 }],
    guestCount: 2,
    totalPrice: 22.0,
    date: "Wed, March 27, 2024",
    time: "7:15 PM",
    status: "ready",
    type: "dine-in",
  },
];

export default function POSSystemEnhanced() {
  const [activeMainTab, setActiveMainTab] = useState("running-order");
  const [activeTab, setActiveTab] = useState("dine-in");
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleMarkReady = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          let newStatus = order.status;
          if (order.status === "preparation") newStatus = "ready";
          else if (order.status === "ready") newStatus = "completed";
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  const handleCancelTransaction = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
    handleCloseModal();
  };

  const getStatusCounts = () => {
    const filteredByType = orders.filter((order) => order.type === activeTab);
    const counts = {
      preparation: filteredByType.filter(
        (order) => order.status === "preparation"
      ).length,
      ready: filteredByType.filter((order) => order.status === "ready").length,
      completed: filteredByType.filter((order) => order.status === "completed")
        .length,
    };
    return counts;
  };

  const handleStatusFilter = (status) => {
    if (activeStatusFilter === status) {
      setActiveStatusFilter(null);
    } else {
      setActiveStatusFilter(status);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab = order.type === activeTab;
    const matchesStatus = activeStatusFilter
      ? order.status === activeStatusFilter
      : true;
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const statusCounts = getStatusCounts();

  const renderMainTabContent = () => {
    if (activeMainTab === "transaction") {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Transaction
            </h2>
            <p className="text-gray-600">
              Transaction management coming soon...
            </p>
          </div>
        </div>
      );
    }

    if (activeMainTab === "complete-order") {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Complete Order
            </h2>
            <p className="text-gray-600">
              Completed orders management coming soon...
            </p>
          </div>
        </div>
      );
    }

    if (activeMainTab === "dashboard") {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Dashboard
            </h2>
            <p className="text-gray-600">Dashboard analytics coming soon...</p>
          </div>
        </div>
      );
    }

    if (activeMainTab === "menu") {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Menu Management
            </h2>
            <p className="text-gray-600">Menu management coming soon...</p>
          </div>
        </div>
      );
    }

    if (activeMainTab === "customers") {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Customers
            </h2>
            <p className="text-gray-600">Customer management coming soon...</p>
          </div>
        </div>
      );
    }

    if (activeMainTab === "analytics") {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Analytics
            </h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        </div>
      );
    }

    if (activeMainTab === "settings") {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Settings
            </h2>
            <p className="text-gray-600">System settings coming soon...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Fixed Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex justify-between space-x-6">
            <h1 className="text-xl font-semibold text-gray-900">
              Running Order
            </h1>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              + Make New Order
            </button>
          </div>

          {/* Order Type Tabs */}
          <div className="flex space-x-8 mt-4">
            <button
              onClick={() => setActiveTab("dine-in")}
              className={`pb-2 text-sm font-medium border-b-2 ${
                activeTab === "dine-in"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Dine In
            </button>
            <button
              onClick={() => setActiveTab("pickup")}
              className={`pb-2 text-sm font-medium border-b-2 ${
                activeTab === "pickup"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setActiveTab("delivery")}
              className={`pb-2 text-sm font-medium border-b-2 ${
                activeTab === "delivery"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        {/* Fixed Status Indicators */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleStatusFilter("preparation")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeStatusFilter === "preparation"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-50"
              }`}
            >
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  activeStatusFilter === "preparation"
                    ? "bg-white text-blue-500"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                In preparation
              </span>
              <span
                className={`text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  activeStatusFilter === "preparation"
                    ? "bg-white text-blue-500"
                    : "bg-blue-500 text-white"
                }`}
              >
                {statusCounts.preparation}
              </span>
            </button>

            <button
              onClick={() => handleStatusFilter("ready")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeStatusFilter === "ready"
                  ? "bg-yellow-500 text-white"
                  : "hover:bg-yellow-50"
              }`}
            >
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  activeStatusFilter === "ready"
                    ? "bg-white text-yellow-600"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                Ready to serve
              </span>
              <span
                className={`text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  activeStatusFilter === "ready"
                    ? "bg-white text-yellow-600"
                    : "bg-gray-500 text-white"
                }`}
              >
                {statusCounts.ready}
              </span>
            </button>

            <button
              onClick={() => handleStatusFilter("completed")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeStatusFilter === "completed"
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-50"
              }`}
            >
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  activeStatusFilter === "completed"
                    ? "bg-white text-green-600"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Completed
              </span>
              <span
                className={`text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  activeStatusFilter === "completed"
                    ? "bg-white text-green-600"
                    : "bg-gray-500 text-white"
                }`}
              >
                {statusCounts.completed}
              </span>
            </button>

            {activeStatusFilter && (
              <button
                onClick={() => setActiveStatusFilter(null)}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Show All
              </button>
            )}

            {/* Search */}
            <div className="ml-auto relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search order"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Orders Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleCardClick(order)}
                className="p-6 bg-white shadow-sm border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-800 text-white text-sm font-medium px-2 py-1 rounded">
                      {order.tableNumber}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-pink-500 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {order.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {order.customer.name}
                    </span>
                    <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded font-medium">
                      VIP
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Order #{order.orderNumber}</span>
                  <div className="flex items-center space-x-1">
                    <FiUsers className="w-4 h-4" />
                    <span>{order.guestCount} Guests</span>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="text-sm text-gray-500 mb-4">
                  {order.date} • {order.time}
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700 border-b pb-2 mb-3">
                    <div className="col-span-2 text-left">QTY</div>
                    <div className="col-span-7 text-left">Items</div>
                    <div className="col-span-3 text-right">Price</div>
                  </div>
                  {order.items.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 text-sm py-1"
                    >
                      <div className="col-span-2 text-left text-gray-600">
                        {item.quantity}
                      </div>
                      <div className="col-span-7 text-left text-gray-900">
                        {item.name}
                      </div>
                      <div className="col-span-3 text-right text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="grid grid-cols-12 gap-2 text-sm text-gray-600 py-1">
                      <div className="col-span-2 text-left"></div>
                      <div className="col-span-7 text-left">
                        + {order.items.length - 2} More
                      </div>
                      <div className="col-span-3 text-right">
                        $
                        {order.items
                          .slice(2)
                          .reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Total and Action Button */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-900">
                    Total: ${order.totalPrice.toFixed(2)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkReady(order.id);
                    }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      order.status === "preparation"
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : order.status === "ready"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={order.status === "completed"}
                  >
                    {order.status === "preparation"
                      ? "Mark Ready"
                      : order.status === "ready"
                      ? "Complete"
                      : "Completed"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar tabname="reservation" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-auto pb-30">
        <Navbar activeTab="transactions" />
        {renderMainTabContent()}
      </main>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onMarkReady={handleMarkReady}
        onCancelTransaction={handleCancelTransaction}
      />
    </div>
  );
}
