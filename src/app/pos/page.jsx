"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiCoffeeCup } from "react-icons/ci";
// import { FiCoffee, FiDinner, FiLeaf, FiMeal, FiDessert, FiBeverage, FiWine } from 'react-icons/fi';
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiUser,
  FiChevronRight,
  FiChevronLeft,
  FiEdit,
  FiShoppingCart,
  FiTag,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPrinter,
  FiPhone,
  FiHome,
  FiX,
  FiDollarSign,
  FiCreditCard,
  FiPieChart,
  FiSettings,
  FiCalendar,
  FiClock as FiTime,
  FiUserPlus,
  FiGrid,
  FiMenu,
  FiPackage,
  FiCamera,
  FiMail,
} from "react-icons/fi";

export default function POSOrderPage() {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState("Dine in");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("12:00 PM");
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    if (type === "Pickup") {
      setShowPickupModal(true);
    } else if (type === "Delivery") {
      setShowDeliveryModal(true);
    }
  };

  const handleCreateCustomer = () => {
    console.log({ name, email, phone });
    setIsOpen(false);
  };

  const categories = [
    { name: "Breakfast", count: 12, icon: <FiCoffee size={20} /> },
    { name: "Lunch", count: 24, icon: <FiPackage size={20} /> },
    { name: "Dinner", count: 8, icon: <FiDinner size={20} /> },
    { name: "Appetizer", count: 9, icon: <FiLeaf size={20} /> },
    { name: "Main Courses", count: 16, icon: <FiMeal size={20} /> },
    { name: "Dessert", count: 10, icon: <FiDessert size={20} /> },
    { name: "Beverages", count: 22, icon: <FiBeverage size={20} /> },
    { name: "Wine", count: 10, icon: <FiWine size={20} /> },
  ];

  const customers = [
    {
      name: "Molly Vaughan",
      phone: "(405) 555-0128",
      email: "molly@mail.com",
      vip: true,
      img: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Kathrinee Moss",
      phone: "(209) 555-0104",
      email: "kath@mail.com",
      vip: false,
      img: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Joshua Wilson",
      phone: "(270) 555-0117",
      email: "joshua@mail.com",
      vip: false,
      img: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Erica Wyatt",
      phone: "(208) 555-0112",
      email: "erica@mail.com",
      vip: true,
      img: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Zahir Mays",
      phone: "(307) 555-0133",
      email: "zahir@mail.com",
      vip: true,
      img: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const items = [
    {
      id: 1,
      name: "Fettuccini with Spinach",
      price: 15,
      status: "Sold out",
      category: "Dinner",
    },
    {
      id: 2,
      name: "Black Bean Chili",
      price: 15,
      status: "Trending",
      category: "Lunch",
    },
    {
      id: 3,
      name: "Spicy Healthy Sauté",
      price: 12.5,
      discount: 17.25,
      status: "Running Low",
      category: "Main Courses",
    },
    {
      id: 4,
      name: "Spicy Black Bean Burger",
      price: 15,
      status: "New",
      category: "Lunch",
    },
    {
      id: 5,
      name: "Avocado Toast",
      price: 9.5,
      status: "Popular",
      category: "Breakfast",
    },
    {
      id: 6,
      name: "Chocolate Lava Cake",
      price: 8,
      status: "",
      category: "Dessert",
    },
    {
      id: 7,
      name: "Margherita Pizza",
      price: 14,
      status: "",
      category: "Dinner",
    },
    {
      id: 8,
      name: "Iced Caramel Latte",
      price: 5.5,
      status: "",
      category: "Beverages",
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItemToOrder = (item) => {
    setOrderItems([...orderItems, { ...item, id: Date.now(), quantity: 1 }]);
  };

  const removeItemFromOrder = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.12;
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  };

  const { subtotal, tax, total } = calculateTotal();

  const getStatusColor = (status) => {
    switch (status) {
      case "Sold out":
        return "bg-gray-800 text-white";
      case "Trending":
        return "bg-gray-200 text-gray-800";
      case "Running Low":
        return "bg-gray-300 text-gray-800";
      case "New":
        return "bg-white text-gray-800 border border-gray-800";
      case "Popular":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-500 text-white";
    }
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

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-black text-white flex flex-col items-center py-6 transition-all duration-300 ease-in-out`}
      >
        <div className="w-14 h-14 bg-white rounded-lg mb-8 flex items-center justify-center text-black font-bold text-xl">
          {sidebarOpen ? (
            <span className="text-2xl font-bold">POS</span>
          ) : (
            <span className="text-xl">P</span>
          )}
        </div>

        <nav className="flex flex-col w-full px-4 gap-2">
          <div
            className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={20} />
            {sidebarOpen && <span>Collapse Menu</span>}
          </div>

          <div
            className="flex items-center gap-3 p-3 bg-white text-black rounded-lg font-medium"
            onClick={() => {
              router.push("/pos");
            }}
          >
            <FiShoppingCart size={20} />
            {sidebarOpen && <span>Orders</span>}
          </div>

          <div className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <FiPieChart size={20} />
            {sidebarOpen && <span>Analytics</span>}
          </div>

          <div className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <FiUser size={20} />
            {sidebarOpen && <span>Customers</span>}
          </div>
          <div
            className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
            onClick={() => {
              router.push("/events");
            }}
          >
            <FiCalendar size={20} />
            {sidebarOpen && <span>Events</span>}
          </div>
          <div
            className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
            onClick={() => {
              router.push("/marchandise");
            }}
          >
            <FiCalendar size={20} />
            {sidebarOpen && <span>Marchandise</span>}
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <FiPrinter size={20} />
            {sidebarOpen && <span>Reports</span>}
          </div>

          <div className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <FiSettings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex gap-6 items-center">
            <button className="px-5 py-2 bg-black text-white rounded-lg font-medium shadow hover:bg-gray-800 transition">
              New Order
            </button>
            <button className="text-gray-600 hover:text-black transition font-medium">
              Reservations
            </button>
            <button className="text-gray-600 hover:text-black transition font-medium">
              Inventory
            </button>
            <button className="text-gray-600 hover:text-black transition font-medium">
              Staff
            </button>
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <FiClock size={16} />
            <span>{formatDate()}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border border-gray-300">
              <FiUser size={16} />
            </div>
            <span className="font-medium">Alex Bizer</span>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Menu Section */}
          <section className="w-2/3 p-6 overflow-y-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="Search menu or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex flex-col items-center justify-center rounded-lg px-4 py-3 min-w-[100px] transition-all border ${
                    selectedCategory === cat.name
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:border-black"
                  }`}
                >
                  <span className="text-xl mb-1">{cat.icon}</span>
                  <div className="font-medium text-sm">{cat.name}</div>
                  <div className="text-xs mt-1">{cat.count} items</div>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {[
                "All",
                "Popular",
                "Running Low",
                "Low Stock",
                "On Sale",
                "Sold Out",
              ].map((tag) => (
                <button
                  key={tag}
                  className="text-xs bg-white border border-gray-300 hover:border-black px-4 py-2 rounded-full whitespace-nowrap transition"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group relative overflow-hidden border border-gray-200"
                  >
                    {item.status && (
                      <span
                        className={`absolute top-3 left-3 text-xs ${getStatusColor(
                          item.status
                        )} px-2 py-1 rounded-full z-10`}
                      >
                        {item.status}
                      </span>
                    )}
                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {item.name.split(" ")[0]}
                      </div>
                    </div>
                    <div className="font-medium text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="font-bold">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.discount && (
                          <span className="text-xs text-gray-500 line-through ml-1">
                            ${item.discount.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addItemToOrder(item)}
                        className="text-white bg-black hover:bg-gray-800 p-2 rounded-lg transition transform group-hover:scale-105 shadow"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-lg shadow-sm border border-gray-200">
                <FiSearch size={48} className="mb-4 opacity-70" />
                <p className="text-gray-500">
                  No items found for "{searchQuery}" in {selectedCategory}
                </p>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <aside className="w-1/3 border-l bg-white flex flex-col shadow-lg border-gray-200">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Order #X086378</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  2 Guests
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => handleOrderTypeChange("Dine in")}
                  className={`px-3 py-1.5 text-sm rounded-lg transition border ${
                    orderType === "Dine in"
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:border-black"
                  }`}
                >
                  Dine in
                </button>
                <button
                  onClick={() => {
                    setOrderType("Pickup");
                    setShowPickupModal(true);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-lg transition border ${
                    orderType === "Pickup"
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:border-black"
                  }`}
                >
                  Pickup
                </button>
                <button
                  onClick={() => handleOrderTypeChange("Delivery")}
                  className={`px-3 py-1.5 text-sm rounded-lg transition border ${
                    orderType === "Delivery"
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:border-black"
                  }`}
                >
                  Delivery
                </button>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition"
                >
                  <FiUserPlus size={16} /> Add Customer
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition">
                  <FiGrid size={16} /> Select Table
                </button>
              </div>

              {/* Order Items */}
              {orderItems.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeItemFromOrder(item.id)}
                          className="text-gray-400 hover:text-black transition p-1"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition border border-gray-300"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition border border-gray-300"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500 mb-6 border border-dashed border-gray-400">
                  <FiShoppingCart
                    size={24}
                    className="mx-auto mb-2 opacity-70"
                  />
                  <p className="font-medium">No items selected</p>
                  <p className="text-sm">
                    Select items from the menu to add to order
                  </p>
                </div>
              )}

              {/* Order Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-4 py-3 rounded-lg transition"
                >
                  <FiTag size={16} /> Add Discount
                </button>
                <button className="w-full flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-4 py-3 rounded-lg transition">
                  <FiEdit size={16} /> Add Order Note
                </button>
              </div>
            </div>

            {/* Order Summary Footer */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax 12%</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-medium transition disabled:opacity-50 border border-gray-300"
                  disabled={orderItems.length === 0}
                >
                  Save Order
                </button>
                <button
                  className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium shadow transition disabled:opacity-50"
                  disabled={orderItems.length === 0}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold">Add Customer</h2>

            {/* Search + Create */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center flex-1 border rounded-lg px-3 py-2 bg-gray-50">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customer"
                  className="bg-transparent outline-none px-2 w-full text-sm"
                />
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm"
              >
                <FiPlus size={14} /> Create Customer
              </button>
            </div>

            {/* Customer List */}
            <div className="mt-5">
              <h3 className="text-sm text-gray-500 mb-3">All Customer</h3>
              <div className="space-y-3">
                {customers.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border rounded-lg px-3 py-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{c.name}</span>
                          {c.vip && (
                            <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">
                              VIP
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 gap-3 mt-0.5">
                          <span className="flex items-center gap-1">
                            <FiPhone /> {c.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiMail /> {c.email}
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
            </div>
          </div>
        </div>
      )}

      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl animate-fade-in border border-gray-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 mt-20">
              <h2 className="text-xl font-bold">Set Delivery</h2>
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="text-gray-400 hover:text-black transition p-1"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 ">
              {/* Delivery Channel */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Delivery Channel
                </label>
                <div className="flex gap-4">
                  <button className="border p-3 rounded-lg border-black bg-black text-white font-medium">
                    Uber Eats
                  </button>
                  <button className="border p-3 rounded-lg hover:border-black">
                    Uber Eats
                  </button>
                  <button className="border p-3 rounded-lg hover:border-black">
                    Lyft
                  </button>
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Delivery Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    "Today",
                    "Sat 26 Jul",
                    "Sun 27 Jul",
                    "Mon 28 Jul",
                    "Tue 29 Jul",
                  ].map((date) => (
                    <button
                      key={date}
                      className="px-4 py-2.5 rounded-lg border border-gray-300 hover:border-black whitespace-nowrap"
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Delivery Time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Delivery Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Delivery Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>

              {/* Delivery Instruction */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Delivery Instruction
                </label>
                <textarea
                  placeholder="Add delivery instruction"
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:border-black transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden shadow-lg animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Item Discount</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Promo Code Input */}
            <div className="flex items-center gap-2 px-6 py-4">
              <input
                type="text"
                placeholder="Add promo code"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
              />
              <button className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-2 hover:border-black">
                <FiCamera size={18} /> Scan Barcode
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
                Apply
              </button>
            </div>

            {/* Discount Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-4">
              {[
                {
                  type: "VIP Member",
                  color: "text-pink-600",
                  tagColor: "bg-pink-100",
                },
                {
                  type: "All Member",
                  color: "text-blue-600",
                  tagColor: "bg-blue-100",
                },
                {
                  type: "VIP Member",
                  color: "text-pink-600",
                  tagColor: "bg-pink-100",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>15% off</span>
                    <span>|</span>
                    <span>VLTNDY</span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${item.tagColor} ${item.color}`}
                  >
                    {item.type}
                  </span>
                  <h3 className="mt-2 font-medium">Valentine Day</h3>
                  <p className="text-xs text-gray-500">
                    Valid until 12 June 2023
                  </p>
                  <button className="mt-2 text-sm text-gray-500 hover:underline flex items-center gap-1">
                    View terms and conditions →
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 text-white rounded-full py-3 font-medium hover:bg-blue-700"
              >
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            {/* Title */}
            <h2
              onClick={() => setIsCreateModalOpen(true)}
              className="text-lg font-semibold mb-4"
            >
              Create New Customer
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="text-sm text-gray-500">Name</label>
              <input
                type="text"
                placeholder="Add reservation tags"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                placeholder="Add reservation tags"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="text-sm text-gray-500">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL for Pickup */}
      {showPickupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl animate-fade-in border border-gray-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Schedule Pickup</h2>
              <button
                onClick={() => setShowPickupModal(false)}
                className="text-gray-400 hover:text-black transition p-1"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Pickup Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    "Today",
                    "Tomorrow",
                    "Fri 28",
                    "Sat 29",
                    "Sun 30",
                    "Mon 31",
                  ].map((date) => (
                    <button
                      key={date}
                      className={`px-4 py-2.5 rounded-lg border whitespace-nowrap transition-all ${
                        selectedDate === date
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black"
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
                <label className="block text-sm font-medium mb-2">
                  Pickup Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "11:00 AM",
                    "12:00 PM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                  ].map((time) => (
                    <button
                      key={time}
                      className={`py-2 rounded-lg border transition ${
                        selectedTime === time
                          ? "bg-black border-black text-white"
                          : "border-gray-300 hover:border-black"
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
                <label className="block text-sm font-medium mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <select className="border border-gray-300 rounded-l-lg px-3 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
                    <option>+1</option>
                    <option>+44</option>
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="flex-1 border-t border-r border-b border-gray-300 rounded-r-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowPickupModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:border-black transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPickupModal(false);
                }}
                className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow"
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

// Custom food icons
const FiCoffee = ({ size }) => <span style={{ fontSize: size }}>☕</span>;
const FiDinner = ({ size }) => <span style={{ fontSize: size }}>🍽️</span>;
const FiLeaf = ({ size }) => <span style={{ fontSize: size }}>🥗</span>;
const FiMeal = ({ size }) => <span style={{ fontSize: size }}>🍛</span>;
const FiDessert = ({ size }) => <span style={{ fontSize: size }}>🍰</span>;
const FiBeverage = ({ size }) => <span style={{ fontSize: size }}>🥤</span>;
const FiWine = ({ size }) => <span style={{ fontSize: size }}>🍷</span>;
