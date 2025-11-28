"use client";
import React, { useState } from "react";
import {
  FiMapPin,
  FiShield,
  FiPackage,
  FiUser,
  FiBarChart2,
  FiHeadphones,
  FiChevronDown,
  FiSend,
  FiMessageSquare,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";
const HelpCenter = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const topicOptions = [
    "Technical Issue",
    "Billing Question",
    "Feature Request",
    "Account Problem",
    "General Inquiry",
    "Bug Report",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTopicSelect = (topic) => {
    setFormData((prev) => ({
      ...prev,
      topic: topic,
    }));
    setSelectedTopic(topic);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const user_id = localStorage.getItem("userid") || "";
      if (!user_id) throw new Error("User not found. Please log in.");

      const payload = {
        name: formData.name,
        email: formData.email,
        topic: formData.topic,
        message: formData.message,
      };

      const res = await fetch(`${API_BASE_URL}/help/contactsupport/${user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `HTTP ${res.status}`);
      }

      const data = await res.json().catch(() => null);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", topic: "", message: "" });
      setSelectedTopic("");

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(""), 3000);
    } catch (err) {
      console.error("Error sending support request:", err);
      setSubmitStatus("error");

      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.topic && formData.message;

  return (
    <div className="flex  bg-white font-sans text-gray-900 h-screen ">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <div className="px-6 py-8 max-w-6xl mx-auto overflow-y-auto">
          <div className="bg-white border-b px-6 py-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Help Center
            </h1>
          </div>

       
          {/* Contact Section */}
          <div className="flex gap-8">
            {/* Left Column - Question Text */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Still have questions?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you couldn't find what you were looking for, reach out to our
                support team, and we'll make sure you get the answers you need
                to succeed.
              </p>
            </div>

            {/* Right Column - Contact Form */}
            <div className="flex-1">
              {submitStatus === "success" && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800 text-sm">
                    <FiMessageSquare className="w-4 h-4" />
                    <span className="font-medium">
                      Message sent successfully!
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Topic Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors flex items-center justify-between"
                    >
                      <span
                        className={
                          formData.topic ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {formData.topic || "Select a topic"}
                      </span>
                      <FiChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {topicOptions.map((topic, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleTopicSelect(topic)}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Enter a message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Request Full seat
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
