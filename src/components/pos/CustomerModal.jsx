import { FiX, FiSearch, FiPlus, FiPhone, FiMail } from "react-icons/fi";

const customers = [
  {
    name: "Molly Vaughan",
    phone: "(405) 555-0128",
    email: "molly@mail.com",
    vip: true,
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Kathrinee Moss",
    phone: "(209) 555-0104",
    email: "kath@mail.com",
    vip: false,
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Joshua Wilson",
    phone: "(270) 555-0117",
    email: "joshua@mail.com",
    vip: false,
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Erica Wyatt",
    phone: "(208) 555-0112",
    email: "erica@mail.com",
    vip: true,
    img: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Zahir Mays",
    phone: "(307) 555-0133",
    email: "zahir@mail.com",
    vip: true,
    img: "https://i.pravatar.cc/150?img=5",
  },
];

const CustomerModal = ({ isOpen, setIsOpen, isCreateModalOpen, setIsCreateModalOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold">Add Customer</h2>

        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center flex-1 border rounded-lg px-3 py-2 bg-gray-50">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search customer"
              className="bg-transparent outline-none px-2 w-full text-sm"
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm"
          >
            <FiPlus size={14} /> Create Customer
          </button>
        </div>

        <div className="mt-5">
          <h3 className="text-sm text-gray-500 mb-3">All Customer</h3>
          <div className="space-y-3">
            {customers.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between border rounded-lg px-3 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{c.name}</span>
                      {c.vip && (
                        <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">
                          VIP
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 gap-3 mt-0.5">
                      <span className="flex items-center gap-1">
                        <FiPhone /> {c.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMail /> {c.email}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-blue-600 text-sm hover:underline">
                  + Add to order
                </button>
              </div>
            ))}
          </div>
        </div>

        {isCreateModalOpen && (
          <CreateCustomerModal 
            setIsCreateModalOpen={setIsCreateModalOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};

const CreateCustomerModal = ({ setIsCreateModalOpen, setIsOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6 relative">
        <button
          onClick={() => setIsCreateModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Create New Customer</h2>

        <div className="mb-4">
          <label className="text-sm text-gray-500">Name</label>
          <input
            type="text"
            placeholder="Add reservation tags"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="email"
            placeholder="Add reservation tags"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-500">Phone Number</label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={() => {
              setIsCreateModalOpen(false);
              setIsOpen(false);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;