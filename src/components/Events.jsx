"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
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
  FiUserPlus,
  FiGrid,
  FiMenu,
  FiPackage,
  FiCamera,
  FiMail,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { useEffect } from "react";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Popular");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();
  const categories = [
    { name: "Food", count: 12, icon: "🍽️" },
    { name: "Views", count: 24, icon: "🏞️" },
    { name: "Expertise", count: 8, icon: "🎯" },
    { name: "Entertainment", count: 9, icon: "🎭" },
    { name: "Community", count: 16, icon: "👥" },
  ];

  const filters = [
    "Popular",
    "Lowest Price",
    "Best Reviewed",
    "Sale",
    "Sold Out",
  ];

  const events = [
    {
      id: 1,
      title: "Grower Champagne Dinner",
      description:
        "Join Messina Hof for an unforgotten evening featuring the vineyard's award-winning grower champagne and their latest sparkling wines.",
      price: 115.0,
      category: "Food",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
      date: "March 15, 2024",
      time: "7:00 PM",
      location: "Main Dining Room",
      capacity: 50,
      booked: 23,
      status: "Popular",
    },
    {
      id: 2,
      title: "Friends For Hi Party",
      description:
        "A rare opportunity to sample over 25 wines at half-price from Fox Hill Vineyard, the Italian grape class served and formed by Bocci Collars.",
      price: 15.0,
      category: "Community",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      date: "March 20, 2024",
      time: "3:00 PM",
      location: "Garden Patio",
      capacity: 80,
      booked: 45,
      status: "Sale",
    },
    {
      id: 3,
      title: "Daily Ryon with Nick Pinellle",
      description:
        "This experience is hosted by celebrity chef Nick Pinellle who will be celebrating the seasonal bounty of the Central Coast.",
      price: 15.0,
      category: "Food",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      date: "March 22, 2024",
      time: "6:00 PM",
      location: "Chef's Table",
      capacity: 20,
      booked: 18,
      status: "Nearly Full",
    },
    {
      id: 4,
      title: "Wine Tasting Experience",
      description:
        "Discover our finest collection of wines with expert sommelier guidance through premium selections.",
      price: 45.0,
      category: "Views",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      date: "March 25, 2024",
      time: "5:00 PM",
      location: "Wine Cellar",
      capacity: 30,
      booked: 12,
      status: "Available",
    },
    {
      id: 5,
      title: "Live Jazz Evening",
      description:
        "Enjoy an intimate evening with live jazz music and premium cocktails in our lounge.",
      price: 25.0,
      category: "Entertainment",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      date: "March 28, 2024",
      time: "8:00 PM",
      location: "Lounge",
      capacity: 60,
      booked: 35,
      status: "Popular",
    },
    {
      id: 6,
      title: "Cooking Masterclass",
      description:
        "Learn professional cooking techniques from our head chef in hands-on sessions.",
      price: 85.0,
      category: "Expertise",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      date: "March 30, 2024",
      time: "11:00 AM",
      location: "Teaching Kitchen",
      capacity: 15,
      booked: 8,
      status: "Available",
    },
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
  const filteredEvents = events.filter(
    (event) =>
      event.category === selectedCategory &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Popular":
        return "bg-blue-100 text-blue-800";
      case "Sale":
        return "bg-green-100 text-green-800";
      case "Nearly Full":
        return "bg-orange-100 text-orange-800";
      case "Available":
        return "bg-gray-100 text-gray-800";
      case "Sold Out":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const addToCart = (event, tickets = 1) => {
    const existingItem = cartItems.find((item) => item.id === event.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + tickets }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...event, quantity: tickets }]);
    }
    setShowAddEventModal(false);
    setSelectedEvent(null);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
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

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      <Sidebar tabname="events" />
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex gap-6 items-center">
            <button className="text-gray-600 hover:text-black transition font-medium">
              Order
            </button>
            <button className="text-gray-600 hover:text-black transition font-medium">
              Reservation
            </button>
            <button className="text-gray-600 hover:text-black transition font-medium">
              Transaction
            </button>
            <button className="text-gray-600 hover:text-black transition font-medium">
              Table
            </button>
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Wed, March 27, 2024 - 09:48</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-medium text-sm">BA</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">Brar Alex</div>
                <div className="text-xs text-gray-500">Business Owner</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Events Section */}
          <section className="w-2/3 p-6 overflow-y-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="Search events or category"
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
                  <div className="text-xs mt-1">{cat.count} Events</div>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`text-xs px-4 py-2 rounded-full whitespace-nowrap transition border ${
                    selectedFilter === filter
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:border-black"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group relative overflow-hidden border border-gray-200"
                  >
                    {event.status && (
                      <span
                        className={`absolute top-3 left-3 text-xs ${getStatusColor(
                          event.status
                        )} px-2 py-1 rounded-full z-10`}
                      >
                        {event.status}
                      </span>
                    )}

                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="font-medium text-gray-900 truncate mb-2">
                      {event.title}
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-tight">
                      {event.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">
                          ${event.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          per person
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowAddEventModal(true);
                        }}
                        className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition transform group-hover:scale-105 shadow"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-lg shadow-sm border border-gray-200">
                <FiCalendar size={48} className="mb-4 opacity-70" />
                <p className="text-gray-500">
                  No events found for "{searchQuery}" in {selectedCategory}
                </p>
              </div>
            )}
          </section>

          {/* Cart/Order Summary */}
          <aside className="w-1/3 border-l bg-white flex flex-col shadow-lg border-gray-200">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Order #X086378</h2>
                <div className="flex items-center gap-2">
                  <FiUsers size={16} />
                  <span className="text-sm text-gray-500">
                    {cartItems.length} Item selected
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition"
                >
                  <FiUserPlus size={16} /> Add Customer
                </button>
              </div>
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
                      <h3 className="text-sm text-gray-500 mb-3">
                        All Customer
                      </h3>
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
                      <label className="text-sm text-gray-500">
                        Phone Number
                      </label>
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
              {/* Cart Items */}
              {cartItems.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition p-1"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} per ticket
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
                  <FiCalendar size={24} className="mx-auto mb-2 opacity-70" />
                  <p className="font-medium">No event selected</p>
                  <p className="text-sm">Start by select one or more event</p>
                </div>
              )}

              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-4 py-3 rounded-lg transition">
                  <FiTag size={16} /> Add Discount
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span>--</span>
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

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
                disabled={cartItems.length === 0}
                onClick={() => {
                  router.push("/payment");
                }}
              >
                Pay Now
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Add Event Modal - Centered and proper size */}
      {showAddEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowAddEventModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <FiX size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-1">Add Event</h2>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg leading-tight mb-1">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-tight">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Event Availability</h4>
                <div className="text-right mb-3">
                  <button className="text-blue-600 text-sm hover:underline">
                    Show more dates
                  </button>
                </div>

                <div className="flex justify-center gap-2 mb-6">
                  {[
                    { day: "Sun", date: "25", short: "SU" },
                    { day: "Mon", date: "26", short: "MO" },
                    { day: "Tue", date: "27", short: "TU" },
                    { day: "Wed", date: "28", short: "WE" },
                    { day: "Thu", date: "29", short: "TH" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      className={`flex flex-col items-center p-2 rounded-lg border transition ${
                        idx === 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:border-blue-600"
                      }`}
                    >
                      <span className="text-xs">{item.short}</span>
                      <span className="font-medium">{item.date}</span>
                      <span className="text-xs">Jul</span>
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <h5 className="font-medium mb-2">Regular</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm text-gray-600">
                      Non-refundable
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="font-bold text-xl">
                    ${selectedEvent.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setSelectedTickets({
                          ...selectedTickets,
                          [selectedEvent.id]: Math.max(
                            0,
                            (selectedTickets[selectedEvent.id] || 1) - 1
                          ),
                        })
                      }
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {selectedTickets[selectedEvent.id] || 1}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedTickets({
                          ...selectedTickets,
                          [selectedEvent.id]:
                            (selectedTickets[selectedEvent.id] || 1) + 1,
                        })
                      }
                      className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition">
                    Select
                  </button>
                  <button
                    onClick={() =>
                      addToCart(
                        selectedEvent,
                        selectedTickets[selectedEvent.id] || 1
                      )
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                  >
                    Add to Chart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
