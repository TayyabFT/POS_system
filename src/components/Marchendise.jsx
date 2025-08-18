"use client";
import React, { useState } from "react";
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
} from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function MerchandisePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Popular");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const router = useRouter();
  const categories = [
    { name: "All Product", count: 24, icon: "📦" },
    { name: "Apparel", count: 18, icon: "👕" },
    { name: "Lifestyle", count: 8, icon: "🏠" },
    { name: "Collection", count: 6, icon: "✨" },
  ];

  const filters = ["Popular", "Running Low", "Low", "Sale", "Sold Out"];

  const products = [
    {
      id: 1,
      title: "Gourmet Comfort Tees",
      description:
        "Soft, breathable, premium cotton t-shirt perfect for everyday wear.",
      price: 15.0,
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      sizes: ["S", "M", "L", "XL", "XXL"],
      status: "Popular",
      stock: 45,
    },
    {
      id: 2,
      title: "Culinary Classics Long Sleeve",
      description:
        "High-quality 100% black, durable, comfortable, stylish long sleeve shirt.",
      price: 15.0,
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
      sizes: ["S", "M", "L", "XL", "XXL"],
      status: "Running Low",
      stock: 8,
    },
    {
      id: 3,
      title: "Black Gourmet Comfort Tees",
      description:
        "Durable, adjustable, stylish black t-shirt for casual and formal occasions.",
      price: 15.0,
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400",
      sizes: ["S", "M", "L", "XL", "XXL"],
      status: "New",
      stock: 32,
    },
    {
      id: 4,
      title: "Premium Cotton Hoodie",
      description:
        "Comfortable premium hoodie perfect for cooler weather and casual wear.",
      price: 35.0,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      sizes: ["S", "M", "L", "XL", "XXL"],
      status: "Popular",
      stock: 28,
    },
    {
      id: 5,
      title: "Classic White Tee",
      description:
        "Essential white t-shirt made from organic cotton, perfect for layering.",
      price: 12.0,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400",
      sizes: ["S", "M", "L", "XL", "XXL"],
      status: "Sale",
      stock: 15,
    },
    {
      id: 6,
      title: "Vintage Style Jacket",
      description: "Retro-inspired jacket with modern comfort and durability.",
      price: 65.0,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      sizes: ["S", "M", "L", "XL"],
      status: "Sold Out",
      stock: 0,
    },
    {
      id: 7,
      title: "Coffee Mug Set",
      description:
        "Premium ceramic mugs perfect for your morning coffee or tea.",
      price: 25.0,
      category: "Lifestyle",
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400",
      sizes: ["One Size"],
      status: "Popular",
      stock: 50,
    },
    {
      id: 8,
      title: "Branded Tote Bag",
      description:
        "Eco-friendly canvas tote bag perfect for shopping and daily use.",
      price: 18.0,
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      sizes: ["One Size"],
      status: "New",
      stock: 35,
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All Product" ||
        product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Popular":
        return "bg-blue-100 text-blue-800";
      case "Sale":
        return "bg-green-100 text-green-800";
      case "Running Low":
        return "bg-orange-100 text-orange-800";
      case "New":
        return "bg-purple-100 text-purple-800";
      case "Sold Out":
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
        { ...product, cartId: cartItemId, size, quantity },
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
      {/* Sidebar */}
      <Sidebar tabname="marchandise" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex gap-6 items-center">
            <h1 className="text-lg font-bold">Merchandise/Add Chart</h1>
          </div>

          <div className="flex gap-6 items-center">
            <button className="text-gray-600 hover:text-black transition font-medium">
              All POS
            </button>
            <button className="text-gray-600 hover:text-black transition font-medium">
              In Order
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

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
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
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="font-medium text-gray-900 truncate mb-2">
                      {product.title}
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-tight">
                      {product.description}
                    </p>

                    {/* Size Options */}
                    <div className="flex gap-1 mb-3">
                      {product.sizes.map((size) => (
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
                          ${product.price.toFixed(2)}
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
                  No products found for "{searchQuery}" in {selectedCategory}
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
                <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition">
                  <FiUserPlus size={16} /> Add Customer
                </button>
              </div>

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
                            {item.title}
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
                disabled={cartItems.length === 0}
              >
                Place Order
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
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg leading-tight mb-1">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-tight">
                    {selectedProduct.description}
                  </p>
                  <div className="text-lg font-bold mt-2">
                    ${selectedProduct.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.sizes.map((size) => (
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
