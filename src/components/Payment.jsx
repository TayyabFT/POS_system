"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import {
  FiCreditCard,
  FiDollarSign,
  FiGift,
  FiStar,
  FiSmartphone,
} from "react-icons/fi";

export default function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
  const [calculatorDisplay, setCalculatorDisplay] = useState("0.00");
  const [printReceipt, setPrintReceipt] = useState(false);

  const paymentMethods = [
    { id: "Cash", name: "Cash", icon: FiDollarSign, color: "bg-blue-500" },
    {
      id: "Credit Card",
      name: "Credit Card",
      icon: FiCreditCard,
      color: "bg-pink-500",
    },
    {
      id: "E-Wallet",
      name: "E-Wallet",
      icon: FiSmartphone,
      color: "bg-cyan-500",
    },
    { id: "Gift Card", name: "Gift Card", icon: FiGift, color: "bg-teal-500" },
    {
      id: "Loyalty Points",
      name: "Loyalty Points",
      icon: FiStar,
      color: "bg-orange-500",
    },
  ];

  const orderDetails = {
    orderNumber: "XO85378",
    guests: 2,
    type: "Dine In",
    customer: "Lory Brown",
    isVip: true,
    items: [
      {
        name: "Friends of Fox Hill Party",
        category: "Regular",
        price: 12.63,
        quantity: 1,
      },
    ],
    subtotal: 180.0,
    surcharge: 0,
    discount: 5, // 5% off
    taxRate: 12, // 12%
  };

  const calculateTotals = () => {
    const discountAmount =
      (orderDetails.subtotal * orderDetails.discount) / 100;
    const discountedSubtotal = orderDetails.subtotal - discountAmount;
    const taxAmount = (discountedSubtotal * orderDetails.taxRate) / 100;
    const total = discountedSubtotal + orderDetails.surcharge + taxAmount;

    return {
      subtotal: orderDetails.subtotal,
      surcharge: orderDetails.surcharge,
      discountAmount,
      taxAmount,
      total,
    };
  };

  const totals = calculateTotals();

  const handleNumberClick = (num) => {
    if (calculatorDisplay === "0.00") {
      setCalculatorDisplay(num === "." ? "0." : num);
    } else {
      setCalculatorDisplay((prev) => prev + num);
    }
  };

  const handleClear = () => {
    setCalculatorDisplay("0.00");
  };

  const handleQuickAmount = (amount) => {
    setCalculatorDisplay(amount.toString());
  };

  const handlePayNow = () => {
    // Payment processing logic would go here
    console.log("Processing payment:", {
      method: selectedPaymentMethod,
      amount: calculatorDisplay,
      order: orderDetails,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Payment Methods Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Method
          </h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    selectedPaymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${method.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {method.name}
                  </span>
                  {selectedPaymentMethod === method.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment Calculator */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3">
                  <FiArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Payment</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Print Receipt?</span>
              <button
                onClick={() => setPrintReceipt(!printReceipt)}
                className={`inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 ${
                  printReceipt ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white pointer-events-none block size-4 rounded-full ring-0 transition-transform ${
                    printReceipt
                      ? "translate-x-[calc(100%-2px)]"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Order Item */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <img
                src="/lively-party.png"
                alt="Event"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {orderDetails.items[0].name}
              </h3>
              <p className="text-sm text-gray-500">
                {orderDetails.items[0].category} - Regular
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${orderDetails.items[0].price}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Regular</span>
              <span className="font-medium">
                ${orderDetails.subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="flex-1 p-6">
          <div className="max-w-md mx-auto">
            {/* Display */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ${calculatorDisplay}
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => handleQuickAmount(10)}
                    className="flex-1 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all"
                  >
                    $10
                  </button>
                  <button
                    onClick={() => handleQuickAmount(20)}
                    className="flex-1 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all"
                  >
                    $20
                  </button>
                  <button
                    onClick={() => handleQuickAmount(30)}
                    className="flex-1 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all"
                  >
                    $30
                  </button>
                </div>

                {/* Number Pad */}
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleNumberClick(num.toString())}
                      className="h-12 text-lg font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={handleClear}
                    className="h-12 text-lg font-medium bg-gray-100 border shadow-xs hover:bg-gray-200 rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all"
                  >
                    C
                  </button>
                  <button
                    onClick={() => handleNumberClick("0")}
                    className="h-12 text-lg font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all"
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleNumberClick(".")}
                    className="h-12 text-lg font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all"
                  >
                    .
                  </button>
                </div>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handlePayNow}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all shadow-xs"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        {/* Order Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Order</span>
            <span className="text-sm font-medium">
              #{orderDetails.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{orderDetails.guests} Guests</span>
            <span>{orderDetails.type}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {orderDetails.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  {orderDetails.customer}
                </span>
                {orderDetails.isVip && (
                  <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-transparent bg-pink-100 text-pink-700">
                    VIP
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Discount Applied */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">%</span>
            </div>
            <span className="text-gray-600">Discount Applied</span>
            <span className="font-medium text-green-600">
              {orderDetails.discount}% off
            </span>
          </div>
        </div>

        {/* Order Totals */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sub Total</span>
            <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Surcharge</span>
            <span className="font-medium">${totals.surcharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">
              -${totals.discountAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax {orderDetails.taxRate}%</span>
            <span className="font-medium">${totals.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
            <span>Total</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
