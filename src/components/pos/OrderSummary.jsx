import {
  FiUserPlus,
  FiGrid,
  FiTag,
  FiEdit,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";
import { useState } from "react";
import API_BASE_URL from "@/apiconfig/API_BASE_URL";

const OrderSummary = ({
  orderItems,
  orderType,
  handleOrderTypeChange,
  removeItemFromOrder,
  updateQuantity,
  subtotal,
  tax,
  total,
  setIsOpen,
  setShowModal,
  setShowPickupModal,
  setShowDeliveryModal,
  router,
  selectedCustomer,
  selectedTable,
  pickupDetails,
  deliveryDetails,
  discount,
  setDiscount,
  orderNote,
  setOrderNote,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSaveOrder = async () => {
    if (orderItems.length === 0) return;

    try {
      setIsSaving(true);
      setSaveError("");

      // Get user ID from localStorage
      const userId = localStorage.getItem("userid");

      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      // Prepare order data based on order type
      const orderData = {
        customer_name: selectedCustomer
          ? selectedCustomer.full_name
          : "Walk-in Customer",
        phone_number: selectedCustomer ? selectedCustomer.phone : "",
        customer_id: selectedCustomer ? selectedCustomer.id : null,

        dining: orderType === "Dine in",
        pickup: orderType === "Pickup",
        delivery: orderType === "Delivery",
        table_number:
          orderType === "Dine in" && selectedTable ? selectedTable : null,
        pickup_date:
          orderType === "Pickup" && pickupDetails ? pickupDetails.date : null,
        pickup_time:
          orderType === "Pickup" && pickupDetails ? pickupDetails.time : null,
        delivery_channel:
          orderType === "Delivery" && deliveryDetails
            ? deliveryDetails.channel
            : null,
        delivery_date:
          orderType === "Delivery" && deliveryDetails
            ? deliveryDetails.date
            : null,
        delivery_time:
          orderType === "Delivery" && deliveryDetails
            ? deliveryDetails.time
            : null,
        delivery_address:
          orderType === "Delivery" && deliveryDetails
            ? deliveryDetails.address
            : null,
        delivery_instruction:
          orderType === "Delivery" && deliveryDetails
            ? deliveryDetails.instruction
            : null,
        discount: discount || 0,
        order_note: orderNote || "",
        selected_items: orderItems.map((item) => ({
          id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: subtotal,
        tax: tax,
        total_amount: total,
      };

      const response = await fetch(`${API_BASE_URL}/addorder/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save order");
      }

      // Success - show confirmation and reset order
      alert("Order saved successfully!");
      // You might want to clear the order items here or navigate to orders list
    } catch (err) {
      setSaveError(err.message);
      console.error("Error saving order:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOrderTypeSelection = (type) => {
    if (type === "Pickup") {
      setShowPickupModal(true);
    } else if (type === "Delivery") {
      setShowDeliveryModal(true);
    } else {
      handleOrderTypeChange(type);
    }
  };

  return (
    <aside className="w-1/3 border-l bg-white flex flex-col shadow-lg border-gray-200">
      <div className="p-6 overflow-y-auto flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Order #X086378</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            2 Guests
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleOrderTypeChange("Dine in")}
            className={`px-3 py-1.5 text-sm rounded-lg transition border ${
              orderType === "Dine in"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 hover:border-black"
            }`}
          >
            Dine in
          </button>
          <button
            onClick={() => handleOrderTypeSelection("Pickup")}
            className={`px-3 py-1.5 text-sm rounded-lg transition border ${
              orderType === "Pickup"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 hover:border-black"
            }`}
          >
            Pickup
          </button>
          <button
            onClick={() => handleOrderTypeSelection("Delivery")}
            className={`px-3 py-1.5 text-sm rounded-lg transition border ${
              orderType === "Delivery"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 hover:border-black"
            }`}
          >
            Delivery
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition"
          >
            <FiUserPlus size={16} />{" "}
            {selectedCustomer ? selectedCustomer.full_name : "Add Customer"}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg transition">
            <FiGrid size={16} />{" "}
            {selectedTable ? `Table ${selectedTable}` : "Select Table"}
          </button>
        </div>

        {/* Order Items */}
        {orderItems.length > 0 ? (
          <div className="space-y-3 mb-6">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeItemFromOrder(item.id)}
                    className="text-gray-400 hover:text-black transition p-1"
                  >
                    <FiTrash2 size={16} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition border border-gray-300"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition border border-gray-300"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500 mb-6 border border-dashed border-gray-400">
            <FiShoppingCart size={24} className="mx-auto mb-2 opacity-70" />
            <p className="font-medium">No items selected</p>
            <p className="text-sm">
              Select items from the menu to add to order
            </p>
          </div>
        )}

        {/* Order Actions */}
        <div className="space-y-2">
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-4 py-3 rounded-lg transition"
          >
            <FiTag size={16} />{" "}
            {discount > 0
              ? `Discount: $${discount.toFixed(2)}`
              : "Add Discount"}
          </button>
          <button className="w-full flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 hover:border-black px-4 py-3 rounded-lg transition">
            <FiEdit size={16} />{" "}
            {orderNote ? "Edit Order Note" : "Add Order Note"}
          </button>
        </div>
      </div>

      {/* Order Summary Footer */}
      <div className="p-6 border-t border-gray-200 bg-white">
        {saveError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {saveError}
          </div>
        )}

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Tax 12%</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSaveOrder}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-medium transition disabled:opacity-50 border border-gray-300 flex items-center justify-center"
            disabled={orderItems.length === 0 || isSaving}
          >
            {isSaving ? "Saving..." : "Save Order"}
          </button>
          <button
            className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium shadow transition disabled:opacity-50"
            disabled={orderItems.length === 0}
            onClick={() => {
              // Pass order data to payment page via localStorage or URL params
              const orderData = {
                items: orderItems,
                subtotal: subtotal,
                tax: tax,
                total: total,
                orderType: orderType,
                selectedCustomer: selectedCustomer,
                discount: discount,
                orderNote: orderNote,
              };
              localStorage.setItem("currentOrder", JSON.stringify(orderData));
              router.push("/payment");
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
