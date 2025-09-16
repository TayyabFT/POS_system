"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiUser,
  FiShoppingCart,
  FiTag,
  FiPrinter,
  FiX,
  FiPieChart,
  FiSettings,
  FiCalendar,
  FiUserPlus,
  FiMenu,
  FiUsers,
  FiPackage,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

export default function MerchandisePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    full_name: "",
    email: "",
    phone_number: ""
  });
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/getproducts`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Filter only merchandise (is_merchandise: true)
        const merchandiseProducts = data.message.filter(product => product.is_merchandise === true);
        setProducts(merchandiseProducts);
        
        // Extract unique categories from products
        const uniqueCategories = [...new Set(merchandiseProducts.map(product => product.category_name))];
        setCategories([
          { name: "All Product", count: merchandiseProducts.length, icon: "📦" },
          ...uniqueCategories.map(cat => ({ 
            name: cat, 
            count: merchandiseProducts.filter(p => p.category_name === cat).length,
            icon: "👕"
          }))
        ]);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
      // Fallback to sample data if API fails
      setProducts([
        {
          id: 1,
          product_name: "Gourmet Comfort Tees",
          description: "Soft, breathable, premium cotton t-shirt perfect for everyday wear.",
          price: "15.00",
          category_name: "Apparel",
          image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
          sizes: ["S", "M", "L", "XL", "XXL"],
          status: "Active",
          stock: 45,
        },
        {
          id: 2,
          product_name: "Culinary Classics Long Sleeve",
          description: "High-quality 100% black, durable, comfortable, stylish long sleeve shirt.",
          price: "15.00",
          category_name: "Apparel",
          image_url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
          sizes: ["S", "M", "L", "XL", "XXL"],
          status: "Active",
          stock: 8,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await fetch(`${API_BASE_URL}/getcustomers/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setCustomers(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch customers');
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      // Fallback to sample data if API fails
      setCustomers([
        {
          id: 1,
          full_name: "Molly Vaughan",
          phone: "(405) 555-0128",
          email: "molly@mail.com",
          img: "https://i.pravatar.cc/150?img=1",
        },
        {
          id: 2,
          full_name: "Kathrinee Moss",
          phone: "(209) 555-0104",
          email: "kath@mail.com",
          img: "https://i.pravatar.cc/150?img=2",
        }
      ]);
    }
  };

  const addCustomer = async () => {
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await fetch(`${API_BASE_URL}/addcustomer/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Add the new customer to the list
        const createdCustomer = {
          id: data.data?.id || Date.now(),
          full_name: newCustomer.full_name,
          phone: newCustomer.phone_number,
          email: newCustomer.email,
          img: `https://i.pravatar.cc/150?img=${customers.length + 3}`
        };
        
        setCustomers([...customers, createdCustomer]);
        setSelectedCustomer(createdCustomer);
        setNewCustomer({ full_name: "", email: "", phone_number: "" });
        setIsCreateModalOpen(false);
        setIsOpen(false);
        
        alert('Customer created successfully!');
      } else {
        throw new Error(data.message || 'Failed to create customer');
      }
    } catch (err) {
      console.error("Error creating customer:", err);
      alert(`Failed to create customer: ${err.message}`);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Product" || product.category_name === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Sale":
        return "bg-green-100 text-green-800";
      case "Running Low":
        return "bg-orange-100 text-orange-800";
      case "New":
        return "bg-purple-100 text-purple-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const addToCart = (product, size = "M", quantity = 1) => {
    const cartItemId = `${product.id}-${size}`;
    const existingItem = cartItems.find((item) => item.cartId === cartItemId);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.cartId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { 
          ...product, 
          cartId: cartItemId, 
          size, 
          quantity,
          title: product.product_name,
          price: parseFloat(product.price)
        },
      ]);
    }
    setShowAddProductModal(false);
    setSelectedProduct(null);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + (item.price * item.quantity),
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

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = localStorage.getItem("userid");
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      if (!selectedCustomer) {
        throw new Error("Please select a customer first.");
      }

      if (cartItems.length === 0) {
        throw new Error("Please add at least one product to the cart.");
      }

      const orderData = {
        is_merchandise: true,
        customer_name: selectedCustomer.full_name,
        phone_number: selectedCustomer.phone,
        dining: false,
        pickup: false,
        delivery: false,
        discount: 0,
        selected_items: cartItems.map(item => ({
          id: item.id,
          size: item.size,
          quantity: item.quantity,
          product_name: item.product_name,
          price: item.price
        })),
        subtotal: subtotal,
        tax: tax,
        total_amount: total
      };

      const response = await fetch(`${API_BASE_URL}/addorder/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        alert('Order created successfully!');
        setCartItems([]);
        setSelectedCustomer(null);
        router.push('/payment');
      } else {
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error creating order:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomerToOrder = (customer) => {
    setSelectedCustomer(customer);
    setIsOpen(false);
  };

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value
    });
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar tabname="marchandise" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar tabname="new-order" />
        <div className="flex flex-1 overflow-hidden">
          {/* Products Section */}
          <section className="w-2/3 p-6 overflow-y-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="Search products or category"
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
                  <div className="text-xs mt-1">{cat.count} Items</div>
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group relative overflow-hidden border border-gray-200"
                  >
                    {product.status && (
                      <span
                        className={`absolute top-3 left-3 text-xs ${getStatusColor(
                          product.status
                        )} px-2 py-1 rounded-full z-10`}
                      >
                        {product.status}
                      </span>
                    )}

                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.product_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <FiPackage className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="font-medium text-gray-900 truncate mb-2">
                      {product.product_name}
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-tight">
                      {product.description}
                    </p>

                    {/* Size Options */}
                    <div className="flex gap-1 mb-3">
                      {product.sizes && product.sizes.map((size) => (
                        <span
                          key={size}
                          className="text-xs px-2 py-1 bg-gray-100 rounded border text-gray-600"
                        >
                          {size}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                        <div className="text-xs text-gray-500">
                          Stock: {product.stock}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowAddProductModal(true);
                        }}
                        className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition transform group-hover:scale-105 shadow"
                        disabled={product.stock === 0}
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-lg shadow-sm border border-gray-200">
                <FiPackage size={48} className="mb-4 opacity-70" />
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No products found for "${searchQuery}" in ${selectedCategory}` 
                    : "No products available"}
                </p>
                <button 
                  onClick={fetchProducts}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Refresh Products
                </button>
              </div>
            )}
          </section>

          {/* Cart/Order Summary */}
          <aside className="w-1/3 border-l bg-white flex flex-col shadow-lg border-gray-200">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Merchandise Order</h2>
                <div className="flex items-center gap-2">
                  <FiUsers size={16} />
                  <span className="text-sm text-gray-500">
                    {cartItems.length} Item selected
                  </span>
                </div>
              </div>

              {/* Selected Customer */}
              {selectedCustomer && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedCustomer.img}
                        alt={selectedCustomer.full_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{selectedCustomer.full_name}</div>
                        <div className="text-xs text-gray-600">{selectedCustomer.phone}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCustomer(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition"
                >
                  <FiUserPlus size={16} /> {selectedCustomer ? "Change Customer" : "Add Customer"}
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
                        All Customers
                      </h3>
                      <div className="space-y-3">
                        {customers.map((customer) => (
                          <div
                            key={customer.id}
                            className="flex items-center justify-between border rounded-lg px-3 py-3 hover:bg-gray-50 transition"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={customer.img}
                                alt={customer.full_name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium">{customer.full_name}</div>
                                <div className="flex items-center text-xs text-gray-500 gap-3 mt-0.5">
                                  <span className="flex items-center gap-1">
                                    <FiPhone /> {customer.phone}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FiMail /> {customer.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleAddCustomerToOrder(customer)}
                              className="text-blue-600 text-sm hover:underline"
                            >
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6 relative">
                    {/* Close button */}
                    <button
                      onClick={() => setIsCreateModalOpen(false)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={20} />
                    </button>

                    {/* Title */}
                    <h2 className="text-lg font-semibold mb-4">
                      Create New Customer
                    </h2>

                    {/* Name */}
                    <div className="mb-4">
                      <label className="text-sm text-gray-500">Full Name *</label>
                      <input
                        type="text"
                        name="full_name"
                        value={newCustomer.full_name}
                        onChange={handleNewCustomerChange}
                        placeholder="Customer name"
                        className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label className="text-sm text-gray-500">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={newCustomer.email}
                        onChange={handleNewCustomerChange}
                        placeholder="customer@email.com"
                        className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div className="mb-6">
                      <label className="text-sm text-gray-500">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={newCustomer.phone_number}
                        onChange={handleNewCustomerChange}
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
                        onClick={addCustomer}
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
                      key={item.cartId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-400 hover:text-red-500 transition p-1"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {item.product_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} • Size: {item.size}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition border border-gray-300"
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition border border-gray-300"
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity + 1)
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
                  <FiPackage size={24} className="mx-auto mb-2 opacity-70" />
                  <p className="font-medium">No items selected</p>
                  <p className="text-sm">Start by select one or more item</p>
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
                  <span>$0</span>
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
                disabled={cartItems.length === 0 || !selectedCustomer || loading}
                onClick={handleCreateOrder}
              >
                {loading ? "Creating Order..." : "Place Order"}
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowAddProductModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <FiX size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Add to Cart</h2>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  {selectedProduct.image_url ? (
                    <img
                      src={selectedProduct.image_url}
                      alt={selectedProduct.product_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FiPackage className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg leading-tight mb-1">
                    {selectedProduct.product_name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-tight">
                    {selectedProduct.description}
                  </p>
                  <div className="text-lg font-bold mt-2">
                    ${parseFloat(selectedProduct.price).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.sizes && selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize({
                          ...selectedSize,
                          [selectedProduct.id]: size,
                        })
                      }
                      className={`px-3 py-2 border rounded-lg transition ${
                        (selectedSize[selectedProduct.id] || "M") === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  addToCart(
                    selectedProduct,
                    selectedSize[selectedProduct.id] || "M",
                    1
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}