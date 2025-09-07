"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
import MenuSection from "@/components/pos/MenuSection";
import OrderSummary from "@/components/pos/OrderSummary";
import CustomerModal from "@/components/pos/CustomerModal";
import DeliveryModal from "@/components/pos/DeliveryModal";
import DiscountModal from "@/components/pos/DiscountModal";
import PickupModal from "@/components/pos/PickupModal";
import OrderNoteModal from "@/components/pos/OrderNoteModal";
import TableSelectionModal from "@/components/pos/TableSelectionModal";

export default function POSOrderPage() {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState("Dine in");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("12:00 PM");
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showOrderNoteModal, setShowOrderNoteModal] = useState(false);
  const [showTableSelectionModal, setShowTableSelectionModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [pickupDetails, setPickupDetails] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [orderNote, setOrderNote] = useState("");
  
  const router = useRouter();

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const addItemToOrder = (item) => {
    setOrderItems([...orderItems, { ...item, id: Date.now(), quantity: 1 }]);
  };

  const removeItemFromOrder = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) - discount;
    const tax = subtotal * 0.12;
    return {
      subtotal: subtotal < 0 ? 0 : subtotal,
      tax: tax < 0 ? 0 : tax,
      total: (subtotal + tax) < 0 ? 0 : (subtotal + tax),
    };
  };

  const { subtotal, tax, total } = calculateTotal();

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setIsOpen(false);
  };

  const handlePickupConfirm = (details) => {
    setPickupDetails(details);
    setOrderType("Pickup");
    setShowPickupModal(false);
  };

  const handleDeliveryConfirm = (details) => {
    setDeliveryDetails(details);
    setOrderType("Delivery");
    setShowDeliveryModal(false);
  };

  const handleTableSelect = (tableNumber) => {
    setSelectedTable(tableNumber);
    setShowTableSelectionModal(false);
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      <Sidebar tabname="orders" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar activeTab="new-order" />
        <div className="flex flex-1 overflow-hidden">
          <MenuSection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            addItemToOrder={addItemToOrder}
          />
          
          <OrderSummary
            orderItems={orderItems}
            orderType={orderType}
            handleOrderTypeChange={handleOrderTypeChange}
            removeItemFromOrder={removeItemFromOrder}
            updateQuantity={updateQuantity}
            subtotal={subtotal}
            tax={tax}
            total={total}
            setIsOpen={setIsOpen}
            setShowModal={setShowDiscountModal}
            setShowPickupModal={setShowPickupModal}
            setShowDeliveryModal={setShowDeliveryModal}
            router={router}
            selectedCustomer={selectedCustomer}
            selectedTable={selectedTable}
            pickupDetails={pickupDetails}
            deliveryDetails={deliveryDetails}
            discount={discount}
            setDiscount={setDiscount}
            orderNote={orderNote}
            setOrderNote={setOrderNote}
          />
        </div>
      </main>

      <CustomerModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        onCustomerSelect={handleCustomerSelect}
      />

      <DeliveryModal 
        showDeliveryModal={showDeliveryModal}
        setShowDeliveryModal={setShowDeliveryModal}
        onConfirm={handleDeliveryConfirm}
      />

      <DiscountModal 
        showModal={showDiscountModal}
        setShowModal={setShowDiscountModal}
        discount={discount}
        setDiscount={setDiscount}
        subtotal={subtotal}
      />

      <PickupModal 
        showPickupModal={showPickupModal}
        setShowPickupModal={setShowPickupModal}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onConfirm={handlePickupConfirm}
      />

      <OrderNoteModal
        showModal={showOrderNoteModal}
        setShowModal={setShowOrderNoteModal}
        orderNote={orderNote}
        setOrderNote={setOrderNote}
      />

      <TableSelectionModal
        showModal={showTableSelectionModal}
        setShowModal={setShowTableSelectionModal}
        onTableSelect={handleTableSelect}
      />
    </div>
  );
}