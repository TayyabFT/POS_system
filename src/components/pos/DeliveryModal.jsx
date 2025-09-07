import { FiX } from "react-icons/fi";

const DeliveryModal = ({ showDeliveryModal, setShowDeliveryModal }) => {
  if (!showDeliveryModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl animate-fade-in border border-gray-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 mt-20">
          <h2 className="text-xl font-bold">Set Delivery</h2>
          <button
            onClick={() => setShowDeliveryModal(false)}
            className="text-gray-400 hover:text-black transition p-1"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 ">
          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Channel
            </label>
            <div className="flex gap-4">
              <button className="border p-3 rounded-lg border-black bg-black text-white font-medium">
                Uber Eats
              </button>
              <button className="border p-3 rounded-lg hover:border-black">
                Uber Eats
              </button>
              <button className="border p-3 rounded-lg hover:border-black">
                Lyft
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Date
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                "Today",
                "Sat 26 Jul",
                "Sun 27 Jul",
                "Mon 28 Jul",
                "Tue 29 Jul",
              ].map((date) => (
                <button
                  key={date}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 hover:border-black whitespace-nowrap"
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Time
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Address
            </label>
            <input
              type="text"
              placeholder="Enter Delivery Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Instruction
            </label>
            <textarea
              placeholder="Add delivery instruction"
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
            />
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => setShowDeliveryModal(false)}
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:border-black transition"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowDeliveryModal(false)}
            className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;