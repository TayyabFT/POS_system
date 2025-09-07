import { FiX } from "react-icons/fi";
import { useState } from "react";

const DeliveryModal = ({ showDeliveryModal, setShowDeliveryModal, onConfirm }) => {
  const [deliveryChannel, setDeliveryChannel] = useState("Uber Eats");
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryTime, setDeliveryTime] = useState("12:00");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryInstruction, setDeliveryInstruction] = useState("");

  if (!showDeliveryModal) return null;

  const handleConfirm = () => {
    onConfirm({
      channel: deliveryChannel,
      date: deliveryDate,
      time: deliveryTime,
      address: deliveryAddress,
      instruction: deliveryInstruction
    });
    setShowDeliveryModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl animate-fade-in border border-gray-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
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
              <button 
                className={`border p-3 rounded-lg ${deliveryChannel === "Uber Eats" ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"}`}
                onClick={() => setDeliveryChannel("Uber Eats")}
              >
                Uber Eats
              </button>
              <button 
                className={`border p-3 rounded-lg ${deliveryChannel === "DoorDash" ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"}`}
                onClick={() => setDeliveryChannel("DoorDash")}
              >
                DoorDash
              </button>
              <button 
                className={`border p-3 rounded-lg ${deliveryChannel === "In-house" ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"}`}
                onClick={() => setDeliveryChannel("In-house")}
              >
                In-house
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Time
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
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
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
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
              value={deliveryInstruction}
              onChange={(e) => setDeliveryInstruction(e.target.value)}
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
            onClick={handleConfirm}
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