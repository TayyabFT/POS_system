"use client";

import { useState, useEffect } from "react";
import { FiCreditCard, FiCheck, FiX, FiAlertCircle } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Stripe Elements styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = ({ amount, onSuccess, onError, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment intent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency: "usd",
          metadata: {
            order_type: "pos_payment",
            timestamp: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message);
        onError?.(error);
      } else if (paymentIntent.status === "succeeded") {
        setIsSuccess(true);
        
        // Save payment data to database
        try {
          await fetch("/api/payments/save-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              amount: amount,
              currency: "usd",
              paymentMethod: paymentIntent.payment_method.type,
              orderItems: [],
              metadata: {
                order_type: "pos_payment",
                timestamp: new Date().toISOString(),
              },
            }),
          });
        } catch (saveError) {
          console.error("Error saving payment:", saveError);
          // Don't fail the payment if saving fails
        }
        
        setTimeout(() => {
          onSuccess?.(paymentIntent);
        }, 1500);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      onError?.(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <FiAlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Card Element */}
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information *
        </label>
        <CardElement options={cardElementOptions} />
      </div>

      {/* Security Notice */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2">
          <FiCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800">
            Your payment information is encrypted and secure. We don't store your card details.
          </p>
        </div>
      </div>

      {/* Process Payment Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || isSuccess}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
          isSuccess
            ? "bg-green-600 text-white"
            : stripe && !isProcessing
            ? "bg-pink-600 hover:bg-pink-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : isSuccess ? (
          <div className="flex items-center justify-center gap-2">
            <FiCheck className="w-4 h-4" />
            Payment Successful!
          </div>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>

      {/* Cancel Button */}
      <button
        type="button"
        onClick={onCancel}
        className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium"
        disabled={isProcessing || isSuccess}
      >
        Cancel Payment
      </button>
    </form>
  );
};

const StripeElementsPayment = ({ amount, onSuccess, onError, onCancel }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
            <FiCreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Stripe Payment
            </h2>
            <p className="text-sm text-gray-600">
              Secure payment processing
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Amount Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
          <p className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</p>
        </div>
      </div>

      {/* Stripe Elements */}
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </Elements>
    </div>
  );
};

export default StripeElementsPayment;
