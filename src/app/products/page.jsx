'use client';

import { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiShoppingCart,
  FiPieChart,
  FiShoppingBag,
  FiClipboard,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiSearch, 
  FiEdit, 
  FiTrash, 
  FiPackage, 
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiChevronDown,
  FiFilter,
  FiDownload,
  FiImage,
} from 'react-icons/fi';
import Image from 'next/image';

const API_BASE_URL = 'https://pso-crm.vercel.app';

// API Service Functions
const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getcategory`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const result = await response.json();
    return result.message || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const addProduct = async (productData, userId) => {
  try {
    // Validate required fields
    const requiredFields = {
      'Product name': productData.product_name?.trim(),
      'SKU': productData.sku?.trim(),
      'Price': productData.price,
      'Cost': productData.cost,
      'Stock': productData.stock,
      'Category': productData.category_name
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([name]) => name);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const formData = new FormData();
    
    // Append all fields
    formData.append('product_name', productData.product_name);
    formData.append('sku', productData.sku);
    formData.append('price', productData.price.toString());
    formData.append('cost', productData.cost.toString());
    formData.append('stock', productData.stock.toString());
    formData.append('category_name', productData.category_name);
    formData.append('is_event', productData.is_event ? 'true' : 'false');
    formData.append('is_merchandise', productData.is_merchandise ? 'true' : 'false');
    
    // Optional fields
    if (productData.description) formData.append('description', productData.description);
    if (productData.barcode) formData.append('barcode', productData.barcode);
    if (productData.status) formData.append('status', productData.status);
    
    // Add event_dates if it's an event
    if (productData.is_event && productData.event_dates && productData.event_dates.length > 0) {
      // Convert the event_dates array to the format expected by the server
      const eventDatesForAPI = productData.event_dates.map(event => ({
        date: event.date,
        time: event.time,
        datetime: event.datetime
      }));
      formData.append('event_dates', JSON.stringify(eventDatesForAPI));
    }
    
    if (productData.image) {
      formData.append('image', productData.image);
    }

    const response = await fetch(`${API_BASE_URL}/addproduct/${userId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to add product');
    }

    return await response.json();

  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

