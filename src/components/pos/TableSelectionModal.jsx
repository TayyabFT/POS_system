import { FiX } from "react-icons/fi";

const TableSelectionModal = ({ showModal, setShowModal, onTableSelect }) => {
  if (!showModal) return null;

  const tables = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Select Table</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-black"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4">
            {tables.map((table) => (
              <button
                key={table}
                className="p-4 border border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition"
                onClick={() => onTableSelect(table)}
              >
                Table {table}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:border-black transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSelectionModal;