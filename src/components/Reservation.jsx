"use client";
import { useState, useMemo } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiGrid,
  FiList,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Navbar from "./navbar";

export default function ReservationPage() {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("15:30");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" or "visual"
  const [expandedSections, setExpandedSections] = useState({
    mainFloor: true,
    diningRoom: true,
    bar: true,
  });

  // Dummy data - can be replaced with API calls
  const dummyData = {
    timeSlots: [
      { time: "9:00", period: "AM", reservations: 3, capacity: 24 },
      { time: "10:00", period: "AM", reservations: 5, capacity: 24 },
      { time: "11:00", period: "AM", reservations: 8, capacity: 24 },
      { time: "12:00", period: "PM", reservations: 12, capacity: 24 },
      { time: "13:00", period: "PM", reservations: 15, capacity: 24 },
      { time: "15:30", period: "PM", reservations: 18, capacity: 24 },
      { time: "16:00", period: "PM", reservations: 10, capacity: 24 },
      { time: "18:00", period: "PM", reservations: 20, capacity: 24 },
      { time: "19:00", period: "PM", reservations: 22, capacity: 24 },
    ],

    upcomingReservations: [
      {
        id: 1,
        name: "Ava Max",
        avatar: "AM",
        color: "bg-pink-100 text-pink-600",
        floor: "Main Floor",
        table: "T2",
        time: "19:00",
        guests: 4,
        status: "confirmed",
      },
      {
        id: 2,
        name: "Amanda Johnson",
        avatar: "AJ",
        color: "bg-blue-100 text-blue-600",
        floor: "Main Floor",
        table: "T5",
        time: "19:30",
        guests: 2,
        status: "confirmed",
      },
      {
        id: 3,
        name: "Michael Brown",
        avatar: "MB",
        color: "bg-green-100 text-green-600",
        floor: "Dining Room",
        table: "T3",
        time: "20:00",
        guests: 6,
        status: "confirmed",
      },
      {
        id: 4,
        name: "Sarah Wilson",
        avatar: "SW",
        color: "bg-purple-100 text-purple-600",
        floor: "Bar",
        table: "B1",
        time: "18:30",
        guests: 3,
        status: "pending",
      },
    ],

    floors: {
      "Main Floor": {
        tables: [
          {
            id: "T1",
            capacity: 4,
            guest: "Jonathan Kelly",
            avatar: "JK",
            guests: 2,
            status: "arrived",
            statusColor: "bg-green-500",
            position: { row: 1, col: 1 },
          },
          {
            id: "T2",
            capacity: 4,
            guest: "Molly Vaughan",
            avatar: "MV",
            guests: "2 of 6",
            status: "arrived",
            statusColor: "bg-green-500",
            position: { row: 1, col: 2 },
          },
          {
            id: "T3",
            capacity: 4,
            guest: null,
            status: "available",
            position: { row: 2, col: 1 },
          },
          {
            id: "T4",
            capacity: 6,
            guest: "David Smith",
            avatar: "DS",
            guests: 4,
            status: "seated",
            statusColor: "bg-blue-500",
            position: { row: 1, col: 3 },
          },
          {
            id: "T5",
            capacity: 4,
            guest: null,
            status: "available",
            position: { row: 2, col: 2 },
          },
          {
            id: "T6",
            capacity: 2,
            guest: "Lisa Chen",
            avatar: "LC",
            guests: 2,
            status: "ordered",
            statusColor: "bg-orange-500",
            position: { row: 1, col: 4 },
          },
          {
            id: "T7",
            capacity: 4,
            guest: "Mike Johnson",
            avatar: "MJ",
            guests: 3,
            status: "running",
            statusColor: "bg-purple-500",
            position: { row: 2, col: 3 },
          },
          {
            id: "T8",
            capacity: 6,
            guest: null,
            status: "available",
            position: { row: 1, col: 5 },
          },
          {
            id: "T9",
            capacity: 2,
            guest: null,
            status: "available",
            position: { row: 2, col: 4 },
          },
          {
            id: "T10",
            capacity: 4,
            guest: null,
            status: "available",
            position: { row: 3, col: 1 },
          },
          {
            id: "T11",
            capacity: 4,
            guest: null,
            status: "available",
            position: { row: 3, col: 2 },
          },
          {
            id: "T12",
            capacity: 4,
            guest: null,
            status: "available",
            position: { row: 3, col: 3 },
          },
          {
            id: "T13",
            capacity: 8,
            guest: null,
            status: "available",
            position: { row: 4, col: 1 },
          },
          {
            id: "T14",
            capacity: 8,
            guest: null,
            status: "available",
            position: { row: 4, col: 2 },
          },
          {
            id: "T15",
            capacity: 4,
            guest: "Anna Wilson",
            avatar: "AW",
            guests: 2,
            status: "running",
            statusColor: "bg-purple-500",
            position: { row: 3, col: 4 },
          },
          {
            id: "T16",
            capacity: 2,
            guest: null,
            status: "available",
            position: { row: 2, col: 5 },
          },
          {
            id: "T17",
            capacity: 4,
            guest: null,
            status: "available",
            position: { row: 3, col: 5 },
          },
          {
            id: "T18",
            capacity: 6,
            guest: null,
            status: "available",
            position: { row: 1, col: 6 },
          },
          {
            id: "T19",
            capacity: 4,
            guest: null,
            status: "available",
            position: { row: 2, col: 6 },
          },
          {
            id: "T22",
            capacity: 2,
            guest: null,
            status: "available",
            position: { row: 4, col: 5 },
          },
          {
            id: "T23",
            capacity: 2,
            guest: null,
            status: "available",
            position: { row: 4, col: 6 },
          },
        ],
        occupancyRate: 60,
        totalTables: 21,
      },
      "Dining Room": {
        tables: [
          {
            id: "T1",
            capacity: 8,
            guest: "Ava Max",
            avatar: "AM",
            guests: 6,
            status: "arrived",
            statusColor: "bg-green-500",
          },
          { id: "T2", capacity: 6, guest: null, status: "available" },
          {
            id: "T3",
            capacity: 4,
            guest: "Robert Johnson",
            avatar: "RJ",
            guests: 3,
            status: "seated",
            statusColor: "bg-blue-500",
          },
          {
            id: "T4",
            capacity: 10,
            guest: null,
            status: "reserved",
            statusColor: "bg-yellow-500",
          },
        ],
        occupancyRate: 50,
        totalTables: 4,
      },
      Bar: {
        tables: [
          {
            id: "B1",
            capacity: 2,
            guest: "Tom Hardy",
            avatar: "TH",
            guests: 2,
            status: "arrived",
            statusColor: "bg-green-500",
          },
          { id: "B2", capacity: 2, guest: null, status: "available" },
          {
            id: "B3",
            capacity: 4,
            guest: "Emma Stone",
            avatar: "ES",
            guests: 1,
            status: "seated",
            statusColor: "bg-blue-500",
          },
          { id: "B4", capacity: 2, guest: null, status: "available" },
          { id: "B5", capacity: 6, guest: null, status: "available" },
        ],
        occupancyRate: 40,
        totalTables: 5,
      },
    },
  };

  const filters = ["All", "Main Floor", "Dining Room", "Bar"];

  // Helper functions
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRandomColor = () => {
    const colors = [
      "bg-pink-100 text-pink-600",
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-yellow-100 text-yellow-600",
      "bg-indigo-100 text-indigo-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Date navigation
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  // Filtered data based on search and filters
  const filteredUpcomingReservations = useMemo(() => {
    return dummyData.upcomingReservations.filter((reservation) => {
      const matchesSearch =
        reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.table.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === "All" || reservation.floor === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  // Get filtered floors based on selected filter
  const getFilteredFloors = () => {
    if (selectedFilter === "All") {
      return dummyData.floors;
    }
    return { [selectedFilter]: dummyData.floors[selectedFilter] };
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Get status color class
  const getStatusColor = (status) => {
    const statusColors = {
      available: "text-gray-400",
      arrived: "text-green-600",
      seated: "text-blue-600",
      ordered: "text-orange-600",
      reserved: "text-yellow-600",
    };
    return statusColors[status] || "text-gray-400";
  };

  // Get visual table layout
  const renderVisualTableLayout = () => {
    const filteredFloors = getFilteredFloors();

    return (
      <div className="space-y-8">
        {Object.entries(filteredFloors).map(([floorName, floorData]) => {
          const sectionKey = floorName.toLowerCase().replace(/\s+/g, "");
          const isExpanded = expandedSections[sectionKey];

          // Create grid based on positions
          const maxRow = Math.max(
            ...floorData.tables.map((table) => table.position?.row || 1)
          );
          const maxCol = Math.max(
            ...floorData.tables.map((table) => table.position?.col || 1)
          );

          const gridTables = Array(maxRow)
            .fill(null)
            .map(() => Array(maxCol).fill(null));

          floorData.tables.forEach((table) => {
            if (table.position) {
              gridTables[table.position.row - 1][table.position.col - 1] =
                table;
            }
          });

          return (
            <div key={floorName} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <button
                  className="text-gray-400 hover:text-gray-600 transition"
                  onClick={() => toggleSection(sectionKey)}
                >
                  <FiChevronRight
                    size={16}
                    className={`transform transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <h3 className="font-medium">{floorName}</h3>
                <span className="text-sm text-gray-500">
                  {floorData.occupancyRate}% ({floorData.totalTables})
                </span>
              </div>

              {isExpanded && (
                <div
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${maxCol}, minmax(0, 1fr))`,
                  }}
                >
                  {gridTables.flat().map((table, index) => {
                    if (!table) {
                      return <div key={index} className="min-h-[80px]"></div>;
                    }

                    const getTableColor = (status) => {
                      switch (status) {
                        case "arrived":
                        case "seated":
                          return "bg-blue-500";
                        case "running":
                          return "bg-green-500";
                        case "ordered":
                          return "bg-orange-500";
                        case "reserved":
                          return "bg-yellow-500";
                        default:
                          return "bg-gray-200";
                      }
                    };

                    const getTableTextColor = (status) => {
                      return status === "available"
                        ? "text-gray-600"
                        : "text-white";
                    };

                    return (
                      <div
                        key={table.id}
                        className={`
                          relative rounded-lg p-3 text-center cursor-pointer transition-all hover:shadow-lg
                          min-h-[80px] flex flex-col justify-center items-center
                          ${getTableColor(table.status)} ${getTableTextColor(
                          table.status
                        )}
                        `}
                      >
                        <div className="font-bold text-sm mb-1">{table.id}</div>
                        <div className="text-xs opacity-90">
                          {table.capacity}
                        </div>

                        {table.guest && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-current">
                            <span className="text-xs font-medium text-gray-800">
                              {table.avatar}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Status Legend */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Main Floor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Dining Room</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Bar</span>
          </div>
          <div className="border-l pl-6 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs">
                Booked <span className="font-medium">5</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span className="text-xs">
                Available <span className="font-medium">16</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs">
                Running <span className="font-medium">5</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar tabname="reservation" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar activeTab="reservations" />
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Upcoming Reservations */}
          <aside className="w-80 border-r bg-white flex flex-col border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Upcoming</h2>
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {filteredUpcomingReservations.length}
                  </span>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" size={16} />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search reservations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Current Time Display */}
              <div className="text-right mb-6">
                <div className="text-sm text-gray-500">{getCurrentTime()}</div>
              </div>

              {/* Upcoming Reservations List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredUpcomingReservations.length > 0 ? (
                  filteredUpcomingReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${reservation.color}`}
                      >
                        <span className="font-medium text-sm">
                          {reservation.avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {reservation.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {reservation.floor}
                        </div>
                        <div className="text-xs text-gray-400">
                          {reservation.guests} guests
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          Table {reservation.table}
                        </div>
                        <div className="text-xs text-gray-400">
                          {reservation.time}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p className="text-sm">No reservations found</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Reservation Content */}
          <section className="flex-1 p-6 overflow-y-auto">
            {/* Date and Time Selection */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {selectedDate.toDateString() === new Date().toDateString()
                    ? "Today"
                    : "Selected"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition"
                    onClick={() => navigateDate("prev")}
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <span className="font-medium min-w-[140px] text-center">
                    {formatDate(selectedDate)}
                  </span>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition"
                    onClick={() => navigateDate("next")}
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {dummyData.timeSlots.map((slot) => (
                <button
                  key={`${slot.time}-${slot.period}`}
                  onClick={() => setSelectedTimeSlot(slot.time)}
                  className={`flex flex-col items-center px-4 py-3 rounded-lg min-w-[80px] transition ${
                    selectedTimeSlot === slot.time
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium text-sm">
                    {slot.time} {slot.period}
                  </span>
                  <span className="text-xs mt-1 opacity-75">
                    {slot.reservations}/{slot.capacity}
                  </span>
                </button>
              ))}
            </div>

            {/* Floor Sections */}
            {Object.entries(getFilteredFloors()).map(
              ([floorName, floorData]) => {
                const sectionKey = floorName.toLowerCase().replace(/\s+/g, "");
                const isExpanded = expandedSections[sectionKey];

                return (
                  <div key={floorName} className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        className="text-gray-400 hover:text-gray-600 transition"
                        onClick={() => toggleSection(sectionKey)}
                      >
                        <FiChevronRight
                          size={16}
                          className={`transform transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      <h3 className="font-medium">{floorName}</h3>
                      <span className="text-sm text-gray-500">
                        {floorData.occupancyRate}% ({floorData.totalTables})
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {floorData.tables.map((table) => (
                          <div
                            key={table.id}
                            className={`border rounded-lg p-4 transition-all hover:shadow-md cursor-pointer ${
                              table.guest
                                ? "bg-white border-gray-200"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span
                                className={`font-medium ${
                                  table.guest
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {table.id}
                              </span>
                              <span
                                className={`text-xs ${
                                  table.guest
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {table.capacity}
                              </span>
                            </div>

                            {table.guest ? (
                              <>
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getRandomColor()}`}
                                  >
                                    <span className="text-xs font-medium">
                                      {table.avatar}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium truncate">
                                      {table.guest}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      👥 {table.guests}{" "}
                                      {typeof table.guests === "string"
                                        ? ""
                                        : "guests"}
                                    </div>
                                  </div>
                                  {table.statusColor && (
                                    <div
                                      className={`w-3 h-3 rounded-full ${table.statusColor}`}
                                    ></div>
                                  )}
                                </div>
                                <div
                                  className={`text-xs font-medium capitalize ${getStatusColor(
                                    table.status
                                  )}`}
                                >
                                  {table.status}
                                </div>
                              </>
                            ) : (
                              <div className="h-12 flex items-center justify-center">
                                <span className="text-xs text-gray-400 capitalize">
                                  {table.status}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
