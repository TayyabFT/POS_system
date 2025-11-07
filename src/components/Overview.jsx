"use client";
import React, { useState, useEffect } from "react";
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
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

const RestaurantPOS = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAllOrdersModal, setShowAllOrdersModal] = useState(false);
  const [orderType, setOrderType] = useState("Dine In");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedOrderFilter, setSelectedOrderFilter] = useState("All");
  const [menuFilter, setMenuFilter] = useState("Most Ordered"); // New state for menu filtering
  
  // Dashboard stats state
  const [dashboardStats, setDashboardStats] = useState({
    total_orders: "0",
    ongoing_orders: "0",
    paid_orders: "0",
    revenue: "0.00",
    dishes_sold: "0"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [mostOrderedItems, setMostOrderedItems] = useState([]);
  const [loadingMostOrdered, setLoadingMostOrdered] = useState(true);
  const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
  const ordersPerPage = 3;

  // Sample data based on the UI
  const tabButtons = ["XO POS", "Order", "Reservation", "Transaction", "Table"];

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await fetch(`${API_BASE_URL}/overview/getdashboardstats/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle response format
      if (result.success && result.data) {
        setDashboardStats({
          total_orders: result.data.total_orders || "0",
          ongoing_orders: result.data.ongoing_orders || "0",
          paid_orders: result.data.paid_orders || "0",
          revenue: result.data.revenue || "0.00",
          dishes_sold: result.data.dishes_sold || "0"
        });
      } else if (result.statusCode === 200 && result.data) {
        setDashboardStats({
          total_orders: result.data.total_orders || "0",
          ongoing_orders: result.data.ongoing_orders || "0",
          paid_orders: result.data.paid_orders || "0",
          revenue: result.data.revenue || "0.00",
          dishes_sold: result.data.dishes_sold || "0"
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ongoing orders
  const fetchOngoingOrders = async () => {
    try {
      setLoadingOrders(true);
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await fetch(`${API_BASE_URL}/overview/getongoingorders/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle response format and transform data
      let orders = [];
      if (result.success && Array.isArray(result.data)) {
        orders = result.data;
      } else if (result.statusCode === 200 && Array.isArray(result.data)) {
        orders = result.data;
      }

      // Transform API response to match UI structure
      const transformedOrders = orders.map((order) => {
        // Format date
        const date = new Date(order.created_at);
        const formattedDate = date.toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        });
        const formattedTime = date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
        const formattedDateTime = `${formattedDate} • ${formattedTime}`;

        // Determine order type
        let orderType = "Dine In";
        if (order.delivery) {
          orderType = "Delivery";
        } else if (order.pickup) {
          orderType = "Pickup";
        }

        // Determine status
        let status = "Pending";
        if (order.ready_to_serve) {
          status = "Ready";
        } else if (order.in_preparation) {
          status = "Preparing";
        }

        // Extract items from selected_items
        const items = order.selected_items?.map(item => item.product_name) || [];

        // Generate table number (use order_id as fallback if no table_number)
        const tableNumber = order.table_number || `T${order.order_id}`;

        return {
          id: `XO${order.order_id}`,
          order_id: order.order_id,
          customer: order.customer_name || "Walk-in Customer",
          table: tableNumber,
          total: `+$${parseFloat(order.total || 0).toFixed(2)}`,
          time: formattedDateTime,
          status: status,
          items: items,
          orderType: orderType,
          phone: order.phone_number,
          subtotal: order.subtotal,
          tax: order.tax,
          discount: order.discount,
          order_note: order.order_note,
          delivery_address: order.delivery_address,
          delivery_instruction: order.delivery_instruction,
        };
      });

      setOngoingOrders(transformedOrders);
    } catch (err) {
      console.error('Error fetching ongoing orders:', err);
      setOngoingOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch most ordered products
  const fetchMostOrderedProducts = async () => {
    try {
      setLoadingMostOrdered(true);
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await fetch(`${API_BASE_URL}/overview/getmostorderedproducts/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle response format and transform data
      let products = [];
      if (result.success && Array.isArray(result.data)) {
        products = result.data;
      } else if (result.statusCode === 200 && Array.isArray(result.data)) {
        products = result.data;
      }

      // Transform API response to match UI structure
      const transformedProducts = products.map((product, index) => {
        // Calculate average price per unit
        const totalRevenue = parseFloat(product.total_revenue || 0);
        const totalQuantity = parseFloat(product.total_quantity_sold || 1);
        const avgPrice = totalQuantity > 0 ? totalRevenue / totalQuantity : 0;

        // Use emoji based on product name or default
        const getEmoji = (name) => {
          const nameLower = name.toLowerCase();
          if (nameLower.includes('burger')) return '🍔';
          if (nameLower.includes('pizza')) return '🍕';
          if (nameLower.includes('salad')) return '🥗';
          if (nameLower.includes('shirt') || nameLower.includes('clothing')) return '👕';
          if (nameLower.includes('drink') || nameLower.includes('coffee')) return '☕';
          if (nameLower.includes('cake') || nameLower.includes('dessert')) return '🍰';
          return '📦'; // Default emoji
        };

        return {
          id: product.product_id,
          name: product.product_name,
          price: `$${avgPrice.toFixed(2)}`,
          image: getEmoji(product.product_name),
          tag: `#${index + 1} Most Ordered`,
          tagColor: "green",
          orders: parseInt(product.total_quantity_sold || 0),
          total_revenue: totalRevenue,
        };
      });

      setMostOrderedItems(transformedProducts);
    } catch (err) {
      console.error('Error fetching most ordered products:', err);
      setMostOrderedItems([]);
    } finally {
      setLoadingMostOrdered(false);
    }
  };

  // Calculate paginated orders
  const totalOrdersPages = Math.ceil(ongoingOrders.length / ordersPerPage);
  const startIndex = (currentOrdersPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = ongoingOrders.slice(startIndex, endIndex);

  // Reset to page 1 when orders change
  useEffect(() => {
    setCurrentOrdersPage(1);
  }, [ongoingOrders.length]);

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardStats();
    fetchOngoingOrders();
    fetchMostOrderedProducts();
  }, []);

  // Format stats data from API
  const statsData = [
    { label: "Ongoing Order", value: dashboardStats.ongoing_orders, change: "", color: "blue" },
    { label: "Total Order", value: dashboardStats.total_orders, change: "", color: "green" },
    { label: "Revenue", value: `$${parseFloat(dashboardStats.revenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: "", color: "purple" },
    { label: "Paid Order", value: dashboardStats.paid_orders, change: "", color: "teal" },
    { label: "Dishes Sold", value: dashboardStats.dishes_sold, change: "", color: "pink" },
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


  // Extended orders list for "View All Orders" - using ongoing orders for now
  const allOrders = [...ongoingOrders];

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
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-12 gap-6">
            {/* Left Content */}
            <div className="col-span-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {stat.label}
                      </span>
                        {stat.change && (
                      <span className={`text-xs text-green-500`}>
                        {stat.change}
                      </span>
                        )}
                      </div>
                      <div className="text-2xl font-semibold">{stat.value}</div>
                    </div>
                  ))
                )}
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
                  {menuFilter === "Most Ordered" && loadingMostOrdered ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 animate-pulse"
                      >
                        <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))
                  ) : getCurrentItems().length === 0 ? (
                    <div className="col-span-3 text-center py-8 text-gray-500 text-sm">
                      {menuFilter === "Most Ordered" 
                        ? "No most ordered products found" 
                        : "No special items available"}
                    </div>
                  ) : (
                    getCurrentItems().map((item) => (
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
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Ongoing Orders */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold mb-4">📊 Ongoing Order</h3>
                <div className="space-y-3">
                  {loadingOrders ? (
                    <div className="space-y-3">
                      {[1, 2, 3].slice(0, ordersPerPage).map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div>
                              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-32"></div>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  ) : ongoingOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No ongoing orders
                    </div>
                  ) : (
                    <>
                      {paginatedOrders.map((order, index) => (
                        <div
                          key={order.order_id || index}
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
                                <div className={`text-xs ${
                                  order.status === "Ready" ? "text-green-600" :
                                  order.status === "Preparing" ? "text-yellow-600" :
                                  "text-gray-600"
                                }`}>
                                  {order.status}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                {/* Pagination Controls */}
                {!loadingOrders && ongoingOrders.length > ordersPerPage && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Showing {startIndex + 1}-{Math.min(endIndex, ongoingOrders.length)} of {ongoingOrders.length} orders
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentOrdersPage(prev => Math.max(1, prev - 1))}
                        disabled={currentOrdersPage === 1}
                        className={`p-1.5 rounded-md transition-colors ${
                          currentOrdersPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <FiChevronLeft size={16} />
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalOrdersPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentOrdersPage(page)}
                            className={`w-7 h-7 text-xs rounded-md transition-colors ${
                              currentOrdersPage === page
                                ? "bg-black text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentOrdersPage(prev => Math.min(totalOrdersPages, prev + 1))}
                        disabled={currentOrdersPage === totalOrdersPages}
                        className={`p-1.5 rounded-md transition-colors ${
                          currentOrdersPage === totalOrdersPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <FiChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
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
