"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import {
  FiCalendar,
  FiUsers,
  FiActivity,
  FiSettings,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiClock,
  FiUser,
  FiSearch,
  FiFilter,
  FiDownload,
  FiUpload,
  FiBell,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
// Generate dynamic dates for current week
const generateWeekDates = (startDate = new Date()) => {
  const dates = [];
  const currentDate = new Date(startDate);

  // Get Monday of current week
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < 6; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    dates.push({
      date: `${dayNames[i]} ${date.getDate()}/${date.getMonth() + 1}`,
      fullDate: `${
        monthNames[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`,
      dateObj: new Date(date),
    });
  }

  return dates;
};

const allEmployees = [
  {
    id: 1,
    name: "Hilary Acres",
    role: "Manager",
    avatar: "👩‍💼",
    email: "hilary@restaurant.com",
    phone: "555-0101",
    hourlyRate: 25,
  },
  {
    id: 2,
    name: "Mary Lee",
    role: "Manager",
    avatar: "👩‍💼",
    email: "mary@restaurant.com",
    phone: "555-0102",
    hourlyRate: 24,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Manager",
    avatar: "👩‍💼",
    email: "sarah@restaurant.com",
    phone: "555-0103",
    hourlyRate: 26,
  },
  {
    id: 4,
    name: "Mike Chen",
    role: "Manager",
    avatar: "👨‍💼",
    email: "mike@restaurant.com",
    phone: "555-0104",
    hourlyRate: 25,
  },
  {
    id: 5,
    name: "Janet Salazar",
    role: "Waiter",
    avatar: "👩‍🍳",
    email: "janet@restaurant.com",
    phone: "555-0105",
    hourlyRate: 15,
  },
  {
    id: 6,
    name: "Travis Taylor",
    role: "Waiter",
    avatar: "👨‍🍳",
    email: "travis@restaurant.com",
    phone: "555-0106",
    hourlyRate: 16,
  },
  {
    id: 7,
    name: "Irma Gordon",
    role: "Waiter",
    avatar: "👩‍🍳",
    email: "irma@restaurant.com",
    phone: "555-0107",
    hourlyRate: 15,
  },
  {
    id: 8,
    name: "Anita Tapis",
    role: "Waiter",
    avatar: "👩‍🍳",
    email: "anita@restaurant.com",
    phone: "555-0108",
    hourlyRate: 14,
  },
  {
    id: 9,
    name: "Lisa Park",
    role: "Waiter",
    avatar: "👩‍🍳",
    email: "lisa@restaurant.com",
    phone: "555-0109",
    hourlyRate: 16,
  },
  {
    id: 10,
    name: "David Kim",
    role: "Waiter",
    avatar: "👨‍🍳",
    email: "david@restaurant.com",
    phone: "555-0110",
    hourlyRate: 15,
  },
  {
    id: 11,
    name: "Emma Wilson",
    role: "Waiter",
    avatar: "👩‍🍳",
    email: "emma@restaurant.com",
    phone: "555-0111",
    hourlyRate: 15,
  },
  {
    id: 12,
    name: "James Brown",
    role: "Waiter",
    avatar: "👨‍🍳",
    email: "james@restaurant.com",
    phone: "555-0112",
    hourlyRate: 16,
  },
  {
    id: 13,
    name: "Andre Gross",
    role: "Cook",
    avatar: "👨‍🍳",
    email: "andre@restaurant.com",
    phone: "555-0113",
    hourlyRate: 18,
  },
  {
    id: 14,
    name: "Abby Wing",
    role: "Cook",
    avatar: "👩‍🍳",
    email: "abby@restaurant.com",
    phone: "555-0114",
    hourlyRate: 17,
  },
  {
    id: 15,
    name: "Rebecca Gill",
    role: "Cook",
    avatar: "👩‍🍳",
    email: "rebecca@restaurant.com",
    phone: "555-0115",
    hourlyRate: 18,
  },
  {
    id: 16,
    name: "Earl Burke",
    role: "Cook",
    avatar: "👨‍🍳",
    email: "earl@restaurant.com",
    phone: "555-0116",
    hourlyRate: 17,
  },
  {
    id: 17,
    name: "Carlos Rodriguez",
    role: "Cook",
    avatar: "👨‍🍳",
    email: "carlos@restaurant.com",
    phone: "555-0117",
    hourlyRate: 19,
  },
  {
    id: 18,
    name: "Maria Garcia",
    role: "Cook",
    avatar: "👩‍🍳",
    email: "maria@restaurant.com",
    phone: "555-0118",
    hourlyRate: 18,
  },
  {
    id: 19,
    name: "Tom Anderson",
    role: "Cook",
    avatar: "👨‍🍳",
    email: "tom@restaurant.com",
    phone: "555-0119",
    hourlyRate: 17,
  },
  {
    id: 20,
    name: "Anna Lee",
    role: "Cook",
    avatar: "👩‍🍳",
    email: "anna@restaurant.com",
    phone: "555-0120",
    hourlyRate: 18,
  },
];

