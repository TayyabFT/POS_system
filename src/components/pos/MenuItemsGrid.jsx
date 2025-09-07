import { FiPlus } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

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

const MenuItemsGrid = ({ filteredItems, searchQuery, selectedCategory, addItemToOrder }) => {
  return (
    <>
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
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {item.name.split(" ")[0]}
                  </div>
                )}
              </div>
              <div className="font-medium text-gray-900 truncate">
                {item.name}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {item.description}
              </div>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.cost && item.cost > item.price && (
                    <span className="text-xs text-gray-500 line-through ml-1">
                      ${item.cost.toFixed(2)}
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
    </>
  );
};

export default MenuItemsGrid;