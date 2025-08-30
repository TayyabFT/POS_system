"use client";

// pages/timesheets.js
import { useState } from "react";
import Link from "next/link";

const timesheetData = [
  {
    name: "Lori Jones",
    totalHours: "68:60",
    breakHours: "03:30",
    regularHours: "47:17",
  },
  {
    name: "Jake Dalton",
    totalHours: "62:18",
    breakHours: "02:30",
    regularHours: "54:30",
  },
  {
    name: "Tina Nguyen",
    totalHours: "60:75",
    breakHours: "03:00",
    regularHours: "43:40",
  },
  {
    name: "Randy Lake",
    totalHours: "57:77",
    breakHours: "02:30",
    regularHours: "49:17",
  },
  {
    name: "Paul Carson",
    totalHours: "51:42",
    breakHours: "01:00",
    regularHours: "43:17",
  },
];

export default function Timesheets() {
  const [dateRange, setDateRange] = useState({
    from: "01/16/2025",
    to: "01/16/2025",
  });
  const [conflicts] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-orange-400 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Time Clock Sidebar */}
          <div className="flex">
            <div className="w-80 bg-blue-50 p-4">
              <div className="bg-blue-100 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-600 mb-2">Morning shift</div>
                <div className="text-2xl font-mono font-bold text-gray-800 mb-2">
                  00:00:03
                </div>
                <div className="text-sm text-gray-500">
                  📍 264 5th Ave, New York
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium">My day log</div>
                <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded text-sm">
                  Office 09:02 - active
                </div>
                <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm">
                  Working 08:00 - 08:32 • to...
                </div>
              </div>
            </div>

            {/* Main Timesheets Content */}
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  📊 Timesheets
                </h1>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
                    🔍 Filter
                  </button>
                  <div className="flex items-center gap-2 text-sm">
                    <span>From:</span>
                    <input
                      type="text"
                      value={dateRange.from}
                      className="border px-2 py-1 rounded"
                      onChange={(e) =>
                        setDateRange({ ...dateRange, from: e.target.value })
                      }
                    />
                    <span>to:</span>
                    <input
                      type="text"
                      value={dateRange.to}
                      className="border px-2 py-1 rounded"
                      onChange={(e) =>
                        setDateRange({ ...dateRange, to: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      {conflicts} Conflicts
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      5
                    </span>
                  </div>
                </div>
              </div>

              {/* Timesheets Table */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 text-sm font-medium text-gray-700">
                  <div>First name</div>
                  <div>Total hours</div>
                  <div>Break hours</div>
                  <div>Regular hours</div>
                </div>

                {timesheetData.map((employee, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm">
                        👤
                      </div>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                    <div className="text-gray-700">{employee.totalHours}</div>
                    <div className="text-gray-700">{employee.breakHours}</div>
                    <div className="text-gray-700">{employee.regularHours}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
