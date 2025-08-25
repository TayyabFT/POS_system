import React, { useState } from "react";
import { FiX, FiSearch, FiPlus, FiTrash2, FiCalendar } from "react-icons/fi";

const CreateGroupOrderModal = () => {
  const [groupModal, setGroupModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [deals, setDeals] = useState([]);
  const [groupDeadline, setGroupDeadline] = useState("");

  const menuItems = [
    {
      id: 1,
      name: "Fettuccini with Spinach Pesto",
      image: "🍝",
      category: "Pasta",
    },
    {
      id: 2,
      name: "Black Bean Chili",
      image: "🌶️",
      category: "Main Course",
    },
    {
      id: 3,
      name: "Spicy Healthy Sautéed Tofu",
      image: "🧈",
      category: "Vegetarian",
    },
    {
      id: 4,
      name: "Grilled Chicken Caesar Salad",
      image: "🥗",
      category: "Salads",
    },
    {
      id: 5,
      name: "Beef Burger with Fries",
      image: "🍔",
      category: "Burgers",
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemSelect = (item) => {
    if (!selectedItems.find((selected) => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleItemRemove = (itemId) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  const addDeal = () => {
    const newDeal = {
      id: Date.now(),
      name: "",
      quantity: "",
      price: "",
      discount: "",
    };
    setDeals([...deals, newDeal]);
  };

  const updateDeal = (dealId, field, value) => {
    setDeals(
      deals.map((deal) =>
        deal.id === dealId ? { ...deal, [field]: value } : deal
      )
    );
  };

  const removeDeal = (dealId) => {
    setDeals(deals.filter((deal) => deal.id !== dealId));
  };

  const handleCreate = () => {
    const orderData = {
      items: selectedItems,
      deals: deals,
      deadline: groupDeadline,
    };
    console.log("Creating group order:", orderData);
    // Here you would typically send the data to your backend
    setGroupModal(false);
  };

  if (!groupModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur h-screen bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Group Order
          </h2>
          <button
            onClick={() => setGroupModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Items Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Items <span className="text-red-500">*</span>
            </label>

            {/* Search Input */}
            <div className="relative mb-4">
              <FiSearch
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Type"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="mb-4 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemSelect(item)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-2xl mr-3">{item.image}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.category}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Items */}
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{item.image}</span>
                    <span className="font-medium text-gray-900">
                      {item.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleItemRemove(item.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <FiX size={16} className="text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Deal Quantity Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Add deal quantity <span className="text-red-500">*</span>
            </label>

            {deals.map((deal, index) => (
              <div
                key={deal.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">
                    Level {index + 1}
                  </h4>
                  <button
                    onClick={() => removeDeal(deal.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <FiTrash2 size={16} className="text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Deal name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Deal name"
                      value={deal.name}
                      onChange={(e) =>
                        updateDeal(deal.id, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="60"
                      value={deal.quantity}
                      onChange={(e) =>
                        updateDeal(deal.id, "quantity", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Type"
                        value={deal.price}
                        onChange={(e) =>
                          updateDeal(deal.id, "price", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Discount <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={deal.discount}
                        onChange={(e) =>
                          updateDeal(deal.id, "discount", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Type</option>
                        <option value="5%">5%</option>
                        <option value="10%">10%</option>
                        <option value="15%">15%</option>
                        <option value="20%">20%</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addDeal}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <FiPlus size={16} className="mr-1" />
              Add another deal
            </button>
          </div>

          {/* Group Purchase Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Group purchase deadline <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiCalendar
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="date"
                value={groupDeadline}
                onChange={(e) => setGroupDeadline(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={selectedItems.length === 0 || !groupDeadline}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupOrderModal;
