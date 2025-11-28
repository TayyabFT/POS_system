"use client";
import {
  FiClock,
  FiUser,
  FiMoreHorizontal,
  FiHome,
  FiBarChart,
  FiTrendingUp,
  FiSettings,
  FiBell,
  FiDroplet,
  FiArrowDown,
  FiChevronDown,
  FiHelpCircle,
} from "react-icons/fi";
import LogoutModal from "./LogoutModal";
import { useRouter } from "next/navigation";
import { useScroll } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import NotificationPanel from "./Notification";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

export default function Navbar({ activeTab, tabname }) {
  const [profileDrop, setProfileDrop] = useState(false);
  const [userProfile, setUserProfile] = useState({
    full_name: "",
    profile_image_url: null,
  });
  const [loading, setLoading] = useState(true);
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
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null); // Add ref for profile dropdown
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const tabs = [
    { id: "new-order", label: "New Order", path: "/pos" },
    // { id: "reservations", label: "Reservations", path: "/reservation" },
    { id: "transactions", label: "Transactions", path: "/transaction" },
    { id: "table", label: "Table", path: "/table" },
    { id: "kitchen", label: "Kitchen", icon: FiHome, path: "/kitchen" },

  ];

  const dropdownProfileItems = [
    {
      id: "profile",
      label: "Profile Settings",
      icon: FiSettings,
      path: "/profileSettings",
    },
    { id: "logout", label: "Logout", icon: FiArrowDown },
    {
      id: "help&support",
      label: "Help & Support",
      icon: FiHelpCircle,
      path: "/help",
    },
  ];

  const dropdownItems = [
    { id: "overview", label: "Overview", icon: FiBarChart, path: "/overview" },
    {
      id: "setting",
      label: "Setting",
      icon: FiSettings,
      path: "/moreSettings",
    },
  ];

  // Check if any dropdown item is active
  const isDropdownItemActive = dropdownItems.some(
    (item) => activeTab === item.id
  );

  const handleTabClick = (tab) => {
    router.push(tab.path);
  };

  const handleDropdownClick = (item) => {
    if (item.id === "logout") {
      setShowLogout(true);
      setOpenDropdown(false);
      return;
    }
    router.push(item.path);
    setOpenDropdown(false);
  };

  // Fixed handleProfileDropdownClick function
  const handleProfileDropdownClick = (item) => {
    if (item.id === "logout") {
      setShowLogout(true);
      setProfileDrop(false);
      return;
    }
    router.push(item.path);
    setProfileDrop(false);
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const storedUserId = localStorage.getItem("userid");
      if (!storedUserId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/getuserprofile/${storedUserId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const result = await response.json();
      if (result.success && result.data) {
        setUserProfile({
          full_name: result.data.full_name || "",
          profile_image_url: result.data.profile_image_url,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get initials from full name
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  // Fetch profile on mount and listen for updates
  useEffect(() => {
    fetchUserProfile();

    // Listen for profile update events from ProfileSettings
    const handleProfileUpdate = () => {
      fetchUserProfile();
    };

    // Listen for custom event
    window.addEventListener("profileUpdated", handleProfileUpdate);

    // Listen for storage changes (if profile is updated via localStorage)
    const handleStorageChange = (e) => {
      if (e.key === "profileUpdated") {
        fetchUserProfile();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close main dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
      // Close profile dropdown
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex gap-2 items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`px-4 py-2 rounded-full border border-gray-200 font-medium transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-black text-white shadow hover:bg-gray-800"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </div>
        ))}

        {/* Three dots menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            className={`p-2 rounded-lg font-medium transition cursor-pointer ${
              openDropdown || isDropdownItemActive
                ? "bg-black text-white shadow hover:bg-gray-800"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <FiMoreHorizontal size={20} />
          </button>

          {/* Dropdown menu */}
          {openDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {dropdownItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 transition ${
                      activeTab === item.id
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleDropdownClick(item)}
                  >
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500 flex items-center gap-2 rounded-full border border-gray-200 p-2">
        <FiClock size={16} />
        <span>{formatDate()}</span>
      </div>

      <NotificationPanel />

      <div
        className="relative flex items-center gap-3 rounded-full border border-gray-200 p-2"
        ref={profileDropdownRef}
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border hover:cursor-pointer border-gray-300 overflow-hidden">
          {userProfile.profile_image_url ? (
            <img
              src={userProfile.profile_image_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-semibold">
              {getInitials(userProfile.full_name)}
            </span>
          )}
        </div>
        <span
          className="font-medium flex gap-1 hover:cursor-pointer"
          onClick={() => {
            setProfileDrop(!profileDrop);
          }}
        >
          {userProfile.full_name || "User"}{" "}
          <FiChevronDown className="hover:cursor-pointer" size={20} />
        </span>
        {profileDrop && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {dropdownProfileItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 transition ${
                    activeTab === item.id
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleProfileDropdownClick(item)}
                >
                  <IconComponent size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <LogoutModal
        show={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          try {
            localStorage.removeItem("userid");
          } catch (err) {
            console.warn("Could not remove userid from localStorage:", err);
          }
          router.push("/");
        }}
      />
    </header>
  );
}
