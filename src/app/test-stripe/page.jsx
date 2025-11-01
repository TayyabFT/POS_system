"use client";

import { useState } from "react";
import StripeElementsPayment from "@/components/StripeElementsPayment";

export default function TestStripePage() {
  const [amount, setAmount] = useState(25.99);
  const [showPayment, setShowPayment] = useState(false);

  const handleSuccess = (paymentIntent) => {
    console.log("Payment successful:", paymentIntent);
    alert("Payment successful! Check console for details.");
    setShowPayment(false);
  };

  const handleError = (error) => {
    console.error("Payment error:", error);
    alert("Payment failed: " + error.message);
  };

  const handleCancel = () => {
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Test Stripe Integration
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Test Payment</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            Test Stripe Payment
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Test Card Numbers:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li><strong>Visa:</strong> 4242 4242 4242 4242</li>
            <li><strong>Mastercard:</strong> 5555 5555 5555 4444</li>
            <li><strong>Amex:</strong> 3782 822463 10005</li>
            <li><strong>Declined:</strong> 4000 0000 0000 0002</li>
          </ul>
          <p className="text-xs text-blue-600 mt-2">
            Use any future expiry date and any 3-digit CVV
          </p>
        </div>
      </div>

      {/* Stripe Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <StripeElementsPayment
            amount={amount}
            onSuccess={handleSuccess}
            onError={handleError}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}
