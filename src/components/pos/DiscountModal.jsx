import { FiX, FiCamera } from "react-icons/fi";

const DiscountModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden shadow-lg animate-fade-in">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Item Discount</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-black"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 py-4">
          <input
            type="text"
            placeholder="Add promo code"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
          />
          <button className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-2 hover:border-black">
            <FiCamera size={18} /> Scan Barcode
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Apply
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-4">
          {[
            {
              type: "VIP Member",
              color: "text-pink-600",
              tagColor: "bg-pink-100",
            },
            {
              type: "All Member",
              color: "text-blue-600",
              tagColor: "bg-blue-100",
            },
            {
              type: "VIP Member",
              color: "text-pink-600",
              tagColor: "bg-pink-100",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>15% off</span>
                <span>|</span>
                <span>VLTNDY</span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${item.tagColor} ${item.color}`}
              >
                {item.type}
              </span>
              <h3 className="mt-2 font-medium">Valentine Day</h3>
              <p className="text-xs text-gray-500">
                Valid until 12 June 2023
              </p>
              <button className="mt-2 text-sm text-gray-500 hover:underline flex items-center gap-1">
                View terms and conditions →
              </button>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => setShowModal(false)}
            className="w-full bg-blue-600 text-white rounded-full py-3 font-medium hover:bg-blue-700"
          >
            Apply Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;