"use client";
// pages/time-clock.js
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TimeClock() {
  const [currentTime, setCurrentTime] = useState("00:00:02");
  const [isActive, setIsActive] = useState(true);
  const [dayLog, setDayLog] = useState([
    {
      type: "Office",
      time: "09:02 - active",
      color: "bg-purple-100 text-purple-700",
    },
    {
      type: "Working",
      time: "08:00 - 08:32 • to...",
      color: "bg-blue-100 text-blue-700",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
              <h1 className="font-semibold text-gray-800">Time Clock</h1>
            </div>
          </div>

          {/* Time Display */}
          <div className="p-6">
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Morning shift</div>
                <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
                  {currentTime}
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  📍 264 5th Ave, New York
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex mb-4">
              <button className="flex-1 py-2 text-sm font-medium text-gray-400">
                Attachments
              </button>
              <button className="flex-1 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                My day log
              </button>
            </div>

            {/* Day Log */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">My day log</h3>
                <button className="text-sm text-gray-500 flex items-center gap-1">
                  🗺️ Map
                </button>
              </div>

              {dayLog.map((entry, idx) => (
                <div
                  key={idx}
                  className={`${entry.color} px-3 py-2 rounded-lg flex items-center gap-2`}
                >
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">{entry.type}</div>
                    <div className="text-xs">{entry.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={() => setIsActive(!isActive)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-medium text-lg"
            >
              ⏰ End
            </button>

            {/* Bottom Actions */}
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <button className="flex items-center gap-1">
                📋 My timesheet
              </button>
              <button className="flex items-center gap-1">
                🌟 Start break
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
