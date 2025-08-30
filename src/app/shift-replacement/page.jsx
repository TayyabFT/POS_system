" use client";

// pages/shift-replacement.js
import { useState } from "react";
import Link from "next/link";

export default function ShiftReplacement() {
  const [showReplacement, setShowReplacement] = useState(true);

  const replacementRequest = {
    from: {
      name: "Sarah Johnson",
      avatar: "👩‍🍳",
    },
    to: {
      name: "Mike Wilson",
      avatar: "👨‍🍳",
    },
    shift: "Morning shift",
    date: "Sunday, Jun 15 2025",
    time: "7:00am - 3:00pm",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 p-4">
      <div className="max-w-md mx-auto">
        {showReplacement && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                ✨
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                It's magic time!
              </h2>
              <p className="text-gray-600 text-sm">
                Checking availability and qualifications
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mb-2">
                    {replacementRequest.from.avatar}
                  </div>
                  <div className="text-xs text-gray-600">
                    {replacementRequest.from.name}
                  </div>
                </div>

                <div className="text-2xl text-gray-400">↔</div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl mb-2">
                    {replacementRequest.to.avatar}
                  </div>
                  <div className="text-xs text-gray-600">
                    {replacementRequest.to.name}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Shift Replacement
                </h3>
                <div className="text-sm text-gray-600">
                  {replacementRequest.shift} • {replacementRequest.time}
                </div>
                <div className="text-sm text-gray-500">
                  {replacementRequest.date}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReplacement(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
              >
                Decline
              </button>
              <button className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
                Accept
              </button>
            </div>
          </div>
        )}

        {/* Available Staff */}
        <div className="bg-white rounded-xl p-4">
          <div className="space-y-3">
            {[
              { name: "Thomas Johnson", time: "9am-2pm", avatar: "👨‍💼" },
              { name: "Janet Jenkins", time: "9am-2pm", avatar: "👩‍💼" },
              { name: "Ralph Edmiston", time: "9am-2pm", avatar: "👨‍💼" },
              { name: "Larry Henton", time: "9am-2pm", avatar: "👨‍💼" },
            ].map((staff, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {staff.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{staff.name}</div>
                  <div className="text-sm text-gray-600">{staff.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
