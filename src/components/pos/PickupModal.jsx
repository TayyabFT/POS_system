import { FiX } from "react-icons/fi";
import { useState } from "react";

const PickupModal = ({
  showPickupModal,
  setShowPickupModal,
  onConfirm
}) => {
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState("12:00");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!showPickupModal) return null;

  const handleConfirm = () => {
    onConfirm({
      date: pickupDate,
      time: pickupTime,
      customerName: customerName,
      phoneNumber: phoneNumber
    });
    setShowPickupModal(false);
  };

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
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Pickup Time
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
            onClick={handleConfirm}
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