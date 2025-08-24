"use client";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiUser,
  FiChevronRight,
  FiChevronLeft,
  FiEdit,
  FiShoppingCart,
  FiTag,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPrinter,
  FiPhone,
  FiHome,
  FiX,
  FiDollarSign,
  FiCreditCard,
  FiPieChart,
  FiSettings,
  FiCalendar,
  FiClock as FiTime,
  FiUserPlus,
  FiGrid,
  FiMenu,
  FiPackage,
  FiCamera,
  FiMail,
} from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ tabname }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  // Helper function to determine if a tab is active
  const isActive = (tabName) => tabname === tabName;

  // Helper function to get tab classes
  const getTabClasses = (tabName) => {
    const baseClasses =
      "flex items-center gap-3 p-3 rounded-lg transition cursor-pointer";

    if (isActive(tabName)) {
      return `${baseClasses} bg-white text-black font-medium`;
    } else {
      return `${baseClasses} text-gray-300 hover:text-white hover:bg-gray-800`;
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-black text-white flex flex-col items-center py-6 transition-all duration-300 ease-in-out`}
      >
        <div className="w-14 h-14 bg-white rounded-lg mb-8 flex items-center justify-center text-black font-bold text-xl">
          {sidebarOpen ? (
            <span className="text-2xl font-bold">POS</span>
          ) : (
            <span className="text-xl">P</span>
          )}
        </div>

        <nav className="flex flex-col w-full px-4 gap-2">
          <div
            className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={20} />
            {sidebarOpen && <span>Collapse Menu</span>}
          </div>

          <div
            className={getTabClasses("orders")}
            onClick={() => {
              router.push("/pos");
            }}
          >
            <FiShoppingCart size={20} />
            {sidebarOpen && <span>Orders</span>}
          </div>

          <div
            className={getTabClasses("analytics")}
            onClick={() => {
              router.push("/analytics");
            }}
          >
            <FiPieChart size={20} />
            {sidebarOpen && <span>Analytics</span>}
          </div>

          <div
            className={getTabClasses("customers")}
            onClick={() => {
              router.push("/customers");
            }}
          >
            <FiUser size={20} />
            {sidebarOpen && <span>Customers</span>}
          </div>

          <div
            className={getTabClasses("events")}
            onClick={() => {
              router.push("/events");
            }}
          >
            <FiCalendar size={20} />
            {sidebarOpen && <span>Events</span>}
          </div>

          <div
            className={getTabClasses("marchandise")}
            onClick={() => {
              router.push("/marchandise");
            }}
          >
            <FiPackage size={20} />
            {sidebarOpen && <span>Marchandise</span>}
          </div>

          <div
            className={getTabClasses("reports")}
            onClick={() => {
              router.push("/reports");
            }}
          >
            <FiPrinter size={20} />
            {sidebarOpen && <span>Reports</span>}
          </div>

          <div
            className={getTabClasses("settings")}
            onClick={() => {
              router.push("/settings");
            }}
          >
            <FiSettings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </div>
        </nav>
      </aside>
    </>
  );
}
