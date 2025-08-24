"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiX,
  FiPercent,
  FiBook,
  FiUsers,
  FiSearch,
  FiPhone,
} from "react-icons/fi";
import {
  FiCreditCard,
  FiDollarSign,
  FiGift,
  FiStar,
  FiSmartphone,
  FiPrinter,
  FiMail,
  FiMessageSquare,
  FiCheck,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([""]);
  const [calculatorDisplay, setCalculatorDisplay] = useState("0.00");
  const [printReceipt, setPrintReceipt] = useState(false);
  const [receiptMethod, setReceiptMethod] = useState("Paper");
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
  const [loyaltyEmail, setLoyaltyEmail] = useState("");
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTipAmount, setCustomTipAmount] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  // Add these to your existing useState declarations
  const [showGiftCardModal, setShowGiftCardModal] = useState(false);
  const [showGiftCardLookupModal, setShowGiftCardLookupModal] = useState(false);
  const [giftCardNumber, setGiftCardNumber] = useState("");
  const [appliedGiftCard, setAppliedGiftCard] = useState(null);
  const [lookupPhone, setLookupPhone] = useState("");
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupResults, setLookupResults] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Add these functions
  const handleApplyGiftCard = () => {
    // Simulate gift card validation
    if (giftCardNumber.trim()) {
      const giftCardAmount = 50.0; // This would come from your API
      setAppliedGiftCard({
        number: giftCardNumber,
        lastFour: giftCardNumber.slice(-4),
        amount: giftCardAmount,
      });
      setShowGiftCardModal(false);
      setGiftCardNumber("");

      // Update calculator display with gift card amount
      setCalculatorDisplay(giftCardAmount.toFixed(2));
    }
  };

  const handleLookupGiftCard = () => {
    // Simulate gift card lookup by phone or email
    if (lookupPhone.trim() || lookupEmail.trim()) {
      // Mock data - replace with actual API call
      const mockResults = [
        { id: 1, lastFour: "1234", balance: 50.0 },
        { id: 2, lastFour: "5678", balance: 25.5 },
      ];
      setLookupResults(mockResults);
    }
  };

  const handleSelectLookupCard = (card) => {
    setAppliedGiftCard({
      number: `************${card.lastFour}`,
      lastFour: card.lastFour,
      amount: card.balance,
    });
    setShowGiftCardLookupModal(false);
    setLookupResults([]);
    setLookupPhone("");
    setLookupEmail("");

    // Update calculator display with gift card amount
    setCalculatorDisplay(card.balance.toFixed(2));
  };

  // Update your existing captureBarcode function to handle gift cards too
  const captureBarcodeGift = () => {
    // Simulate barcode capture for gift cards
    const simulatedGiftCards = ["1234567890123456", "9876543210987654"];
    const randomCard =
      simulatedGiftCards[Math.floor(Math.random() * simulatedGiftCards.length)];

    // Apply the scanned gift card
    const giftCardAmount = 50.0; // This would come from your API
    setAppliedGiftCard({
      number: randomCard,
      lastFour: randomCard.slice(-4),
      amount: giftCardAmount,
    });

    setCalculatorDisplay(giftCardAmount.toFixed(2));
    stopCamera();
  };
  const customers = [
    {
      name: "Molly Vaughan",
      phone: "(405) 555-0128",
      email: "molly@mail.com",
      vip: true,
      img: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Kathrinee Moss",
      phone: "(209) 555-0104",
      email: "kath@mail.com",
      vip: false,
      img: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Joshua Wilson",
      phone: "(270) 555-0117",
      email: "joshua@mail.com",
      vip: false,
      img: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Erica Wyatt",
      phone: "(208) 555-0112",
      email: "erica@mail.com",
      vip: true,
      img: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Zahir Mays",
      phone: "(307) 555-0133",
      email: "zahir@mail.com",
      vip: true,
      img: "https://i.pravatar.cc/150?img=5",
    },
  ];
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "Spicy Black Bean Burrito",
      category: "meal",
      price: 12.83,
      quantity: 1,
      icon: "🌯",
    },
    {
      id: 2,
      name: "Black Bean Chili",
      category: "meal",
      price: 12.83,
      quantity: 1,
      icon: "🍲",
    },
    {
      id: 3,
      name: "Extra Cheese",
      category: "addon",
      price: 1.83,
      quantity: 1,
      icon: "🧀",
    },
    {
      id: 4,
      name: "Mushroom",
      category: "addon",
      price: 1.83,
      quantity: 1,
      icon: "🍄",
    },
    {
      id: 5,
      name: "Coffee",
      category: "drink",
      price: 3.5,
      quantity: 2,
      icon: "☕",
    },
  ]);

  const router = useRouter();

  const validVoucherCodes = {
    VALENTINE: {
      percentage: 15,
      title: "Valentine Day",
      subtitle: "VIP Member",
    },
    BQTVIP: { percentage: 15, title: "Valentine Day", subtitle: "All Member" },
    VCTDAY: { percentage: 15, title: "Valentine Day", subtitle: "VIP Member" },
  };

  const discountOptions = [
    {
      id: "valentine15_vip",
      percentage: 15,
      title: "Valentine Day",
      subtitle: "VIP Member",
      color: "bg-pink-500",
      validUntil: "Valid until 15 June 2025",
      code: "VCTDAY",
    },
    {
      id: "valentine15_all",
      percentage: 15,
      title: "Valentine Day",
      subtitle: "All Member",
      color: "bg-blue-500",
      validUntil: "Valid until 20 June 2025",
      code: "VCTDAY",
    },
    {
      id: "valentine15_vip2",
      percentage: 15,
      title: "Valentine Day",
      subtitle: "VIP Member",
      color: "bg-purple-500",
      validUntil: "Valid until 15 June 2025",
      code: "VCTDAY",
    },
  ];
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

  const receiptOptions = [
    { id: "Paper", name: "Paper", icon: FiPrinter, color: "bg-blue-500" },
    { id: "Email", name: "Email", icon: FiMail, color: "bg-green-500" },
    { id: "SMS", name: "SMS", icon: FiMessageSquare, color: "bg-purple-500" },
  ];

  const orderDetails = {
    orderNumber: "XO85378",
    guests: 2,
    type: "Dine In",
    customer: "Lory Brown",
    isVip: true,
    items: orderItems,
    subtotal: 0,
    surcharge: 0,
    discount: selectedDiscount?.percentage || 0,
    taxRate: 12, // 12%
  };
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [amount, setAmount] = useState("50.00");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Format expiry date MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  // Detect card type
  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (cleanNumber.startsWith("4")) return "visa";
    if (cleanNumber.startsWith("5")) return "mastercard";
    if (cleanNumber.startsWith("3")) return "amex";
    return "generic";
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      // Max length with spaces
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 2000);
  };

  const isFormValid =
    cardNumber.replace(/\s/g, "").length >= 16 &&
    expiryDate.length === 5 &&
    cvv.length >= 3 &&
    cardholderName.trim().length > 0;
  const calculateTotals = () => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discountPercentage = selectedDiscount?.percentage || 0;
    const discountAmount = (subtotal * discountPercentage) / 100;
    const discountedSubtotal = subtotal - discountAmount;
    const taxAmount = (discountedSubtotal * orderDetails.taxRate) / 100;
    const total = discountedSubtotal + orderDetails.surcharge + taxAmount;

    return {
      subtotal,
      surcharge: orderDetails.surcharge,
      discountAmount,
      taxAmount,
      total,
    };
  };

  const totals = calculateTotals();

  const calculateTipAmount = (percentage) => {
    return (totals.total * percentage) / 100;
  };

  const tipOptions = [
    { percentage: 15, amount: calculateTipAmount(15) },
    { percentage: 20, amount: calculateTipAmount(20) },
    { percentage: 25, amount: calculateTipAmount(25) },
  ];

  const updateItemQuantity = (itemId, change) => {
    setOrderItems((items) =>
      items
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = Math.max(0, item.quantity + change);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const applyDiscount = (discount) => {
    setSelectedDiscount(discount);
    setShowDiscountModal(false);
  };

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

  const generateReceipt = () => {
    const currentDate = new Date();
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Order #${orderDetails.orderNumber}</title>
        <style>
          body { 
            font-family: 'Courier New', monospace; 
            max-width: 300px; 
            margin: 0 auto; 
            padding: 20px;
            line-height: 1.4;
          }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
          .order-info { margin: 15px 0; }
          .item-line { display: flex; justify-content: space-between; margin: 5px 0; }
          .total-line { border-top: 1px solid #000; padding-top: 5px; font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; border-top: 2px solid #000; padding-top: 10px; }
          @media print {
            body { margin: 0; padding: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>XO RESTAURANT</h2>
          <p>123 Main Street, City, State 12345</p>
          <p>Tel: (555) 123-4567</p>
        </div>
        
        <div class="order-info">
          <p><strong>Order #:</strong> ${orderDetails.orderNumber}</p>
          <p><strong>Date:</strong> ${currentDate.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${currentDate.toLocaleTimeString()}</p>
          <p><strong>Customer:</strong> ${orderDetails.customer}</p>
          <p><strong>Guests:</strong> ${orderDetails.guests}</p>
          <p><strong>Type:</strong> ${orderDetails.type}</p>
          <p><strong>Payment:</strong> ${selectedPaymentMethods.join(", ")}</p>
        </div>
        
        <div class="items">
          <h3>Items:</h3>
          ${orderDetails.items
            .map(
              (item) =>
                `<div class="item-line"><span>${item.name}</span><span>${(
                  item.price * item.quantity
                ).toFixed(2)}</span></div>`
            )
            .join("")}
        </div>
        
        <div class="totals">
          <div class="item-line">
            <span>Subtotal:</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div class="item-line">
            <span>Discount (${orderDetails.discount}%):</span>
            <span>-${totals.discountAmount.toFixed(2)}</span>
          </div>
          <div class="item-line">
            <span>Tax (${orderDetails.taxRate}%):</span>
            <span>${totals.taxAmount.toFixed(2)}</span>
          </div>
          <div class="item-line total-line">
            <span>Total:</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
          <div class="item-line">
            <span>Amount Paid:</span>
            <span>${calculatorDisplay}</span>
          </div>
          <div class="item-line">
            <span>Change:</span>
            <span>${(
              Number.parseFloat(calculatorDisplay) - totals.total
            ).toFixed(2)}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>Visit us again soon</p>
        </div>
      </body>
      </html>
    `;
    return receiptContent;
  };

  const handlePrintReceipt = () => {
    const receiptContent = generateReceipt();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleEmailReceipt = async (email) => {
    const receiptContent = generateReceipt();
    console.log("Sending email receipt to:", email);
    console.log("Email content:", receiptContent);

    alert(`Receipt email sent to ${email}!`);
  };

  const handleSMSReceipt = async (phone) => {
    const smsContent = `XO Restaurant Receipt
Order #${orderDetails.orderNumber}
Total: ${totals.total.toFixed(2)}
Payment: ${selectedPaymentMethods.join(", ")}
Thank you!`;

    console.log("Sending SMS receipt to:", phone);
    console.log("SMS content:", smsContent);

    alert(`Receipt SMS sent to ${phone}!`);
  };

  const handlePayNow = () => {
    console.log("Processing payment:", {
      methods: selectedPaymentMethods,
      amount: calculatorDisplay,
      order: orderDetails,
      receiptMethod: printReceipt ? receiptMethod : null,
    });

    setShowLoyaltyModal(true);
  };

  const handleSuccessModalDismiss = () => {
    setShowSuccessModal(false);
    setShowTipModal(true);
  };

  const handleLoyaltyProgram = (joinProgram = false) => {
    if (joinProgram && loyaltyEmail) {
      console.log("Joining loyalty program with email:", loyaltyEmail);
      // Here you would typically send the email to your backend
    }

    setShowLoyaltyModal(false);
    setShowSuccessModal(true);
  };

  const processFinalPayment = (tipAmount = 0) => {
    const finalAmount = Number.parseFloat(calculatorDisplay) + tipAmount;

    alert(
      `Payment of $${finalAmount.toFixed(
        2
      )} processed successfully via ${selectedPaymentMethods.join(", ")}!`
    );

    if (printReceipt) {
      if (receiptMethod === "Paper") {
        setTimeout(() => {
          handlePrintReceipt();
        }, 1000);
      }
    }

    setTimeout(() => {
      router.push("/pos");
    }, 2000);
  };

  const validateVoucherCode = () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) {
      setVoucherError("Please enter a voucher code");
      return;
    }

    if (validVoucherCodes[code]) {
      const discount = validVoucherCodes[code];
      setSelectedDiscount({
        id: code,
        percentage: discount.percentage,
        title: discount.title,
        subtitle: discount.subtitle,
      });
      setVoucherError("");
      setShowDiscountModal(false);
      setVoucherCode("");
    } else {
      setVoucherError(
        "Voucher code not found. Maybe incorrect or no longer valid."
      );
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera if available
      });
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const captureBarcode = () => {
    // Simulate barcode capture - in real implementation, you'd use a barcode scanning library
    const simulatedBarcodes = ["VALENTINE", "BQTVIP", "VCTDAY"];
    const randomBarcode =
      simulatedBarcodes[Math.floor(Math.random() * simulatedBarcodes.length)];
    setVoucherCode(randomBarcode);
    stopCamera();
  };

  const togglePaymentMethod = (methodId) => {
    setSelectedPaymentMethods((prev) => {
      if (prev.includes(methodId)) {
        // Remove if already selected (but keep at least one method)
        return prev.length > 1 ? prev.filter((id) => id !== methodId) : prev;
      } else {
        // Add if not selected
        return [...prev, methodId];
      }
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
              const isSelected = selectedPaymentMethods.includes(method.id);
              return (
                <button
                  key={method.id}
                  onClick={() => togglePaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    isSelected
                      ? "bg-blue-100 border-blue-300"
                      : "border-gray-200 hover:bg-gray-50"
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
                  {isSelected && (
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
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-gray-100 h-8 rounded-md gap-1.5 px-3"
                  onClick={() => router.back()}
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Payment</h1>
            </div>

            {/* Print Receipt Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">
                Print Receipt?
              </span>
              <button
                onClick={() => setPrintReceipt(!printReceipt)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  printReceipt ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    printReceipt ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Receipt Options - Only show when toggle is ON */}
          {printReceipt && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                {receiptOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setReceiptMethod(option.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        receiptMethod === option.id ? "bg-blue-100" : ""
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${option.color}`}>
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{option.name}</span>
                      {receiptMethod === option.id && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Additional Input Fields Based on Selection */}
              {receiptMethod === "Email" && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <label className="block text-sm font-medium text-green-800 mb-2">
                    Customer Email Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      id="customerEmail"
                      placeholder="customer@example.com"
                      className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button
                      onClick={() => {
                        const email =
                          document.getElementById("customerEmail").value;
                        if (email) {
                          handleEmailReceipt(email);
                        } else {
                          alert("Please enter a valid email address");
                        }
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              {receiptMethod === "SMS" && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <label className="block text-sm font-medium text-purple-800 mb-2">
                    Customer Phone Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      id="customerPhone"
                      placeholder="+1 (555) 123-4567"
                      className="flex-1 px-3 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={() => {
                        const phone =
                          document.getElementById("customerPhone").value;
                        if (phone) {
                          handleSMSReceipt(phone);
                        } else {
                          alert("Please enter a valid phone number");
                        }
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              {receiptMethod === "Paper" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">
                        Paper Receipt Ready
                      </h4>
                      <p className="text-xs text-blue-600 mt-1">
                        Receipt will be printed after payment confirmation
                      </p>
                    </div>
                    <button
                      onClick={handlePrintReceipt}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                    >
                      <FiPrinter className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Gift Card Payment Section */}
        {selectedPaymentMethods.includes("Gift Card") && (
          <div className="bg-white rounded-lg p-4 mt-4 mx-6">
            <h1 className="text-lg font-semibold mb-4">Gift Card Option</h1>

            {/* Gift Card Options */}
            <div className="space-y-3">
              {/* Scan Option */}
              <button
                onClick={captureBarcodeGift}
                className="w-full rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-1.01"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Scan</span>
                </div>
              </button>

              {/* Input gift card number Option */}
              <button
                onClick={() => setShowGiftCardModal(true)}
                className="w-full rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">
                    Input gift card number
                  </span>
                </div>
              </button>

              {/* Lookup Option */}
              <button
                onClick={() => setShowGiftCardLookupModal(true)}
                className="w-full rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Lookup</span>
                </div>
              </button>
            </div>

            {/* Applied Gift Card Display */}
            {appliedGiftCard && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Pay With
                </h3>
                <div className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-teal-500 rounded flex items-center justify-center">
                      <FiGift className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-teal-800">
                        Gift Card
                      </span>
                      <p className="text-xs text-teal-600">
                        **** **** **** {appliedGiftCard.lastFour}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-teal-800">
                      ${appliedGiftCard.amount}
                    </span>
                    <button
                      onClick={() => setAppliedGiftCard(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gift Card Input Modal */}
        {showGiftCardModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Apply Rewards Card
                  </h3>
                  <button
                    onClick={() => setShowGiftCardModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Gift Card Number Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gift card number
                  </label>
                  <input
                    type="text"
                    value={giftCardNumber}
                    onChange={(e) => setGiftCardNumber(e.target.value)}
                    placeholder="Enter gift card number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Select Button */}
                <button
                  onClick={handleApplyGiftCard}
                  disabled={!giftCardNumber.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gift Card Lookup Modal */}
        {showGiftCardLookupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Lookup Gift Card
                  </h3>
                  <button
                    onClick={() => setShowGiftCardLookupModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Options */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={lookupPhone}
                      onChange={(e) => setLookupPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="text-center text-gray-500 text-sm">OR</div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={lookupEmail}
                      onChange={(e) => setLookupEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Search Results */}
                {lookupResults.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Available Gift Cards
                    </h4>
                    <div className="space-y-2">
                      {lookupResults.map((card) => (
                        <div
                          key={card.id}
                          onClick={() => handleSelectLookupCard(card)}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                **** **** **** {card.lastFour}
                              </p>
                              <p className="text-sm text-gray-500">
                                Balance: ${card.balance}
                              </p>
                            </div>
                            <div className="text-sm text-blue-600 font-medium">
                              Select
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Button */}
                <button
                  onClick={handleLookupGiftCard}
                  disabled={!lookupPhone.trim() && !lookupEmail.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedPaymentMethods.includes("Loyalty Points") && (
          <div className="rounded-lg p-2 bg-white m-2">
            <h1 className="p-2">Customer Loyalty</h1>
            <div
              className="flex p-2 gap-4 border border-black rounded-lg hover:cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <FiUsers size={20} className="p-1 bg-gray-100 rounded-lg" />
              Choose Customer
            </div>
          </div>
        )}
        {isOpen && (
          <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            {/* Main Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Choose Customer
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Customer Information Section */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Customer Information
                  </h3>

                  {/* Search + Create */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center flex-1 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                      <FiSearch className="text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search customer"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none px-2 w-full text-sm"
                      />
                    </div>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      <FiPlus size={14} className="text-blue-600" />
                      <span className="text-blue-600">Create Customer</span>
                    </button>
                  </div>
                </div>

                {/* Customer List */}
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">
                    All Customer
                  </h3>
                  <div className="space-y-1 max-h-80 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={customer.img}
                            alt={customer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 text-sm">
                                {customer.name}
                              </span>
                              {customer.vip && (
                                <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                  VIP
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 gap-4 mt-1">
                              <span className="flex items-center gap-1">
                                📞 {customer.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                ✉️ {customer.email}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {customer.activated && (
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600 font-medium">
                                Activated
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredCustomers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No customers found matching "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Create Customer Modal */}
            {isCreateModalOpen && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Create New Customer
                      </h3>
                      <button
                        onClick={() => setIsCreateModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <FiX size={20} />
                      </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="vip"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="vip" className="text-sm text-gray-700">
                          Make this customer VIP
                        </label>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setIsCreateModalOpen(false)}
                        className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsCreateModalOpen(false);
                          // Add logic to create customer
                        }}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Create Customer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {isOpen && isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6 relative">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>

              {/* Title */}
              <h2
                onClick={() => setIsCreateModalOpen(true)}
                className="text-lg font-semibold mb-4"
              >
                Create New Customer
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="text-sm text-gray-500">Name</label>
                <input
                  type="text"
                  placeholder="Add reservation tags"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  placeholder="Add reservation tags"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="text-sm text-gray-500">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Customer
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedPaymentMethods.includes("Cash") && (
          <div className="bg-white rounded-lg p-4 mt-4 p-2">
            <h1 className="text-lg font-semibold">Pay with Cash</h1>
            <div className="rounded-lg border border-gray flex justify-between p-4">
              <h1 className="flex gap-2">
                <FiBook size={20} className="bg-gray-100 rounded-full p-1" />{" "}
                Cash
              </h1>
              <h1>Ammount</h1>
              <button>
                <FiX size={20} className="bg-gray-100" />
              </button>
            </div>
          </div>
        )}
        {selectedPaymentMethods.includes("Credit Card") && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <FiCreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Credit Card Payment
                  </h2>
                  <p className="text-sm text-gray-600">
                    Pay with Visa/Mastercard
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Amount Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                <p className="text-2xl font-bold text-gray-900">${amount}</p>
              </div>
            </div>

            {/* Card Form */}
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getCardType(cardNumber) === "visa" && (
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                    )}
                    {getCardType(cardNumber) === "mastercard" && (
                      <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                    )}
                    {getCardType(cardNumber) === "amex" && (
                      <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        AMEX
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expiry Date and CVV */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <FiCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  Your payment information is encrypted and secure. We don't
                  store your card details.
                </p>
              </div>
            </div>

            {/* Process Payment Button */}
            <button
              onClick={handleProcessPayment}
              disabled={!isFormValid || isProcessing}
              className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isSuccess
                  ? "bg-green-600 text-white"
                  : isFormValid && !isProcessing
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
                `Pay ${amount}`
              )}
            </button>

            {/* Cancel Button */}
            <button className="w-full mt-3 py-2 text-gray-600 hover:text-gray-800 font-medium">
              Cancel Payment
            </button>
          </div>
        )}

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
                    className="flex-1 border bg-background shadow-xs hover:bg-gray-50 h-8 rounded-md px-3 inline-flex items-center justify-center text-sm font-medium transition-all"
                  >
                    $10
                  </button>
                  <button
                    onClick={() => handleQuickAmount(20)}
                    className="flex-1 border bg-background shadow-xs hover:bg-gray-50 h-8 rounded-md px-3 inline-flex items-center justify-center text-sm font-medium transition-all"
                  >
                    $20
                  </button>
                  <button
                    onClick={() => handleQuickAmount(30)}
                    className="flex-1 border bg-background shadow-xs hover:bg-gray-50 h-8 rounded-md px-3 inline-flex items-center justify-center text-sm font-medium transition-all"
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
                      className="h-12 text-lg font-medium border bg-background shadow-xs hover:bg-gray-50 rounded-md inline-flex items-center justify-center transition-all"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={handleClear}
                    className="h-12 text-lg font-medium bg-gray-100 border shadow-xs hover:bg-gray-200 rounded-md inline-flex items-center justify-center transition-all"
                  >
                    C
                  </button>
                  <button
                    onClick={() => handleNumberClick("0")}
                    className="h-12 text-lg font-medium border bg-background shadow-xs hover:bg-gray-50 rounded-md inline-flex items-center justify-center transition-all"
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleNumberClick(".")}
                    className="h-12 text-lg font-medium border bg-background shadow-xs hover:bg-gray-50 rounded-md inline-flex items-center justify-center transition-all"
                  >
                    .
                  </button>
                </div>
              </div>
            </div>

            {/* Pay Now Button */}
            {/* Pay Now Button */}
            <button
              onClick={handlePayNow}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center justify-center gap-2 transition-all shadow-xs"
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
                  <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium border-transparent bg-pink-100 text-pink-700">
                    VIP
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">
              Items Selected
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span className="text-xs text-gray-500">{orderItems.length}</span>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg border">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateItemQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <FiMinus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateItemQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">💰 Add Tip</span>
            </div>
            <button
              onClick={() => setShowTipModal(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Add Tip
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FiPercent className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Discount Applied</span>
            </div>
            <button
              onClick={() => setShowDiscountModal(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Change
            </button>
          </div>
          {selectedDiscount ? (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-green-600">
                {selectedDiscount.percentage}% off - {selectedDiscount.title}
              </span>
            </div>
          ) : (
            <button
              onClick={() => setShowDiscountModal(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Add Discount
            </button>
          )}
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
          {totals.discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-green-600">
                -${totals.discountAmount.toFixed(2)}
              </span>
            </div>
          )}
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

      {/* Loyalty Program Modal - Now shows first */}
      {showLoyaltyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              {/* Header */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                Join XO loyalty program?
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-6">
                Earn 1 point for every $1 spent and receive $5 discount for
                every 50 points you redeem.
              </p>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={loyaltyEmail}
                  onChange={(e) => setLoyaltyEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Privacy Text */}
              <p className="text-xs text-gray-500 text-center mb-6">
                By providing your email, you are agreeing to participate in the
                loyalty programs and to be contacted through this email as part
                of the program.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleLoyaltyProgram(true)}
                  disabled={!loyaltyEmail.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Claim rewards
                </button>

                <button
                  onClick={() => handleLoyaltyProgram(false)}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Payment Modal - Now shows second */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-sm mx-4">
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Success Payment
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Your data will not be stored in our system if you cancel it.
              </p>

              {/* Dismiss Button */}
              <button
                onClick={handleSuccessModalDismiss}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {showTipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              {/* Tip Header */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Thank you for your purchase! Would you like to leave a tip?
                </h3>
                <div className="text-2xl font-bold text-gray-900">
                  ${totals.total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  (Subtotal: ${totals.total.toFixed(2)} + Tip: $1.00)
                </div>
              </div>

              {/* Tip Percentage Options */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {tipOptions.map((tip) => (
                  <button
                    key={tip.percentage}
                    onClick={() => setSelectedTip(tip)}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      selectedTip?.percentage === tip.percentage
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg font-semibold text-blue-600">
                      {tip.percentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      ${tip.amount.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Tip and No Tip Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() =>
                    setSelectedTip({ percentage: "custom", amount: 0 })
                  }
                  className={`w-full p-3 border rounded-lg text-center transition-all ${
                    selectedTip?.percentage === "custom"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    Custom Tip Amount
                  </div>
                </button>

                {selectedTip?.percentage === "custom" && (
                  <div className="px-4">
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customTipAmount}
                      onChange={(e) => setCustomTipAmount(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-center"
                    />
                  </div>
                )}

                <button
                  onClick={() => setSelectedTip({ percentage: 0, amount: 0 })}
                  className={`w-full p-3 border rounded-lg text-center transition-all ${
                    selectedTip?.percentage === 0
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">No Tip</div>
                </button>
              </div>

              {/* Privacy Text */}
              <p className="text-xs text-gray-500 text-center mb-6">
                I agree to pay the above total amount according to my card
                issuer agreement. I understand my information will be processed
                pursuant to Toast's Privacy Statement and direct Toast to share
                my information with the merchant.
              </p>

              {/* Select Button */}
              <button
                onClick={() => {
                  const tipAmount =
                    selectedTip?.percentage === "custom"
                      ? Number.parseFloat(customTipAmount) || 0
                      : selectedTip?.amount || 0;

                  setShowTipModal(false);
                  processFinalPayment(tipAmount);
                }}
                disabled={!selectedTip}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}

      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Scan Barcode</h3>
              <button
                onClick={stopCamera}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-black rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-32 border-2 border-white rounded-lg"></div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={captureBarcode}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
