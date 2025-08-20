"use client";
import { FiX, FiUsers, FiClock, FiMapPin, FiEdit3 } from "react-icons/fi";

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
  onMarkReady,
  onCancelTransaction,
}) {
  if (!isOpen || !order) return null;

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Order</span>
            <span className="font-semibold text-gray-900">
              #{order.orderNumber}
            </span>
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-medium">
              In preparation
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {order.customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">
                {order.customer.name}
              </div>
              <div className="text-sm text-gray-500">VIP</div>
            </div>
            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded font-medium ml-auto">
              VIP
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FiUsers className="w-4 h-4" />
              <span>{order.guestCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock className="w-4 h-4" />
              <span>{order.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiMapPin className="w-4 h-4" />
              <span>Table {order.tableNumber}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4 border-b">
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <span className="text-gray-900">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <FiEdit3 className="w-4 h-4" />
              <span>Notes</span>
            </div>
            <div className="text-sm text-gray-600">No Onion</div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="p-4 border-b space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sub Total</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex space-x-3">
          <button
            onClick={() => onCancelTransaction(order.id)}
            className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            Cancel Transaction
          </button>
          <button
            onClick={() => {
              onMarkReady(order.id);
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Mark Ready
          </button>
        </div>
      </div>
    </div>
  );
}