// Generate initial schedule data
const generateInitialSchedule = () => {
  const shifts = {
    morning: { shiftManagers: [], waiters: [], cooks: [] },
    evening: { shiftManagers: [], waiters: [], cooks: [] },
  };

  // Add some initial assignments
  const morningManagers = allEmployees
    .filter((e) => e.role === "Manager")
    .slice(0, 2);
  const eveningManagers = allEmployees
    .filter((e) => e.role === "Manager")
    .slice(2, 4);
  const waiters = allEmployees.filter((e) => e.role === "Waiter");
  const cooks = allEmployees.filter((e) => e.role === "Cook");

  // Generate assignments for 6 days
  for (let day = 0; day < 6; day++) {
    // Morning shift
    shifts.morning.shiftManagers.push({
      ...morningManagers[day % morningManagers.length],
      time: day < 2 ? "9am-2pm" : "9am-4pm",
      status: Math.random() > 0.1 ? "confirmed" : "pending",
      dayIndex: day,
    });

    shifts.morning.waiters.push({
      ...waiters[day % waiters.length],
      time: "9am-2pm",
      status: Math.random() > 0.15 ? "confirmed" : "pending",
      dayIndex: day,
    });

    shifts.morning.cooks.push({
      ...cooks[day % cooks.length],
      time: "9am-2pm",
      status: Math.random() > 0.1 ? "confirmed" : "pending",
      dayIndex: day,
    });

    // Evening shift
    shifts.evening.shiftManagers.push({
      ...eveningManagers[day % eveningManagers.length],
      time: "2pm-9pm",
      status: Math.random() > 0.1 ? "confirmed" : "pending",
      dayIndex: day,
    });

    shifts.evening.waiters.push({
      ...waiters[(day + 3) % waiters.length],
      time: "2pm-9pm",
      status: Math.random() > 0.15 ? "confirmed" : "pending",
      dayIndex: day,
    });

    shifts.evening.cooks.push({
      ...cooks[(day + 3) % cooks.length],
      time: "2pm-9pm",
      status: Math.random() > 0.1 ? "confirmed" : "pending",
      dayIndex: day,
    });
  }

  return shifts;
};

