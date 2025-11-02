"use client";
import { useState, useEffect } from "react";
import {
  FiUpload,
  FiEye,
  FiEyeOff,
  FiSave,
  FiX,
  FiMapPin,
  FiLock,
  FiPlusCircle,
  FiFilePlus,
  FiImage,
} from "react-icons/fi";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import { FcEditImage } from "react-icons/fc";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";
export default function AccountSettings() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    pin: "",
    facebook: "",
    instagram: "",
    tik_tok: "",
    thread: "",
  });
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
    pin: false,
  });

  const [showAlert, setShowAlert] = useState({
    type: "",
    message: "",
    visible: false,
  });
  const [isPasswordSection, setIsPasswordSection] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  // Dummy address suggestions
  const addressSuggestions = [
    "3605 Parker Rd.",
    "8958 Green Rd.",
    "7529 E. Pecan St.",
    "3930 Poplar Dr.",
    "775 Rolling Green Rd.",
  ];

  const showAlertMessage = (type, message) => {
    setShowAlert({ type, message, visible: true });
    setTimeout(() => {
      setShowAlert((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userid");
        if (!storedUserId) {
          showAlertMessage("error", "User not logged in");
          setLoading(false);
          return;
        }

        setUserId(storedUserId);
        const response = await fetch(
          `${API_BASE_URL}/getuserprofile/${storedUserId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const result = await response.json();
        if (result.success && result.data) {
          const userData = result.data;
          
          // Strip "https://" prefix from social media URLs for display
          const stripHttps = (url) => {
            if (!url) return "";
            return url.replace(/^https?:\/\//, "");
          };
          
          setFormData({
            full_name: userData.full_name || "",
            email: userData.email || "",
            phone_number: userData.phone_number || "",
            address: userData.address === "Not Provided" ? "" : (userData.address || ""),
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            pin: "",
            facebook: stripHttps(userData.facebook),
            instagram: stripHttps(userData.instagram),
            tik_tok: stripHttps(userData.tik_tok),
            thread: stripHttps(userData.thread),
          });
          setProfileImageUrl(userData.profile_image_url);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        showAlertMessage("error", "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Show address dropdown when typing
    if (name === "address" && value.length > 0) {
      setShowAddressDropdown(true);
    } else if (name === "address" && value.length === 0) {
      setShowAddressDropdown(false);
    }
  };

  const handleAddressSelect = (address) => {
    setFormData((prev) => ({
      ...prev,
      address: address,
    }));
    setShowAddressDropdown(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfileImageUrl(e.target.result);
      reader.readAsDataURL(file);
      showAlertMessage("success", "Avatar uploaded successfully!");
    }
  };

  const handleSave = async () => {
    if (!formData.full_name || !formData.email) {
      showAlertMessage("error", "Please fill in all required fields");
      return;
    }

    if (isPasswordSection) {
      if (
        !formData.currentPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        showAlertMessage("error", "Please fill in all password fields");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        showAlertMessage("error", "New passwords do not match");
        return;
      }

      if (formData.newPassword.length < 6) {
        showAlertMessage("error", "Password must be at least 6 characters");
        return;
      }
    }

    if (!userId) {
      showAlertMessage("error", "User not logged in");
      return;
    }

    try {
      // Prepare form data for image upload
      const formDataToSend = new FormData();
      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone_number", formData.phone_number || "");
      formDataToSend.append("address", formData.address || "Not Provided");
      
      // Prepend "https://" to social media URLs if they don't already have it
      const prependHttps = (url) => {
        if (!url) return "";
        if (url.startsWith("http://") || url.startsWith("https://")) return url;
        return `https://${url}`;
      };
      
      if (formData.newPassword) {
        formDataToSend.append("password", formData.newPassword);
      }
      formDataToSend.append("facebook", prependHttps(formData.facebook));
      formDataToSend.append("instagram", prependHttps(formData.instagram));
      formDataToSend.append("tik_tok", prependHttps(formData.tik_tok));
      formDataToSend.append("thread", prependHttps(formData.thread));

      // Add image file if selected
      if (selectedImageFile) {
        formDataToSend.append("image", selectedImageFile);
      }

      const response = await fetch(
        `${API_BASE_URL}/updateuserprofile/${userId}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const result = await response.json();
      if (result.success) {
        showAlertMessage("success", "Account settings updated successfully!");
        
        // Update profile image URL if returned
        if (result.data?.profile_image_url) {
          setProfileImageUrl(result.data.profile_image_url);
        }

        if (isPasswordSection) {
          setFormData((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }));
          setIsPasswordSection(false);
        }
        setSelectedImageFile(null);
        
        // Dispatch custom event to notify navbar to refresh profile
        window.dispatchEvent(new Event("profileUpdated"));
        // Also update localStorage to trigger storage event for other tabs
        localStorage.setItem("profileUpdated", Date.now().toString());
      } else {
        showAlertMessage("error", result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showAlertMessage("error", error.message || "Failed to update profile");
    }
  };

  const handleChangeEmail = () => {
    if (!newEmail || !emailPassword) {
      showAlertMessage("error", "Please fill in all fields");
      return;
    }

    if (!newEmail.includes("@")) {
      showAlertMessage("error", "Please enter a valid email address");
      return;
    }

    setFormData((prev) => ({ ...prev, email: newEmail }));
    setShowChangeEmailModal(false);
    setNewEmail("");
    setEmailPassword("");
    showAlertMessage("success", "Email successfully updated");
  };

  const handleDiscard = async () => {
    if (!userId) {
      showAlertMessage("error", "User not logged in");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/getuserprofile/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const result = await response.json();
      if (result.success && result.data) {
        const userData = result.data;
        
        // Strip "https://" prefix from social media URLs for display
        const stripHttps = (url) => {
          if (!url) return "";
          return url.replace(/^https?:\/\//, "");
        };
        
        setFormData({
          full_name: userData.full_name || "",
          email: userData.email || "",
          phone_number: userData.phone_number || "",
          address: userData.address === "Not Provided" ? "" : (userData.address || ""),
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          pin: "",
          facebook: stripHttps(userData.facebook),
          instagram: stripHttps(userData.instagram),
          tik_tok: stripHttps(userData.tik_tok),
          thread: stripHttps(userData.thread),
        });
        setProfileImageUrl(userData.profile_image_url);
        setSelectedImageFile(null);
        setIsPasswordSection(false);
        showAlertMessage("success", "Changes discarded");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      showAlertMessage("error", "Failed to reload user profile");
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const generateRandomPIN = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setFormData((prev) => ({ ...prev, pin }));
    showAlertMessage("success", "New PIN generated successfully!");
  };

  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex bg-white font-sans text-gray-900 h-screen">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <div className="mx-11 my-4 pr-4 overflow-y-auto flex items-center justify-center">
            <div className="text-gray-600">Loading profile...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex  bg-white font-sans text-gray-900 h-screen ">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <div className="mx-11 my-4 pr-4 overflow-y-auto">
          {/* Alert Messages */}
          {showAlert.visible && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div
                className={`flex items-center p-3 rounded-lg shadow-lg min-w-80 ${
                  showAlert.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-300"
                    : "bg-red-50 text-red-800 border border-red-300"
                }`}
              >
                <span className="font-medium">{showAlert.message}</span>
              </div>
            </div>
          )}

          {/* Change Email Modal */}
          {showChangeEmailModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Change Email</h3>
                  <button
                    onClick={() => setShowChangeEmailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New email
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter new email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the new email address for this account.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.email ? "text" : "password"}
                        value={emailPassword}
                        onChange={(e) => setEmailPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("email")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.email ? (
                          <FiEyeOff size={16} />
                        ) : (
                          <FiEye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setShowChangeEmailModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleChangeEmail}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Account Setting
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDiscard}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FiSave size={16} />
                Save
              </button>
            </div>
          </div>

          <div className="">
            {/* Details Section */}
            <div className="grid md:grid-cols-2 gap-8 rounded-lg border border-gray-200 p-4 my-4">
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Details
                </h2>
              </div>

              {/* Avatar */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar
                </label>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-600 overflow-hidden">
                        {profileImageUrl ? (
                          <img
                            src={profileImageUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitials(formData.full_name)
                        )}
                      </div>
                      <div className="border border-dashed p-4 rounded-lg flex gap-2">
                        <FiImage size={20} className="" />
                        <input
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden "
                        />
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2"
                        >
                          <FiUpload size={14} />
                          Drag and drop images here or Browse
                        </label>
                      </div>
                    </div>
                    {/* Name Field */}
                    <div className="">
                      <div className="my-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Identity & Security Section */}
            <div>
              {/* Identity Section */}
              <div className="grid grid-cols-2 border border-gray-200 p-4 rounded-lg">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 mb-4">
                    Identity
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Changed your password.
                  </p>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 my-2 rounded-lg bg-gray-50"
                    disabled
                  />
                  <button
                    onClick={() => setShowChangeEmailModal(true)}
                    className="border border-black p-2 rounded-full hover:cursor-pointer my-4 text-sm mt-2"
                  >
                    Change Email
                  </button>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Address with Autocomplete */}
                  <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FiMapPin
                        size={16}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                    </div>

                    {/* Address Dropdown */}
                    {showAddressDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {addressSuggestions
                          .filter((addr) =>
                            addr
                              .toLowerCase()
                              .includes(formData.address.toLowerCase())
                          )
                          .map((address, index) => (
                            <button
                              key={index}
                              onClick={() => handleAddressSelect(address)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            >
                              {address}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="grid grid-cols-2 p-4 border border-gray-200 my-4 rounded-lg">
                <div>
                  {" "}
                  <h2 className="text-lg font-medium text-gray-800 mb-4">
                    Security
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Changed your password.
                  </p>
                </div>
                <div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      You have never changed your password.
                    </p>
                    <button
                      onClick={() => setIsPasswordSection(true)}
                      className=" font-medium rounded-full border border-gray-200 p-2 my-2 hover:cursor-pointer"
                    >
                      Change your password
                    </button>
                  </div>
                  {isPasswordSection && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <div className="flex justify-between">
                          <h1 className="text-lg font-bold py-2">
                            Change your password
                          </h1>
                          <button
                            onClick={() => {
                              setIsPasswordSection(false);
                            }}
                          >
                            <FiX
                              size={30}
                              className="bg-gray-200 rounded-full p-1 hover:cursor-pointer"
                            />
                          </button>
                        </div>
                        <div className="">
                          {/* Current Password */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={
                                  showPasswords.current ? "text" : "password"
                                }
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  togglePasswordVisibility("current")
                                }
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords.current ? (
                                  <FiEyeOff size={16} />
                                ) : (
                                  <FiEye size={16} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* New Password */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showPasswords.new ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility("new")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords.new ? (
                                  <FiEyeOff size={16} />
                                ) : (
                                  <FiEye size={16} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Confirm Password */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={
                                  showPasswords.confirm ? "text" : "password"
                                }
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  togglePasswordVisibility("confirm")
                                }
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords.confirm ? (
                                  <FiEyeOff size={16} />
                                ) : (
                                  <FiEye size={16} />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <button
                              onClick={() => setIsPasswordSection(false)}
                              className="text-sm text-gray-600 hover:cursor-pointer hover:text-gray-800 rounded-full border border-gray-200 p-2 my-2"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setIsPasswordSection(false)}
                              className="text-sm text-white bg-blue-500 hover:cursor-pointer  rounded-full border border-gray-200 p-2 my-2"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PIN Section */}

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type={showPasswords.pin ? "text" : "password"}
                        name="pin"
                        value={formData.pin}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("pin")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.pin ? (
                          <FiEyeOff size={16} />
                        ) : (
                          <FiEye size={16} />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={generateRandomPIN}
                      className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      Generate random PIN
                    </button>
                  </div>
                </div>
              </div>
              {/* Social Media Section */}
              <div className="grid grid-cols-2 rounded-lg border border-gray-200 p-4 my-4">
                <div>
                  {" "}
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    Social Media
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Allow customisations such as add-ons or special requests.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Facebook & Instagram */}
                  <div className="">
                    <div className="w-11 my-2 ">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facebook
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                          https://
                        </span>
                        <input
                          type="text"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="w-11">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                          https://
                        </span>
                        <input
                          type="text"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TikTok & Thread */}
                  <div className="">
                    <div className="w-11">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiktok
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                          https://
                        </span>
                        <input
                          type="text"
                          name="tik_tok"
                          value={formData.tik_tok}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="w-11">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thread
                      </label>
                      <div className="flex ">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg ">
                          https://
                        </span>
                        <input
                          type="text"
                          name="thread"
                          value={formData.thread}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
