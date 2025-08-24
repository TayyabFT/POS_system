"use client";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
export default function EditLanguage() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [saving, setSaving] = useState(false);
  const saveConfiguration = async () => {
    try {
      setSaving(true);
      console.log("Saving configuration:");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessAlert(true);
      router.push("/moreSettings");
    } catch (error) {
      console.error("Error saving configuration:", error);
      setFailAlert(true);
    } finally {
      setSaving(false);
    }
  };
  const router = useRouter();
  return (
    <>
      <div className="flex  bg-white font-sans text-gray-900 h-screen ">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <Navbar activeTab="setting" />
          {successAlert && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
              <div
                className="flex items-center p-3 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 shadow-lg min-w-80"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>
                  <span className="font-medium">
                    Language updated successfully updated
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Fail Alert - Positioned at top center */}
          {failAlert && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
              <div
                className="flex items-center p-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 shadow-lg min-w-80"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>
                  <span className="font-medium">Failed to update language</span>
                </div>
              </div>
            </div>
          )}
          <div className="mx-11 my-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <button
                  className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => {
                    router.push("/moreSettings");
                  }}
                >
                  <FiArrowLeft size={24} />
                </button>
                <h1 className="font-medium text-3xl">Language</h1>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    router.push("/moreSettings");
                  }}
                  className="rounded-full font-medium px-6 py-2 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveConfiguration}
                  disabled={saving}
                  className="rounded-full font-medium px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  {saving && <FiLoader className="w-4 h-4 animate-spin" />}
                  Save
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 ">
              <h1 className="text-lg font-bold p-2">Chnage Language</h1>
              <p className="text-sm text-gray-500 p-2">
                Used to calculate product prices,shipping weights, and other
                times
              </p>
              <h1 className="text-md font-medium p-2">Language</h1>
              <select className="border border-gray-200 rounded-lg p-2 w-full">
                <option className="rounded-lg hover:bg-gray-200">
                  English
                </option>
                <option className="rounded-lg hover:bg-gray-200">German</option>
                <option className="rounded-lg hover:bg-gray-200">French</option>
                <option className="rounded-lg hover:bg-gray-200">Greek</option>
                <option className="rounded-lg hover:bg-gray-200">Hindi</option>
              </select>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
