"use client";
// pages/ai-scheduler.js
import { useState } from "react";
import Link from "next/link";

export default function AIScheduler() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [availableStaff] = useState([
    { name: "Thomas Johnson", time: "9am-2pm", avatar: "👨‍💼" },
    { name: "Janet Jenkins", time: "9am-2pm", avatar: "👩‍💼" },
    { name: "Ralph Edmiston", time: "9am-2pm", avatar: "👨‍💼" },
    { name: "Larry Henton", time: "9am-2pm", avatar: "👨‍💼" },
  ]);

  const handleGenerateSchedule = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" className="text-white/80 hover:text-white">
                  ←
                </Link>
                <h1 className="text-2xl font-bold">🤖 AI Scheduler</h1>
              </div>
              <div className="text-sm opacity-90">Powered by AI ✨</div>
            </div>
          </div>

          {isGenerating ? (
            /* Loading State */
            <div className="p-12 text-center">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-6">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  It's magic time!
                </h2>
                <p className="text-gray-600">
                  Checking availability and qualifications
                </p>
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Available Staff */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Available Staff
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {availableStaff.map((staff, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100"
                    >
                      <div className="text-3xl mb-2">{staff.avatar}</div>
                      <div className="font-semibold text-gray-800">
                        {staff.name}
                      </div>
                      <div className="text-sm text-gray-600">{staff.time}</div>
                    </div>
                  ))}
                </div>

                {/* AI Settings */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    AI Scheduling Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shift Duration
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg">
                        <option>8 hours</option>
                        <option>6 hours</option>
                        <option>4 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg">
                        <option>Balance workload</option>
                        <option>Minimize costs</option>
                        <option>Employee preferences</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Week Starting
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Staff per Shift
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        defaultValue="3"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center">
                  <button
                    onClick={handleGenerateSchedule}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    ✨ Generate Smart Schedule
                  </button>
                  <p className="text-sm text-gray-600 mt-3">
                    AI will create an optimized schedule based on availability
                    and preferences
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800">
                      Smart Matching
                    </h4>
                    <p className="text-sm text-gray-600">
                      Matches skills with requirements
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl mb-2">⚖️</div>
                    <h4 className="font-semibold text-gray-800">
                      Fair Distribution
                    </h4>
                    <p className="text-sm text-gray-600">
                      Balances workload across team
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl mb-2">🚀</div>
                    <h4 className="font-semibold text-gray-800">
                      Instant Results
                    </h4>
                    <p className="text-sm text-gray-600">
                      Generate schedules in seconds
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