export default function EnhancedJobScheduler() {
  const [currentView, setCurrentView] = useState("jobs");
  const [selectedShift, setSelectedShift] = useState("morning");
  const [showAddModal, setShowAddModal] = useState(false);
  const [FiEditingEmployee, setFiEditingEmployee] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [weekDates, setWeekDates] = useState(generateWeekDates());
  const [scheduleData, setScheduleData] = useState({
    shifts: generateInitialSchedule(),
  });
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [FiSearchTerm, setFiSearchTerm] = useState("");
  const [filterRole, setfilterRole] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activities, setActivities] = useState([]);
  const router = useRouter();
  // Generate activities on component mount
  useEffect(() => {
    const generateActivities = () => {
      const actions = [
        "was assigned to",
        "requested time off for",
        "was added to the system",
        "covered extra shift on",
        "updated availability for",
        "FiClocked in for",
        "completed shift on",
      ];

      const newActivities = [];
      for (let i = 0; i < 10; i++) {
        const employee =
          allEmployees[Math.floor(Math.random() * allEmployees.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const timeAgo = Math.floor(Math.random() * 72) + 1; // 1-72 hours ago

        newActivities.push({
          id: i,
          time:
            timeAgo < 24
              ? `${timeAgo} hours ago`
              : `${Math.floor(timeAgo / 24)} days ago`,
          action: `${employee.name} ${action} ${
            weekDates[Math.floor(Math.random() * 6)].date
          }`,
          type: ["assignment", "request", "new", "coverage", "update"][
            Math.floor(Math.random() * 5)
          ],
          employee: employee.name,
          avatar: employee.avatar,
        });
      }
      setActivities(newActivities);
    };

    generateActivities();
  }, [weekDates]);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + direction * 7);
    setCurrentWeekStart(newDate);
    setWeekDates(generateWeekDates(newDate));
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setShowViewDropdown(false);
  };

  const handleAddEmployee = (dayIndex, role) => {
    setShowAddModal({ dayIndex, role });
  };

  const handleFiEditEmployee = (employee, dayIndex, role) => {
    setFiEditingEmployee({
      ...employee,
      dayIndex,
      role,
      originalIndex: dayIndex,
    });
  };

  const handleDeleteEmployee = (employeeId, dayIndex, roleKey) => {
    const updatedData = { ...scheduleData };

    if (
      !updatedData.shifts[selectedShift] ||
      !updatedData.shifts[selectedShift][roleKey]
    ) {
      console.error("Invalid roleKey:", roleKey, "for shift:", selectedShift);
      return;
    }

    updatedData.shifts[selectedShift][roleKey] = updatedData.shifts[
      selectedShift
    ][roleKey].filter(
      (emp) => !(emp.id === employeeId && emp.dayIndex === dayIndex)
    );

    setScheduleData(updatedData);

    const employee = allEmployees.find((e) => e.id === employeeId);
    if (employee) {
      addFiActivity(
        `${employee.name} was removed from ${weekDates[dayIndex].date} ${selectedShift} shift`,
        "delete"
      );
    }
  };

  const handleSaveEmployee = (employeeData) => {
    if (!showAddModal) return;

    const { dayIndex, role } = showAddModal;
    const roleKey = role === "manager" ? "shiftManagers" : `${role}s`;
    const selectedEmployee = allEmployees.find(
      (e) => e.name === employeeData.name
    );

    const newEmployee = {
      ...selectedEmployee,
      time: employeeData.time,
      status: "confirmed",
      dayIndex: dayIndex,
    };

    const updatedData = { ...scheduleData };
    updatedData.shifts[selectedShift][roleKey].push(newEmployee);
    setScheduleData(updatedData);
    setShowAddModal(false);

    addFiActivity(
      `${employeeData.name} was assigned to ${weekDates[dayIndex].date} ${selectedShift} shift`,
      "assignment"
    );
  };
  const handleUpdateEmployee = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const { dayIndex, role } = FiEditingEmployee;

    // 🔑 Use selectedShift instead of treating dayIndex like an object key
    if (!shifts[selectedShift] || !shifts[selectedShift][role]) {
      console.error("Invalid shift or role", selectedShift, role);
      return;
    }

    const empIndex = shifts[selectedShift][role].findIndex(
      (emp) => emp.id === FiEditingEmployee.id
    );

    if (empIndex === -1) {
      console.error("Employee not found in schedule");
      return;
    }

    // ✅ Update employee safely
    const updatedSchedule = { ...scheduleData };
    updatedSchedule.shifts[selectedShift][role][empIndex] = {
      ...FiEditingEmployee,
    };

    setScheduleData(updatedSchedule);
    setFiEditingEmployee(null);
  };

  const addFiActivity = (action, type) => {
    const newFiActivity = {
      id: Date.now(),
      time: "Just now",
      action: action,
      type: type,
      employee: action.split(" ")[0],
    };
    setActivities((prev) => [newFiActivity, ...prev.slice(0, 9)]);
  };

  const exportSchedule = () => {
    const data = JSON.stringify(scheduleData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.FiDownload = `schedule-${weekDates[0].date.replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addFiActivity("Schedule exported successfully", "export");
  };

  const importSchedule = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            setScheduleData(data);
            addFiActivity("Schedule imported successfully", "import");
          } catch (error) {
            alert("Invalid file format");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const renderEmployeeCard = (employee, dayIndex, role) => {
    const roleColors = {
      shiftManagers: "bg-blue-600",
      waiters: "bg-teal-500",
      cooks: "bg-purple-500",
    };

    const statusIndicator = employee.status === "pending" ? "⚠️" : "✅";

    return (
      <div
        key={`${employee.id}-${dayIndex}-${Date.now()}`}
        className={`${roleColors[role]} text-white p-3 rounded-lg text-center relative group transition-all duration-200 hover:shadow-lg hover:scale-105`}
      >
        <div className="absolute top-1 right-1 text-xs">{statusIndicator}</div>
        <div className="text-lg mb-1">{employee.avatar}</div>
        <div className="text-sm font-medium">{employee.name}</div>
        <div className="text-xs opacity-90">{employee.time}</div>

        <div className="absolute inset-0 bg-black/50 backdrop-blur bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-2">
          <button
            onClick={() => handleFiEditEmployee(employee, dayIndex, role)}
            className="p-2  bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
            title="FiEdit Employee"
          >
            <FiEdit size={14} />
          </button>
          <button
            onClick={() => handleDeleteEmployee(employee.id, dayIndex, role)}
            className="p-2 bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
            title="Remove Employee"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    );
  };

  const renderAddButton = (dayIndex, role) => {
    return (
      <div
        onClick={() => handleAddEmployee(dayIndex, role)}
        className="border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 p-3 rounded-lg text-center cursor-pointer transition-all duration-200 hover:shadow-md"
        title="Add Staff Member"
      >
        <FiPlus
          size={24}
          className="mx-auto mb-1 text-gray-400 hover:text-blue-500 transition-colors"
        />
        <div className="text-sm text-gray-600">Add Staff</div>
      </div>
    );
  };

  const filteredEmployees = allEmployees.filter((employee) => {
    const matchesFiSearch = employee.name
      .toLowerCase()
      .includes(FiSearchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" ||
      employee.role.toLowerCase() === filterRole.toLowerCase();
    return matchesFiSearch && matchesRole;
  });

  const renderJobView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedShift("morning")}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedShift === "morning"
              ? "bg-blue-600 text-white shadow-lg transform scale-105"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
          }`}
        >
          🌅 Morning Shift (9am-2pm)
        </button>
        <button
          onClick={() => setSelectedShift("evening")}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedShift === "evening"
              ? "bg-blue-600 text-white shadow-lg transform scale-105"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
          }`}
        >
          🌆 Evening Shift (2pm-9pm)
        </button>
      </div>

      <div className="space-y-6">
        {/* Shift Managers */}
        <div className="flex gap-4">
          <div className="w-32 flex-shrink-0">
            <h3 className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-wide">
              Shift Managers
            </h3>
            <div className="text-xs text-gray-500">Required: 1-2</div>
          </div>
          <div className="flex-1 grid grid-cols-6 gap-3">
            {scheduleData.shifts[selectedShift].shiftManagers
              .filter((manager) => manager.dayIndex < 6)
              .map((manager, idx) =>
                renderEmployeeCard(manager, manager.dayIndex, "shiftManagers")
              )}
            {Array.from(
              {
                length: Math.max(
                  0,
                  6 - scheduleData.shifts[selectedShift].shiftManagers.length
                ),
              },
              (_, i) =>
                renderAddButton(
                  scheduleData.shifts[selectedShift].shiftManagers.length + i,
                  "manager"
                )
            )}
          </div>
        </div>

        {/* Waiters */}
        <div className="flex gap-4">
          <div className="w-32 flex-shrink-0">
            <h3 className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-wide">
              Waiters
            </h3>
            <div className="text-xs text-gray-500">Required: 3-5</div>
          </div>
          <div className="flex-1 grid grid-cols-6 gap-3">
            {scheduleData.shifts[selectedShift].waiters
              .filter((waiter) => waiter.dayIndex < 6)
              .map((waiter, idx) =>
                renderEmployeeCard(waiter, waiter.dayIndex, "waiters")
              )}
            {Array.from(
              {
                length: Math.max(
                  0,
                  6 - scheduleData.shifts[selectedShift].waiters.length
                ),
              },
              (_, i) =>
                renderAddButton(
                  scheduleData.shifts[selectedShift].waiters.length + i,
                  "waiter"
                )
            )}
          </div>
        </div>

        {/* Cooks */}
        <div className="flex gap-4">
          <div className="w-32 flex-shrink-0">
            <h3 className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-wide">
              Cooks
            </h3>
            <div className="text-xs text-gray-500">Required: 2-3</div>
          </div>
          <div className="flex-1 grid grid-cols-6 gap-3">
            {scheduleData.shifts[selectedShift].cooks
              .filter((cook) => cook.dayIndex < 6)
              .map((cook, idx) =>
                renderEmployeeCard(cook, cook.dayIndex, "cooks")
              )}
            {Array.from(
              {
                length: Math.max(
                  0,
                  6 - scheduleData.shifts[selectedShift].cooks.length
                ),
              },
              (_, i) =>
                renderAddButton(
                  scheduleData.shifts[selectedShift].cooks.length + i,
                  "cook"
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {/* FiSearch and filter Controls */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="FiSearch employees..."
            value={FiSearchTerm}
            onChange={(e) => setFiSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setfilterRole(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="manager">Managers</option>
          <option value="waiter">Waiters</option>
          <option value="cook">Cooks</option>
        </select>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <FiFilter className="h-4 w-4" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate/hr
                </th>
                {weekDates.map((dateInfo, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {dateInfo.date}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => {
                const morningShifts = scheduleData.shifts.morning;
                const eveningShifts = scheduleData.shifts.evening;
                let totalHours = 0;

                return (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{employee.avatar}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          employee.role === "Manager"
                            ? "bg-blue-100 text-blue-800"
                            : employee.role === "Waiter"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${employee.hourlyRate}
                    </td>
                    {weekDates.map((_, dayIndex) => {
                      const morningAssignment = [
                        ...morningShifts.shiftManagers,
                        ...morningShifts.waiters,
                        ...morningShifts.cooks,
                      ].find(
                        (emp) =>
                          emp.id === employee.id && emp.dayIndex === dayIndex
                      );
                      const eveningAssignment = [
                        ...eveningShifts.shiftManagers,
                        ...eveningShifts.waiters,
                        ...eveningShifts.cooks,
                      ].find(
                        (emp) =>
                          emp.id === employee.id && emp.dayIndex === dayIndex
                      );

                      const shifts = [];
                      if (morningAssignment) {
                        shifts.push({
                          time: morningAssignment.time,
                          status: morningAssignment.status,
                          shift: "M",
                        });
                        totalHours += 5; // Approximate hours
                      }
                      if (eveningAssignment) {
                        shifts.push({
                          time: eveningAssignment.time,
                          status: eveningAssignment.status,
                          shift: "E",
                        });
                        totalHours += 7; // Approximate hours
                      }

                      return (
                        <td
                          key={dayIndex}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {shifts.length > 0 ? (
                            <div className="space-y-1">
                              {shifts.map((shift, idx) => (
                                <span
                                  key={idx}
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    shift.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {shift.shift} {shift.time}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">Off</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {totalHours}h
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFiActivityView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent FiActivity
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActivities([])}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Clear All
          </button>
          <button className="px-3 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FiActivity className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No recent FiActivity</p>
          </div>
        ) : (
          activities.map((FiActivity, index) => (
            <div
              key={FiActivity.id}
              className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {FiActivity.type === "assignment" && (
                  <FiUser className="h-4 w-4 text-blue-500" />
                )}
                {FiActivity.type === "request" && (
                  <FiClock className="h-4 w-4 text-orange-500" />
                )}
                {FiActivity.type === "new" && (
                  <FiPlus className="h-4 w-4 text-green-500" />
                )}
                {FiActivity.type === "update" && (
                  <FiEdit className="h-4 w-4 text-purple-500" />
                )}
                {FiActivity.type === "delete" && (
                  <FiTrash2 className="h-4 w-4 text-red-500" />
                )}
                {FiActivity.type === "export" && (
                  <FiDownload className="h-4 w-4 text-indigo-500" />
                )}
                {FiActivity.type === "import" && (
                  <FiUpload className="h-4 w-4 text-teal-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{FiActivity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{FiActivity.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      <Sidebar tabname="events" />
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar />
        <div className=" overflow-y-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded">
                  <FiCalendar className="h-5 w-5 text-blue-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-800">
                  Job Schedule
                </h1>
              </div>
              <div className="flex gap-2 items-center">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative transition-colors"
                  >
                    <FiBell className="h-5 w-5" />
                    {activities.filter((a) => a.time === "Just now").length >
                      0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {activities.filter((a) => a.time === "Just now").length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                      <div className="p-3 border-b">
                        <h3 className="font-medium text-gray-900">
                          Notifications
                        </h3>
                      </div>
                      {activities.slice(0, 5).map((FiActivity) => (
                        <div
                          key={FiActivity.id}
                          className="p-3 hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <p className="text-sm text-gray-800">
                            {FiActivity.action}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {FiActivity.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* View Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowViewDropdown(!showViewDropdown)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                      showViewDropdown
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    View by {currentView}
                    <FiChevronDown className="h-4 w-4" />
                  </button>
                  {showViewDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-40">
                      <button
                        onClick={() => handleViewChange("jobs")}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                          currentView === "jobs"
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        <FiUsers className="h-4 w-4" />
                        Jobs View
                      </button>
                      <button
                        onClick={() => handleViewChange("list")}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                          currentView === "list"
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        📋 List View
                      </button>
                      <button
                        onClick={() => handleViewChange("FiActivity")}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                          currentView === "FiActivity"
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        <FiActivity className="h-4 w-4" />
                        FiActivity View
                      </button>
                    </div>
                  )}
                </div>

                {/* Options Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                      showOptionsDropdown
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FiSettings className="h-4 w-4" />
                    Options
                    <FiChevronDown className="h-4 w-4" />
                  </button>
                  {showOptionsDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-40">
                      <button
                        onClick={() => {
                          exportSchedule();
                          setShowOptionsDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                      >
                        <FiDownload className="h-4 w-4" />
                        Export Schedule
                      </button>
                      <button
                        onClick={() => {
                          importSchedule();
                          setShowOptionsDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                      >
                        <FiUpload className="h-4 w-4" />
                        Import Schedule
                      </button>
                      <div className="border-t my-1"></div>
                      <button
                        onClick={() => {
                          setScheduleData({
                            shifts: generateInitialSchedule(),
                          });
                          addFiActivity("Schedule reset to default", "update");
                          setShowOptionsDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                      >
                        🔄 Reset Schedule
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to clear all schedules?"
                            )
                          ) {
                            setScheduleData({
                              shifts: {
                                morning: {
                                  shiftManagers: [],
                                  waiters: [],
                                  cooks: [],
                                },
                                evening: {
                                  shiftManagers: [],
                                  waiters: [],
                                  cooks: [],
                                },
                              },
                            });
                            addFiActivity("All schedules cleared", "delete");
                            setShowOptionsDropdown(false);
                          }
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                      >
                        <FiTrash2 className="h-4 w-4" />
                        Clear All Schedules
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateWeek(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Previous Week"
                >
                  <FiChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <span className="text-gray-600 font-medium">
                  Week of {weekDates[0].fullDate}
                </span>
                <button
                  onClick={() => navigateWeek(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Next Week"
                >
                  <FiChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="flex gap-4 text-sm font-medium text-gray-700">
                {weekDates.map((dateInfo, idx) => (
                  <div key={idx} className="text-center">
                    <div className="px-3 py-2 hover:bg-blue-50 rounded cursor-pointer transition-colors">
                      <div className="text-xs text-gray-500 mb-1">
                        {dateInfo.date.split(" ")[0]}
                      </div>
                      <div className="font-medium">
                        {dateInfo.date.split(" ")[1]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Content Based on View */}
            {currentView === "jobs" && renderJobView()}
            {currentView === "list" && renderListView()}
            {currentView === "FiActivity" && renderFiActivityView()}
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => router.push("/shift-details")}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer block text-left"
            >
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-medium">Shift Details</h3>
              <p className="text-sm text-gray-600">
                View individual shift info
              </p>
            </button>

            <button
              onClick={() => router.push("/time-clock")}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer block text-left"
            >
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="font-medium">Time FiClock</h3>
              <p className="text-sm text-gray-600">Track working hours</p>
            </button>

            <button
              onClick={() => router.push("/timesheets")}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer block text-left"
            >
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-medium">Timesheets</h3>
              <p className="text-sm text-gray-600">View employee hours</p>
            </button>

            <button
              onClick={() => {
                setScheduleData({ shifts: generateInitialSchedule() });
                addFiActivity("AI generated optimal schedule", "new");
                router.push("/ai-scheduler");
              }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer block text-left"
            >
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="font-medium">AI Scheduler</h3>
              <p className="text-sm text-gray-600">Auto-generate schedules</p>
            </button>
          </div>

          {/* Add Employee Modal */}
          {showAddModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={(e) =>
                e.target === e.currentTarget && setShowAddModal(false)
              }
            >
              <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Add {showAddModal.role} -{" "}
                    {weekDates[showAddModal.dayIndex]?.date}
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const selectedEmployee = allEmployees.find(
                      (emp) => emp.name === formData.get("name")
                    );
                    handleSaveEmployee({
                      name: formData.get("name"),
                      time: formData.get("time"),
                      avatar: selectedEmployee?.avatar || "👤",
                    });
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Name *
                      </label>
                      <select
                        name="name"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Employee</option>
                        {allEmployees
                          .filter((emp) => {
                            const roleMatch =
                              emp.role.toLowerCase() ===
                                showAddModal.role.toLowerCase() ||
                              (showAddModal.role === "manager" &&
                                emp.role === "Manager");
                            // FiCheck if employee is already assigned to this day/shift
                            const roleKey =
                              showAddModal.role === "manager"
                                ? "shiftManagers"
                                : `${showAddModal.role}s`;
                            const isAlreadyAssigned = scheduleData.shifts[
                              selectedShift
                            ][roleKey].some(
                              (emp2) =>
                                emp2.id === emp.id &&
                                emp2.dayIndex === showAddModal.dayIndex
                            );
                            return roleMatch && !isAlreadyAssigned;
                          })
                          .map((emp) => (
                            <option key={emp.id} value={emp.name}>
                              {emp.avatar} {emp.name} (${emp.hourlyRate}/hr)
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Slot *
                      </label>
                      <select
                        name="time"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Time</option>
                        {selectedShift === "morning" ? (
                          <>
                            <option value="9am-2pm">9am-2pm (5 hours)</option>
                            <option value="9am-1pm">9am-1pm (4 hours)</option>
                            <option value="10am-2pm">10am-2pm (4 hours)</option>
                            <option value="9am-4pm">
                              9am-4pm Extended (7 hours)
                            </option>
                          </>
                        ) : (
                          <>
                            <option value="2pm-9pm">2pm-9pm (7 hours)</option>
                            <option value="3pm-9pm">3pm-9pm (6 hours)</option>
                            <option value="2pm-8pm">2pm-8pm (6 hours)</option>
                            <option value="4pm-10pm">
                              4pm-10pm Late (6 hours)
                            </option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <FiCheck className="h-4 w-4 inline mr-2" />
                      Add Employee
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* FiEdit Employee Modal */}
          {FiEditingEmployee && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 flex items-center justify-center z-50"
              onClick={(e) =>
                e.target === e.currentTarget && setFiEditingEmployee(null)
              }
            >
              <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    FiEdit {FiEditingEmployee.name} -{" "}
                    {weekDates[FiEditingEmployee.dayIndex]?.date}
                  </h3>
                  <button
                    onClick={() => setFiEditingEmployee(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    const formData = new FormData(e.target);
                    const selectedEmployee = allEmployees.find(
                      (emp) => emp.name === formData.get("name")
                    );
                    console.log("form data", formData);
                    handleUpdateEmployee({
                      name: formData.get("name"),
                      time: formData.get("time"),
                      status: formData.get("status"),
                      avatar:
                        selectedEmployee?.avatar || FiEditingEmployee.avatar,
                    });
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Name *
                      </label>
                      <select
                        name="name"
                        defaultValue={FiEditingEmployee.name}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {allEmployees
                          // .filter((emp) => {
                          //   const roleMatch =
                          //     emp.role.toLowerCase() ===
                          //       FiEditingEmployee.role.toLowerCase() ||
                          //     (FiEditingEmployee.role === "manager" &&
                          //       emp.role === "Manager");
                          //   return roleMatch;
                          // })
                          .map((emp) => (
                            <option key={emp.id} value={emp.name}>
                              {emp.avatar} {emp.name} (${emp.hourlyRate}/hr)
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Slot *
                      </label>
                      <select
                        name="time"
                        defaultValue={FiEditingEmployee.time}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {selectedShift === "morning" ? (
                          <>
                            <option value="9am-2pm">9am-2pm (5 hours)</option>
                            <option value="9am-1pm">9am-1pm (4 hours)</option>
                            <option value="10am-2pm">10am-2pm (4 hours)</option>
                            <option value="9am-4pm">
                              9am-4pm Extended (7 hours)
                            </option>
                          </>
                        ) : (
                          <>
                            <option value="2pm-9pm">2pm-9pm (7 hours)</option>
                            <option value="3pm-9pm">3pm-9pm (6 hours)</option>
                            <option value="2pm-8pm">2pm-8pm (6 hours)</option>
                            <option value="4pm-10pm">
                              4pm-10pm Late (6 hours)
                            </option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        defaultValue={FiEditingEmployee.status}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="confirmed">✅ Confirmed</option>
                        <option value="pending">⚠️ Pending</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <FiCheck className="h-4 w-4 inline mr-2" />
                      Update Employee
                    </button>
                    <button
                      type="button"
                      onClick={() => setFiEditingEmployee(null)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Click outside handlers */}
          {(showOptionsDropdown || showViewDropdown || showNotifications) && (
            <div
              className="fixed inset-0 z-30"
              onClick={() => {
                setShowOptionsDropdown(false);
                setShowViewDropdown(false);
                setShowNotifications(false);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
