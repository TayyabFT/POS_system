"use client";
import React from "react";

export default function LogoutModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Are you sure you want to logout?
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-6">
          Ensure you’ve saved your work before logging out. Any unsaved changes
          may be lost.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