const updateProduct = async (productId, productData, userId) => {
  try {
    const formData = new FormData();
    
    formData.append('product_name', productData.product_name);
    formData.append('description', productData.description || '');
    formData.append('sku', productData.sku);
    formData.append('barcode', productData.barcode || '');
    formData.append('category_name', productData.category_name);
    formData.append('price', productData.price.toString());
    formData.append('cost', productData.cost.toString());
    formData.append('stock', productData.stock.toString());
    formData.append('status', productData.status);
    formData.append('is_event', productData.is_event ? 'true' : 'false');
    formData.append('is_merchandise', productData.is_merchandise ? 'true' : 'false');
    
    // Add event_dates if it's an event
    if (productData.is_event && productData.event_dates && productData.event_dates.length > 0) {
      // Convert the event_dates array to the format expected by the server
      const eventDatesForAPI = productData.event_dates.map(event => ({
        date: event.date,
        time: event.time,
        datetime: event.datetime
      }));
      formData.append('event_dates', JSON.stringify(eventDatesForAPI));
    }
    
    if (productData.image && productData.image instanceof File) {
      formData.append('image', productData.image);
    }

    const response = await fetch(`${API_BASE_URL}/updateproduct/${productId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deleteproduct/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getproducts`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return (data.message || []).map(product => ({
      id: product.id,
      name: product.product_name,
      description: product.description,
      sku: product.sku,
      barcode: product.barcode,
      price: parseFloat(product.price),
      cost: parseFloat(product.cost),
      stock: product.stock,
      status: product.status,
      image: product.image_url,
      category_name: product.category_name,
      is_event: product.is_event || false,
      is_merchandise: product.is_merchandise || false,
      event_dates: product.event_dates || []
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const ProductPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    description: '',
    sku: '',
    barcode: '',
    category_name: '',
    price: '',
    cost: '',
    stock: '',
    status: 'Active',
    is_event: false,
    is_merchandise: false,
    event_dates: []
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserId = localStorage.getItem('userid');
        if (!storedUserId) {
          throw new Error('User not authenticated');
        }
        setUserId(storedUserId);

        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchProducts()
        ]);
        
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase()) || 
                         product.sku?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                          product.category_name === selectedCategory;
    
    const matchesStatus = selectedStatus === 'all' || 
                         product.status?.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesProductType = selectedProductType === 'all' || 
                              (selectedProductType === 'event' && product.is_event) ||
                              (selectedProductType === 'merchandise' && product.is_merchandise) ||
                              (selectedProductType === 'product' && !product.is_event && !product.is_merchandise);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesProductType;
  });

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.product_name) newErrors.product_name = 'Product name is required';
    if (!newProduct.category_name) newErrors.category_name = 'Category is required';
    if (!newProduct.price || isNaN(newProduct.price)) newErrors.price = 'Valid price is required';
    if (!newProduct.cost || isNaN(newProduct.cost)) newErrors.cost = 'Valid cost is required';
    if (!newProduct.stock || isNaN(newProduct.stock)) newErrors.stock = 'Valid stock quantity is required';
    if (!newProduct.sku) newErrors.sku = 'SKU is required';
    if (newProduct.is_event && (!newProduct.event_dates || newProduct.event_dates.length === 0)) {
      newErrors.event_dates = 'At least one event date and time is required';
    }
    if (!newProduct.is_event && !newProduct.is_merchandise && !imageFile && !isEditMode) {
      newErrors.image = 'Product image is required';
    }
    return newErrors;
  };

  const handleAddProduct = async () => {
    try {
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      setIsSubmitting(true);
      
      const productData = {
        ...newProduct,
        image: imageFile
      };

      let response;
      if (isEditMode) {
        response = await updateProduct(currentProductId, productData, userId);
        setProducts(products.map(p => 
          p.id === currentProductId ? { ...p, ...response.data } : p
        ));
      } else {
        response = await addProduct(productData, userId);
        setProducts([...products, response.data]);
      }

      resetForm();
      setIsAddProductModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} product: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      product_name: product.name || '',
      description: product.description || '',
      sku: product.sku || '',
      barcode: product.barcode || '',
      category_name: product.category_name || '',
      price: product.price?.toString() || '',
      cost: product.cost?.toString() || '',
      stock: product.stock?.toString() || '',
      status: product.status || 'Active',
      is_event: product.is_event || false,
      is_merchandise: product.is_merchandise || false,
      event_dates: product.event_dates || []
    });
    
    setCurrentProductId(product.id);
    setImagePreview(product.image || null);
    setIsEditMode(true);
    setIsAddProductModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({...prev, image: 'Image must be smaller than 5MB'}));
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors(prev => ({...prev, image: 'Only JPEG/PNG images allowed'}));
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEventDate = () => {
    if (newEventDate && newEventTime) {
      const dateTimeString = `${newEventDate}T${newEventTime}`;
      const eventDateTime = {
        date: newEventDate,
        time: newEventTime,
        datetime: dateTimeString
      };
      
      // Check if this exact date and time combination already exists
      const exists = newProduct.event_dates.some(event => 
        event.date === newEventDate && event.time === newEventTime
      );
      
      if (!exists) {
        setNewProduct(prev => ({
          ...prev,
          event_dates: [...prev.event_dates, eventDateTime]
        }));
        setNewEventDate('');
        setNewEventTime('');
      }
    }
  };

  const removeEventDate = (dateTimeToRemove) => {
    setNewProduct(prev => ({
      ...prev,
      event_dates: prev.event_dates.filter(event => event !== dateTimeToRemove)
    }));
  };

  const resetForm = () => {
    setNewProduct({
      product_name: '',
      description: '',
      sku: '',
      barcode: '',
      category_name: '',
      price: '',
      cost: '',
      stock: '',
      status: 'Active',
      is_event: false,
      is_merchandise: false,
      event_dates: []
    });
    setImagePreview(null);
    setImageFile(null);
    setNewEventDate('');
    setNewEventTime('');
    setErrors({});
    setIsEditMode(false);
    setCurrentProductId(null);
  };

  const getProductType = (product) => {
    if (product.is_event) return 'Event';
    if (product.is_merchandise) return 'Merchandise';
    return 'Product';
  };

  const getProductTypeColor = (product) => {
    if (product.is_event) return 'bg-purple-100 text-purple-800';
    if (product.is_merchandise) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 w-64 bg-white text-gray-800 h-full transition-all duration-300 ${isMobileMenuOpen ? 'left-0' : '-left-64 md:left-0'} shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="text-2xl font-bold flex items-center text-blue-600">
            <FiShoppingCart className="mr-2" /> Flow POS
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {['Dashboard', 'Sales', 'Invoices', 'Reports', 'Customers', 'Settings'].map((item) => (
            <a key={item} href={`/${item.toLowerCase()}`} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
              <FiPieChart className="w-5 h-5" /> <span>{item}</span>
            </a>
          ))}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-100 text-red-500 hover:text-red-700 cursor-pointer transition-colors">
              <FiLogOut className="w-5 h-5" /> <span>Logout</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Product Management</h1>
            <p className="text-gray-600">Manage your inventory and product listings</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <button 
              onClick={() => {
                resetForm();
                setIsAddProductModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" /> Add Product
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FiUser className="w-4 h-4" />
              </div>
              <span className="hidden md:inline text-gray-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="md:col-span-2 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              className="bg-transparent outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <FiFilter className="text-gray-500 mr-2" />
            <select 
              className="bg-transparent outline-none w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <FiFilter className="text-gray-500 mr-2" />
            <select 
              className="bg-transparent outline-none w-full"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <FiFilter className="text-gray-500 mr-2" />
            <select 
              className="bg-transparent outline-none w-full"
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="product">Products</option>
              <option value="event">Events</option>
              <option value="merchandise">Merchandise</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">{filteredProducts.length} Products</h2>
            <button className="flex items-center text-sm text-blue-500 hover:text-blue-700">
              <FiDownload className="mr-1" /> Export
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            src={product.image || "/placeholder-product.png"}
                            width={40}
                            height={40}
                            alt={product.name}
                            className="rounded-md"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getProductTypeColor(product)}`}>
                        {getProductType(product)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock > 20 ? 'bg-green-100 text-green-800' : 
                        product.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button 
                  onClick={() => {
                    setIsAddProductModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Product Type Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Product Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="product_type"
                          checked={!newProduct.is_event && !newProduct.is_merchandise}
                          onChange={() => setNewProduct(prev => ({
                            ...prev,
                            is_event: false,
                            is_merchandise: false
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Regular Product</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="product_type"
                          checked={newProduct.is_event}
                          onChange={() => setNewProduct(prev => ({
                            ...prev,
                            is_event: true,
                            is_merchandise: false
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Event</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="product_type"
                          checked={newProduct.is_merchandise}
                          onChange={() => setNewProduct(prev => ({
                            ...prev,
                            is_event: false,
                            is_merchandise: true
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Merchandise</span>
                      </label>
                    </div>
                  </div>

                  {/* Event Dates & Times - Only show for events */}
                  {newProduct.is_event && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Event Dates & Times *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="date"
                          value={newEventDate}
                          onChange={(e) => setNewEventDate(e.target.value)}
                          className="rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                          placeholder="Select Date"
                        />
                        <input
                          type="time"
                          value={newEventTime}
                          onChange={(e) => setNewEventTime(e.target.value)}
                          className="rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                          placeholder="Select Time"
                        />
                        <button
                          type="button"
                          onClick={addEventDate}
                          disabled={!newEventDate || !newEventTime}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiPlus size={16} />
                          Add
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Add all available dates and times for this event
                      </p>
                      {errors.event_dates && <p className="text-sm text-red-600">{errors.event_dates}</p>}
                      
                      {newProduct.event_dates.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-700">Selected Dates & Times:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {newProduct.event_dates.map((eventDateTime, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                              >
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-blue-800">
                                    {new Date(eventDateTime.date).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                  <span className="text-xs text-blue-600">
                                    {new Date(`2000-01-01T${eventDateTime.time}`).toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true
                                    })}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeEventDate(eventDateTime)}
                                  className="text-red-500 hover:text-red-700 ml-2"
                                >
                                  <FiX size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Product Image - Only show for non-events */}
                  {!newProduct.is_event && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image {!isEditMode && '*'}
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="Product preview"
                                className="w-full h-full object-contain rounded-lg"
                              />
                            ) : (
                              <>
                                <FiImage className="w-8 h-8 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">Click to upload</p>
                                <p className="text-xs text-gray-500">PNG, JPG (Max. 5MB)</p>
                              </>
                            )}
                          </div>
                          <input 
                            id="product-image" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                    </div>
                  )}

                  {/* Basic Information */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {newProduct.is_event ? 'Event Name *' : 'Product Name *'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="product_name"
                      value={newProduct.product_name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${errors.product_name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                    />
                    {errors.product_name && <p className="mt-1 text-sm text-red-600">{errors.product_name}</p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* SKU and Barcode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU *</label>
                      <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={newProduct.sku}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${errors.sku ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                      />
                      {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
                    </div>
                    <div>
                      <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">Barcode</label>
                      <input
                        type="text"
                        id="barcode"
                        name="barcode"
                        value={newProduct.barcode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
                    <select
                      id="category"
                      name="category_name"
                      value={newProduct.category_name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${errors.category_name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                    {errors.category_name && <p className="mt-1 text-sm text-red-600">{errors.category_name}</p>}
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price *</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`block w-full rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 p-2`}
                        placeholder="0.00"
                      />
                      {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>
                    <div>
                      <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost *</label>
                      <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={newProduct.cost}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`block w-full rounded-md border ${errors.cost ? 'border-red-500' : 'border-gray-300'} pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 p-2`}
                        placeholder="0.00"
                      />
                      {errors.cost && <p className="mt-1 text-sm text-red-600">{errors.cost}</p>}
                    </div>
                  </div>

                  {/* Stock and Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock *</label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        min="0"
                        className={`mt-1 block w-full rounded-md border ${errors.stock ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                      />
                      {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={newProduct.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddProductModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={isSubmitting}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;