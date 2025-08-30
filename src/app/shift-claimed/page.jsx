"use client";

// pages/shift-claimed.js
import { useState } from "react";
import Link from "next/link";

export default function ShiftClaimed() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <button className="text-gray-600">←</button>
              <h1 className="font-semibold text-gray-800">
                Sunday, Jun 15 2025
              </h1>
              <button className="text-gray-600">→</button>
            </div>
          </div>

          {/* Shift Info */}
          <div className="p-6">
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Morning Shift
              </h2>
              <div className="text-gray-600 mb-4">07:00am - 04:00pm (9h)</div>

              <div className="bg-teal-500 text-white py-3 px-6 rounded-xl font-medium">
                ✓ Shift Claimed
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-4">
          <Link
            href="/"
            className="block w-full bg-blue-500 text-white text-center py-3 rounded-xl font-medium hover:bg-blue-600"
          >
            Back to Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
