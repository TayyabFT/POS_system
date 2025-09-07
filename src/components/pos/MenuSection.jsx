import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import MenuCategories from "./MenuCategories";
import MenuFilters from "./MenuFilters";
import MenuItemsGrid from "./MenuItemsGrid";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

const MenuSection = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  addItemToOrder,
}) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/getproducts`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.message) {
        // Transform the API response to match our expected format
        const transformedItems = data.message.map(product => ({
          id: product.id,
          name: product.product_name,
          price: parseFloat(product.price),
          cost: parseFloat(product.cost),
          stock: product.stock,
          status: product.status,
          category: product.category_name,
          description: product.description,
          image_url: product.image_url,
          sku: product.sku,
          barcode: product.barcode
        }));
        
        setItems(transformedItems);
        
        // Extract unique categories from products
        const uniqueCategories = [...new Set(data.message.map(product => product.category_name))]
          .filter(category => category) // Remove empty/null categories
          .map(category => ({
            name: category,
            count: data.message.filter(product => product.category_name === category).length
          }));
        
        setCategories(uniqueCategories);
      } else {
        throw new Error(data.data || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <section className="w-2/3 p-6 overflow-y-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading menu items...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-2/3 p-6 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <div>Error loading menu: {error}</div>
          <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-2/3 p-6 overflow-y-auto">
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

      {categories.length > 0 ? (
        <>
          <MenuCategories 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <MenuFilters />

          <MenuItemsGrid 
            filteredItems={filteredItems}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            addItemToOrder={addItemToOrder}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div>No categories available</div>
          <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Refresh
          </button>
        </div>
      )}
    </section>
  );
};

export default MenuSection;