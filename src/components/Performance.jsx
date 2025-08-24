"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("gross");
  const [selectedDays, setSelectedDays] = useState("7");
  const [selectedOffer, setSelectedOffer] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");

  // Dummy data for different metrics
  const dummyData = {
    gross: {
      value: "$2,000",
      change: "↑ 4%",
      changeColor: "text-green-500",
      chartData: [
        { name: "Mon", value: 280 },
        { name: "Tue", value: 320 },
        { name: "Wed", value: 290 },
        { name: "Thu", value: 350 },
        { name: "Fri", value: 400 },
        { name: "Sat", value: 380 },
        { name: "Sun", value: 280 },
      ],
    },
    orders: {
      value: "1,800",
      change: "↑ 8%",
      changeColor: "text-green-500",
      chartData: [
        { name: "Mon", value: 240 },
        { name: "Tue", value: 280 },
        { name: "Wed", value: 260 },
        { name: "Thu", value: 320 },
        { name: "Fri", value: 380 },
        { name: "Sat", value: 350 },
        { name: "Sun", value: 260 },
      ],
    },
    average: {
      value: "$120",
      change: "↓ 3%",
      changeColor: "text-red-500",
      chartData: [
        { name: "Mon", value: 110 },
        { name: "Tue", value: 125 },
        { name: "Wed", value: 115 },
        { name: "Thu", value: 130 },
        { name: "Fri", value: 140 },
        { name: "Sat", value: 135 },
        { name: "Sun", value: 120 },
      ],
    },
  };

  const cityData = [
    { name: "Atlanta", value: 840, change: "↑ 5.2%" },
    { name: "Houston", value: 653, change: "↑ 8.1%" },
    { name: "Phoenix", value: 708, change: "↑ 3.2%" },
    { name: "Salt Lake City", value: 800, change: "↑ 2.1%" },
    { name: "San Diego", value: 820, change: "↓ 1.4%" },
    { name: "Chicago", value: 530, change: "↑ 6.2%" },
    { name: "Toronto", value: 980, change: "↑ 4.3%" },
  ];

  const storeData = [
    {
      name: "Lemon & Sage Mediterranean Kitchen",
      value: 177,
      change: "↑ 2.3%",
    },
    { name: "Garden Grove Café & Bistro", value: 408, change: "↑ 7.4%" },
    { name: "Bella Vista Pizzeria & Pasta", value: 198, change: "↑ 1.2%" },
    { name: "Twilight Tavern & Lounge", value: 600, change: "↑ 5.8%" },
    { name: "The Harvest Moon Bistro", value: 45, change: "↓ 3.1%" },
    { name: "Olive & Thyme Ristorante", value: 462, change: "↑ 8.9%" },
    { name: "The Loft Kitchen & Bar", value: 189, change: "↑ 4.2%" },
  ];

  const salesData = [
    {
      name: "Tan Tan Noodles",
      orderCount: 1290,
      grossSales: "$1,300",
      revenue: "$12,300",
      avgOrderValue: "$2,000",
    },
    {
      name: "Miso Healthy Sauté",
      orderCount: 1280,
      grossSales: "$1,500",
      revenue: "$10,200",
      avgOrderValue: "$2,600",
    },
  ];

  const currentData = dummyData[selectedMetric];

  return (
    <div className="flex h-screen  bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <Navbar activeTab="performance" />

        <div className="h-screen bg-gray-50 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Performance Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Performance</h2>
                <div className="flex space-x-4">
                  <select
                    value={selectedDays}
                    onChange={(e) => setSelectedDays(e.target.value)}
                    className="border rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                  </select>
                  <select
                    value={selectedOffer}
                    onChange={(e) => setSelectedOffer(e.target.value)}
                    className="border rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="all">All Offers</option>
                    <option value="discount">Discounts</option>
                  </select>
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="border rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="all">All store and brand</option>
                    <option value="specific">Specific Store</option>
                  </select>
                </div>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedMetric === "gross"
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedMetric("gross")}
                >
                  <div className="text-sm text-gray-600 mb-1">Gross sales</div>
                  <div className="text-2xl font-bold">
                    {dummyData.gross.value}
                  </div>
                  <div className={`text-sm ${dummyData.gross.changeColor}`}>
                    {dummyData.gross.change} vs yesterday
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedMetric === "orders"
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedMetric("orders")}
                >
                  <div className="text-sm text-gray-600 mb-1">Order Volume</div>
                  <div className="text-2xl font-bold">
                    {dummyData.orders.value}
                  </div>
                  <div className={`text-sm ${dummyData.orders.changeColor}`}>
                    {dummyData.orders.change} vs yesterday
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedMetric === "average"
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedMetric("average")}
                >
                  <div className="text-sm text-gray-600 mb-1">
                    Average Order Value
                  </div>
                  <div className="text-2xl font-bold">
                    {dummyData.average.value}
                  </div>
                  <div className={`text-sm ${dummyData.average.changeColor}`}>
                    {dummyData.average.change} vs yesterday
                  </div>
                </div>
              </div>

              {/* City Performance */}
              <div className="grid grid-cols-7 gap-3 mb-6">
                {cityData.map((city, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 text-white p-3 rounded-lg text-center"
                  >
                    <div className="text-xs text-gray-300 mb-1">
                      {city.name}
                    </div>
                    <div className="font-semibold">{city.value}</div>
                    <div className="text-xs text-green-400">{city.change}</div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Atlanta Chart */}
                <div>
                  <h3 className="font-semibold mb-4">Atlanta</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sales by Store */}
                <div>
                  <h3 className="font-semibold mb-4">📊 Sales by Store</h3>
                  <div className="space-y-3">
                    {storeData.map((store, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">{store.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{store.value}</span>
                          <span
                            className={`text-xs ${
                              store.change.includes("↑")
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {store.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Analytics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">📈 Sales Analytics</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Item Name</th>
                      <th className="text-left py-3 px-4">Order Count</th>
                      <th className="text-left py-3 px-4">Gross Sales</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                      <th className="text-left py-3 px-4">
                        Average Order Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              🍜
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{item.orderCount}</td>
                        <td className="py-3 px-4">{item.grossSales}</td>
                        <td className="py-3 px-4">{item.revenue}</td>
                        <td className="py-3 px-4">{item.avgOrderValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
