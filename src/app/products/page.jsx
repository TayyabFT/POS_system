'use client';

import { useState, useEffect } from 'react';
import qrcodedemo from "@/assets/images/qrcodedemo.png";
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
  FiTag, 
  FiDollarSign, 
  FiBox,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiChevronDown,
  FiFilter,
  FiDownload,
  FiImage
} from 'react-icons/fi';
import Image from 'next/image';

// API Service Module
const API_BASE_URL = 'https://pso-crm.vercel.app';

export const fetchCategories = async () => {
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

export const addProduct = async (productData, userId) => {
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

    if (!productData.image) {
      throw new Error('Product image is required');
    }

    const formData = new FormData();
    
    // Append all fields
    formData.append('product_name', productData.product_name);
    formData.append('sku', productData.sku);
    formData.append('price', productData.price.toString());
    formData.append('cost', productData.cost.toString());
    formData.append('stock', productData.stock.toString());
    formData.append('category_name', productData.category_name);
    
    // Optional fields
    if (productData.description) formData.append('description', productData.description);
    if (productData.barcode) formData.append('barcode', productData.barcode);
    if (productData.status) formData.append('status', productData.status);
    
    formData.append('image', productData.image);

    // Debug: Log FormData contents
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : value);
    }

    const response = await fetch(`${API_BASE_URL}/addproduct/${userId}`, {
      method: 'POST',
      body: formData,
    });

    // Handle non-JSON responses
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      try {
        responseData = JSON.parse(text);
      } catch {
        responseData = { message: text };
      }
    }

    if (!response.ok) {
      console.error('Backend error response:', {
        status: response.status,
        data: responseData
      });
      
      if (response.status === 409) {
        throw new Error('A product with this SKU already exists');
      }
      if (response.status === 404) {
        if (responseData.message?.includes('User not found')) {
          throw new Error('Your account was not found. Please log in again.');
        }
        if (responseData.message?.includes('Category not found')) {
          throw new Error('The selected category does not exist');
        }
      }
      throw new Error(responseData.message || `Server error (status ${response.status})`);
    }

    return responseData;

  } catch (error) {
    console.error('Full error details:', {
      error: error.message,
      stack: error.stack,
      requestData: {
        product_name: productData.product_name,
        sku: productData.sku,
        category_name: productData.category_name,
        image: productData.image?.name || 'None'
      }
    });
    
    // Re-throw with user-friendly message if not already set
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};





export const updateProduct = async (productId, productData, userId) => {
  try {
    const formData = new FormData();
    
    // Append all fields
    formData.append('product_name', productData.product_name);
    formData.append('description', productData.description || '');
    formData.append('sku', productData.sku);
    formData.append('barcode', productData.barcode || '');
    formData.append('category_name', productData.category_name);
    formData.append('price', productData.price.toString());
    formData.append('cost', productData.cost.toString());
    formData.append('stock', productData.stock.toString());
    formData.append('status', productData.status);
    
    // Only append image if a new one was selected
    if (productData.image && productData.image instanceof File) {
      formData.append('image', productData.image);
    }

    const response = await fetch(`${API_BASE_URL}/updateproduct/${productId}`, {
      method: 'PUT', // or 'PATCH' depending on your API
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to update product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', {
      productId,
      error: error.message,
      productData
    });
    throw error;
  }
};






