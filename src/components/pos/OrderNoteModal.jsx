import { FiX } from "react-icons/fi";

const OrderNoteModal = ({ showModal, setShowModal, orderNote, setOrderNote }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Add Order Note</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-black"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="p-6">
          <textarea
            placeholder="Add order note (e.g., special instructions, allergies, etc.)"
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
          />
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:border-black transition"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderNoteModal;