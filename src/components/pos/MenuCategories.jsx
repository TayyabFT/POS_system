const MenuCategories = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
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
  );
};

export default MenuCategories;