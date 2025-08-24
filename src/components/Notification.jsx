import { useState } from "react";
import {
  FiBell,
  FiX,
  FiCheck,
  FiClock,
  FiPackage,
  FiCalendar,
  FiAlertCircle,
  FiSettings,
} from "react-icons/fi";

// Dummy notification data
const dummyNotifications = [
  {
    id: 1,
    type: "reservation",
    title: "New Reservation",
    message: "Reservation for 2 at 7:00 PM on August 1, 2024, has been made.",
    timestamp: "2024-08-01 09:00 AM",
    timeAgo: "Today",
    isRead: false,
    icon: FiCalendar,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    type: "order",
    title: "Ready for Delivery",
    message: "Order #12345 is ready for delivery. Please assign a driver.",
    timestamp: "2024-08-01 10:30 AM",
    timeAgo: "3 days ago",
    isRead: false,
    icon: FiPackage,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    type: "order",
    title: "New Order Received",
    message: "Order #12345 has been placed. Please prepare it.",
    timestamp: "2024-08-01 10:30 AM",
    timeAgo: "July 25, 2024",
    isRead: true,
    icon: FiPackage,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: 4,
    type: "reservation",
    title: "New Reservation",
    message: "Reservation for 2 at 7:00 PM on August 1, 2024, has been made.",
    timestamp: "2024-08-01 09:00 AM",
    timeAgo: "July 25, 2024",
    isRead: true,
    icon: FiCalendar,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 5,
    type: "inventory",
    title: "Low Inventory",
    message: 'Inventory for item "Tomatoes" is below the threshold.',
    timestamp: "2024-08-01 08:00 AM",
    timeAgo: "July 25, 2024",
    isRead: true,
    icon: FiAlertCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full border border-gray-200 p-2 hover:bg-gray-50 transition-colors"
      >
        <FiBell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Notification
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="text-sm  bg-gray-100 font-bold rounded-full p-2 flex items-center gap-1"
              >
                <FiCheck size={14} />
                Mark all as read
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FiSettings
                  size={30}
                  className="bg-gray-100 rounded-full p-1"
                />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <FiBell size={32} className="mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.isRead ? "bg-blue-50/30" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`${notification.bgColor} p-2 rounded-full flex-shrink-0`}
                        >
                          <IconComponent
                            size={16}
                            className={notification.iconColor}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-600">
                              {notification.type.charAt(0).toUpperCase() +
                                notification.type.slice(1)}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-sm font-medium text-gray-800">
                              {notification.title}
                            </span>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{notification.timestamp}</span>
                            <span>{notification.timeAgo}</span>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {/* {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button className="w-full text-center text-sm text-gray-600 hover:text-gray-800 py-2">
                View all notifications
              </button>
            </div>
          )} */}
        </div>
      )}

      {/* Overlay to close panel when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

// Usage example in your existing Navbar component:
/*
import NotificationPanel from './NotificationPanel';

// Replace this in your Navbar:
<div className="rounded-full border border-gray-200 p-2">
  <FiBell size={20} />
</div>

// With this:
<NotificationPanel />
*/
