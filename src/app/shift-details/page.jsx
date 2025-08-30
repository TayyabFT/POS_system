"use client";

// pages/shift-details.js
import { useState } from "react";
import Link from "next/link";

export default function ShiftDetails() {
  const [selectedDate, setSelectedDate] = useState("Thursday, July 7, 2025");

  const shiftInfo = {
    employee: {
      name: "Abby Wing",
      avatar: "👩‍🍳",
      position: "Cook",
    },
    shift: {
      type: "Morning shift",
      time: "1pm - 5pm (4 hours)",
      date: "Thursday, July 7, 2025",
      location: "4860 Carmela Trail Suite 372",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-ahidden">
          {/* Header */}
          <div className="bg-teal-50 p-4 border-b">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-gray-600">
                ←
              </Link>
              <h1 className="font-semibold text-gray-800">Shift details</h1>
            </div>
          </div>

          {/* Employee Info */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                {shiftInfo.employee.avatar}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {shiftInfo.employee.name}
                </h2>
              </div>
            </div>

            {/* Shift Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {shiftInfo.shift.type}
                </h3>
                <div className="flex items-center gap-2 text-teal-600 mb-1">
                  <span>🕐</span>
                  <span>{shiftInfo.shift.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-blue-600">
                <span>📅</span>
                <span>{shiftInfo.shift.date}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <span>📍</span>
                <span className="text-sm">{shiftInfo.shift.location}</span>
              </div>

              <div className="flex items-center gap-2 text-purple-600">
                <span>👨‍🍳</span>
                <span>Job → {shiftInfo.employee.position}</span>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <span>📝</span>
                  <span>Shift note</span>
                </div>
              </div>

              <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                📋 Shift Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
