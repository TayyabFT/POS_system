import { FiX } from "react-icons/fi";

const PickupModal = ({
  showPickupModal,
  setShowPickupModal,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime
}) => {
  if (!showPickupModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl animate-fade-in border border-gray-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Schedule Pickup</h2>
          <button
            onClick={() => setShowPickupModal(false)}
            className="text-gray-400 hover:text-black transition p-1"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Pickup Date
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                "Today",
                "Tomorrow",
                "Fri 28",
                "Sat 29",
                "Sun 30",
                "Mon 31",
              ].map((date) => (
                <button
                  key={date}
                  className={`px-4 py-2.5 rounded-lg border whitespace-nowrap transition-all ${
                    selectedDate === date
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Pickup Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                "11:00 AM",
                "12:00 PM",
                "1:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
              ].map((time) => (
                <button
                  key={time}
                  className={`py-2 rounded-lg border transition ${
                    selectedTime === time
                      ? "bg-black border-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <div className="flex">
              <select className="border border-gray-300 rounded-l-lg px-3 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
                <option>+1</option>
                <option>+44</option>
                <option>+91</option>
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                className="flex-1 border-t border-r border-b border-gray-300 rounded-r-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => setShowPickupModal(false)}
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:border-black transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowPickupModal(false);
            }}
            className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow"
          >
            Confirm Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickupModal;