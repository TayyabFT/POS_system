const MenuFilters = () => {
  return (
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
  );
};

export default MenuFilters;