export const deleteProduct = async (productId, userId) => {
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

export const fetchProducts = async (userId) => {
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
      category_name: product.category_name
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
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
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
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [categoryErrors, setCategoryErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
          fetchProducts(storedUserId)
        ]);
        
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading data:', error);
        alert('Please login to access this page');
        window.location.href = '/login';
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
  
  // Updated status filter with case-insensitive comparison
  const matchesStatus = selectedStatus === 'all' || 
                       (product.status && 
                        product.status.toLowerCase() === selectedStatus.toLowerCase());
  
  return matchesSearch && matchesCategory && matchesStatus;
});

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.product_name) newErrors.product_name = 'Product name is required';
    if (!newProduct.category_name) newErrors.category_name = 'Category is required';
    if (!newProduct.price || isNaN(newProduct.price)) newErrors.price = 'Valid price is required';
    if (!newProduct.cost || isNaN(newProduct.cost)) newErrors.cost = 'Valid cost is required';
    if (!newProduct.stock || isNaN(newProduct.stock)) newErrors.stock = 'Valid stock quantity is required';
    if (!newProduct.sku) newErrors.sku = 'SKU is required';
    // if (!isEditMode && !imageFile) newErrors.image = 'Product image is required';
    return newErrors;
  };

  const validateCategoryForm = () => {
    const newErrors = {};
    if (!newCategory.name) newErrors.name = 'Category name is required';
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
      product_name: newProduct.product_name,
      description: newProduct.description,
      sku: newProduct.sku,
      barcode: newProduct.barcode,
      category_name: newProduct.category_name,
      price: newProduct.price,
      cost: newProduct.cost,
      stock: newProduct.stock,
      status: newProduct.status,
      image: imageFile
    };

    let response;
    if (isEditMode) {
      // Update existing product
      response = await updateProduct(currentProductId, productData, userId);
      
      // Update the products list
      setProducts(products.map(p => 
        p.id === currentProductId ? { ...p, ...response.data } : p
      ));
      
      alert('Product updated successfully!');
    } else {
      // Create new product
      response = await addProduct(productData, userId);
      setProducts([...products, response.data]);
      alert('Product added successfully!');
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
      await deleteProduct(productId, userId);
      setProducts(products.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
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
  });
  
  // Set the current product ID being edited
  setCurrentProductId(product.id);
  
  // Set image preview if exists
  if (product.image) {
    setImagePreview(product.image);
  } else {
    setImagePreview(null);
  }
  
  setIsEditMode(true);
  setIsAddProductModalOpen(true);
};

  const handleAddCategory = async () => {
    const formErrors = validateCategoryForm();
    if (Object.keys(formErrors).length > 0) {
      setCategoryErrors(formErrors);
      return;
    }

    try {
      const createdCategory = await createCategory(newCategory);
      setCategories([...categories, createdCategory]);
      setNewProduct(prev => ({ ...prev, category: createdCategory.name }));
      setNewCategory({ name: '', description: '' });
      setIsAddCategoryModalOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (value === 'new') {
      setIsAddCategoryModalOpen(true);
    } else {
      handleInputChange(e);
    }
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value
    });
    if (categoryErrors[name]) {
      setCategoryErrors({
        ...categoryErrors,
        [name]: null
      });
    }
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validate image
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, image: 'Image must be smaller than 5MB'});
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setErrors({...errors, image: 'Only JPEG/PNG images allowed'});
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
  const resetForm = () => {
    setNewProduct({
      product_name: '',
      category_name: '',
      price: '',
      cost: '',
      stock: '',
      status: 'Active',
      sku: '',
      description: '',
      barcode: ''
    });
    setImagePreview(null);
    setImageFile(null);
    setErrors({});
    setIsEditMode(false);
    setCurrentProductId(null);
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
          <a href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiPieChart className="w-5 h-5" /> <span>Dashboard</span>
          </a>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-100 text-blue-600 font-semibold">
            <FiPackage className="w-5 h-5" /> <span>Products</span>
          </div>
          <a href="/sales" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiShoppingBag className="w-5 h-5" /> <span>Sales</span>
          </a>
          <a href="/invoices" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiClipboard className="w-5 h-5" /> <span>Invoices</span>
          </a>
          <a href="/reports" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiBarChart2 className="w-5 h-5" /> <span>Reports</span>
          </a>
          <a href="/customers" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiUsers className="w-5 h-5" /> <span>Customers</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
            <FiSettings className="w-5 h-5" /> <span>Settings</span>
          </a>
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
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 relative">
              <FiBell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FiUser className="w-4 h-4" />
              </div>
              <span className="hidden md:inline text-gray-700">Admin</span>
              <FiChevronDown className="hidden md:inline text-gray-500" />
            </div>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
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
                            src={product.image || qrcodedemo}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.cost.toFixed(2)}
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
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
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
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                  <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
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
                  {/* Product Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image {!isEditMode && '*'}
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imagePreview ? (
                            <div className="relative w-full h-full">
                              <img
                                src={imagePreview}
                                alt="Product preview"
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                          ) : (
                            <>
                              <FiImage className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">Click to upload</p>
                              <p className="text-xs text-gray-500">PNG, JPG (Max. 2MB)</p>
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

                  {/* Basic Information */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="product_name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
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
                      onChange={handleCategoryChange}
                      className={`mt-1 block w-full rounded-md border ${errors.category_name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                      <option value="new">+ Add New Category</option>
                    </select>
                    {errors.category_name && <p className="mt-1 text-sm text-red-600">{errors.category_name}</p>}
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price *</label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
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
                      </div>
                      {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>
                    <div>
                      <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost *</label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
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
                      </div>
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
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={isSubmitting}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
                <button 
                  onClick={() => setIsAddCategoryModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    name="name"
                    value={newCategory.name}
                    onChange={handleNewCategoryChange}
                    className={`mt-1 block w-full rounded-md border ${
                      categoryErrors.name ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                  />
                  {categoryErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{categoryErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="categoryDescription"
                    name="description"
                    value={newCategory.description}
                    onChange={handleNewCategoryChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Category
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