"use client";

// pages/open-shifts.js
import { useState } from "react";
import Link from "next/link";

export default function OpenShifts() {
  const [selectedDate, setSelectedDate] = useState("Sunday, Jun 15 2025");
  const [notification] = useState({
    employee: "Tom",
    shift: "Morning shift",
    time: "3:27 pm",
    avatar: "👨‍🍳",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-orange-400 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-gray-600">
                ←
              </Link>
              <h1 className="font-semibold text-gray-800">Open shifts</h1>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <button className="text-gray-400">←</button>
              <h2 className="font-medium text-gray-800">{selectedDate}</h2>
              <button className="text-gray-400">→</button>
            </div>
          </div>

          {/* Notification */}
          <div className="p-4">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-xl">
                  {notification.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {notification.employee} Claimed '{notification.shift}'
                  </div>
                  <div className="text-sm text-gray-600">
                    {notification.time}
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No Open Shifts
              </h3>
              <p className="text-gray-500 text-sm">
                All shifts for this day have been assigned or claimed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
