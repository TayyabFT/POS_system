"use client";
import { FiClock, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useScroll } from "framer-motion";
import { useState } from "react";

export default function Navbar({ activeTab }) {
  const formatDate = () => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date().toLocaleDateString("en-US", options);
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  const tabs = [
    { id: "new-order", label: "New Order", path: "/pos" },
    { id: "reservations", label: "Reservations", path: "/reservation" },
    { id: "transactions", label: "Transactions", path: "/transaction" },
    { id: "table", label: "Inventory", path: "/inventory" },
  ];

  const handleTabClick = (tab) => {
    router.push(tab.path);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex gap-2 items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`px-5 py-2 rounded-lg    font-medium transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-black text-white shadow hover:bg-gray-800"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 flex items-center gap-2">
        <FiClock size={16} />
        <span>{formatDate()}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border border-gray-300">
          <FiUser size={16} />
        </div>
        <span className="font-medium">Alex Bizer</span>
      </div>
    </header>
  );
}
