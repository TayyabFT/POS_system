"use client";
import React, { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiShoppingBag,
  FiPhone,
  FiMail,
  FiGlobe,
  FiClock,
  FiUser,
  FiTag,
  FiPercent,
  FiMessageSquare,
  FiGrid,
  FiLoader,
  FiUpload,
  FiImage,
  FiPrinter,
  FiType,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
export default function ReceiptCustomization() {
  const [activeTab, setActiveTab] = useState("setting");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoOption, setLogoOption] = useState("none");
  const [customLogo, setCustomLogo] = useState(null);

  const router = useRouter();
  // Configuration data - this structure is API-ready
  const [receiptConfig, setReceiptConfig] = useState({
    header: {
      logo: {
        enabled: false,
        type: "none",
        customUrl: "",
      },
      storeName: true,
      address: true,
      phoneNumber: true,
      email: false,
      socialMedia: true,
    },
    body: {
      orderNumber: true,
      dateTime: true,
      cashier: true,
      sku: false,
      discountPrice: true,
      table: true,
      orderType: true,
      orderNote: false,
    },
    footer: {
      thankYouMessage: true,
      thankYouText: "Thank you for dining with us!",
      feedback: false,
    },
    barcode: {
      type: "",
      enabled: false,
      data: "",
    },
    qrCode: {
      enabled: true,
      data: "https://yourstore.com/feedback",
    },
    format: {
      paperSize: "Paper A5 (57×37 mm)",
      font: "Inter Display",
      fontSize: "12",
      textAlignment: "Left Alignment",
      printerType: "POS-X Thermal Printer",
    },
  });

  // Preview data
  const [previewData, setPreviewData] = useState({
    storeName: "XO Black Restaurant",
    address: "8504 Green Rd, Downtown",
    phoneNumber: "(408) 555-0128",
    email: "info@xoblack.com",
    website: "www.xoblack.myvo.com",
    orderNumber: "#ORD-012912",
    dateTime: "Aug 6, 2024 at 10:41 AM",
    cashier: "John Doe",
    table: "Table T1",
    type: "Dine In",
    items: [
      {
        id: 1,
        name: "Spicy Black Bean Burrito",
        quantity: 1,
        price: 20.0,
        originalPrice: 22.0,
        sku: "BBB-001",
      },
      {
        id: 2,
        name: "Black Bean Chili Bowl",
        quantity: 2,
        price: 30.0,
        originalPrice: 30.0,
        sku: "BBC-002",
      },
      {
        id: 3,
        name: "Organic Green Salad",
        quantity: 1,
        price: 12.5,
        originalPrice: 15.0,
        sku: "OGS-003",
      },
    ],
    subtotal: 62.5,
    discount: 7.0,
    tax: 6.16,
    total: 61.66,
    paymentMethod: "Credit Card",
    paymentAmount: 61.66,
    paymentDate: "Aug 6, 2024 at 10:41 AM",
    tip: 12.33,
    orderNotes: "Extra spicy, no onions",
  });

  // Configuration options
  const configOptions = {
    header: [
      { key: "storeName", label: "Store name", icon: FiShoppingBag },
      { key: "address", label: "Address", icon: FiShoppingBag },
      { key: "phoneNumber", label: "Phone number", icon: FiPhone },
      { key: "email", label: "Email", icon: FiMail },
      { key: "socialMedia", label: "Website/Social Media", icon: FiGlobe },
    ],
  };

  // Format options
  const paperSizes = [
    "Paper A5 (57×37 mm)",
    "Paper B (86×40 mm)",
    "Paper M (88×60 mm)",
    "Paper L (90×80 mm)",
    "Paper XL (92×140 mm)",
  ];

  const fonts = [
    "Inter Display",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Roboto",
  ];

  const fontSizes = ["8", "9", "10", "11", "12", "14", "16", "18", "20"];

  const alignments = [
    { value: "Left Alignment", label: "Left Alignment", icon: FiAlignLeft },
    {
      value: "Center Alignment",
      label: "Center Alignment",
      icon: FiAlignCenter,
    },
    { value: "Right Alignment", label: "Right Alignment", icon: FiAlignRight },
    {
      value: "Justify Alignment",
      label: "Justify Alignment",
      icon: FiAlignJustify,
    },
  ];

  const printerTypes = [
    "POS-X Thermal Printer",
    "POS-X Thermal Printer/PI",
    "Ievro Thermal Printer C367",
    "Epson Thermal Printer TM642",
    "Star TSP143",
    "Generic Thermal Printer",
  ];

  // Barcode types
  const barcodeTypes = [
    { value: "", label: "Select barcode type" },
    { value: "qr", label: "QR Code" },
    { value: "code128", label: "Code 128" },
    { value: "code39", label: "Code 39" },
    { value: "ean13", label: "EAN-13" },
  ];

  // Generate realistic barcode based on type
  const generateBarcode = (type, data = null) => {
    const barcodeData =
      data || receiptConfig.barcode.data || previewData.orderNumber;

    switch (type) {
      case "qr":
        return (
          <div className="inline-block bg-black p-1">
            <div className="w-16 h-16 bg-white relative">
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px p-1">
                {Array.from({ length: 64 }, (_, i) => (
                  <div
                    key={i}
                    className={`${
                      Math.random() > 0.5 ? "bg-black" : "bg-white"
                    } w-full h-full`}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "code128":
        return (
          <div className="inline-block bg-white p-2">
            <div className="flex items-end h-12 gap-px">
              {Array.from({ length: 40 }, (_, i) => (
                <div
                  key={i}
                  className={`bg-black ${
                    Math.random() > 0.5 ? "w-px" : "w-0.5"
                  } h-full`}
                  style={{
                    height: `${Math.random() * 20 + 30}px`,
                  }}
                />
              ))}
            </div>
            <div className="text-xs text-center mt-1 font-mono">
              {barcodeData}
            </div>
          </div>
        );

      case "code39":
        return (
          <div className="inline-block bg-white p-2">
            <div className="flex items-end h-10 gap-px">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`bg-black ${i % 3 === 0 ? "w-1" : "w-px"} h-full`}
                />
              ))}
            </div>
            <div className="text-xs text-center mt-1 font-mono">
              *{barcodeData}*
            </div>
          </div>
        );

      case "ean13":
        return (
          <div className="inline-block bg-white p-2">
            <div className="flex items-end h-12">
              <div className="bg-black w-px h-full mr-1" />
              <div className="bg-black w-px h-full mr-2" />
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="bg-black w-px h-full mr-px" />
              ))}
              <div className="bg-black w-px h-full mx-1" />
              <div className="bg-black w-px h-full mx-1" />
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i + 24} className="bg-black w-px h-full mr-px" />
              ))}
              <div className="bg-black w-px h-full ml-2" />
              <div className="bg-black w-px h-full" />
            </div>
            <div className="text-xs text-center mt-1 font-mono">
              1234567890123
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Get text alignment class based on config
  const getTextAlignment = () => {
    switch (receiptConfig.format.textAlignment) {
      case "Left Alignment":
        return "text-left";
      case "Center Alignment":
        return "text-center";
      case "Right Alignment":
        return "text-right";
      case "Justify Alignment":
        return "text-justify";
      default:
        return "text-left";
    }
  };

  // Get font size class
  const getFontSizeClass = () => {
    const size = parseInt(receiptConfig.format.fontSize);
    if (size <= 10) return "text-xs";
    if (size <= 12) return "text-sm";
    if (size <= 14) return "text-base";
    if (size <= 16) return "text-lg";
    return "text-xl";
  };

  const saveConfiguration = async () => {
    try {
      setSaving(true);
      console.log("Saving configuration:", receiptConfig);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessAlert(true);
      router.push("/moreSettings");
    } catch (error) {
      console.error("Error saving configuration:", error);
      setFailAlert(true);
    } finally {
      setSaving(false);
    }
  };

  const toggleOption = (category, option) => {
    setReceiptConfig((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: !prev[category][option],
      },
    }));
  };

  const updateBarcodeType = (type) => {
    setReceiptConfig((prev) => ({
      ...prev,
      barcode: {
        ...prev.barcode,
        type: type,
        enabled: type !== "",
        data: type !== "" ? prev.barcode.data || previewData.orderNumber : "",
      },
    }));
  };

  const updateFormatOption = (key, value) => {
    setReceiptConfig((prev) => ({
      ...prev,
      format: {
        ...prev.format,
        [key]: value,
      },
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomLogo(e.target.result);
        setReceiptConfig((prev) => ({
          ...prev,
          header: {
            ...prev.header,
            logo: {
              enabled: true,
              type: "custom",
              customUrl: e.target.result,
            },
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoOptionChange = (option) => {
    setLogoOption(option);
    setReceiptConfig((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        logo: {
          enabled: option !== "none",
          type: option,
          customUrl: option === "custom" ? customLogo : "",
        },
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex bg-white font-sans text-gray-900 h-screen">
        <div className="flex items-center justify-center w-full">
          <div className="text-center">
            <FiLoader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Loading receipt configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white font-sans text-gray-900 h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar activeTab="settings" />
        {successAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
            <div
              className="flex items-center p-3 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 shadow-lg min-w-80"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>
                <span className="font-medium">
                  Receipt customization successfully updated
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Fail Alert - Positioned at top center */}
        {failAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
            <div
              className="flex items-center p-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 shadow-lg min-w-80"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>
                <span className="font-medium">
                  Failed to update receipt customization
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 hover:cursor-pointer"
              onClick={() => {
                router.push("/moreSettings");
              }}
            >
              <FiArrowLeft size={24} />
            </button>
            <h1 className="font-medium text-3xl">Receipt Customization</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                router.push("/moreSettings");
              }}
              className="rounded-full font-medium px-6 py-2 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveConfiguration}
              disabled={saving}
              className="rounded-full font-medium px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              {saving && <FiLoader className="w-4 h-4 animate-spin" />}
              Save
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-2 gap-8 h-full p-6">
            {/* Left Panel - Settings */}
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("setting")}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "setting"
                      ? "border-blue-500 text-blue-600 bg-white"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Setting
                </button>
                <button
                  onClick={() => setActiveTab("format")}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "format"
                      ? "border-blue-500 text-blue-600 bg-white"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Format
                </button>
              </div>

              {/* Tab Content */}
              <div
                className="p-6 h-full overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                {activeTab === "setting" ? (
                  <div className="space-y-8 overflow-y-auto">
                    {/* Header Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Header
                      </h3>

                      {/* Logo Section */}
                      <div className="mb-6 p-4 bg-white rounded-lg border">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Store Logo
                        </h4>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="logo"
                              value="none"
                              checked={logoOption === "none"}
                              onChange={(e) =>
                                handleLogoOptionChange(e.target.value)
                              }
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-3 text-sm text-gray-700">
                              No logo
                            </span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="logo"
                              value="default"
                              checked={logoOption === "default"}
                              onChange={(e) =>
                                handleLogoOptionChange(e.target.value)
                              }
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-3 text-sm text-gray-700">
                              Use default logo
                            </span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="logo"
                              value="custom"
                              checked={logoOption === "custom"}
                              onChange={(e) =>
                                handleLogoOptionChange(e.target.value)
                              }
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-3 text-sm text-gray-700">
                              Upload custom logo
                            </span>
                          </label>

                          {logoOption === "custom" && (
                            <div className="ml-7 mt-2">
                              <label className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                                <FiUpload className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-blue-700">
                                  Choose file
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleLogoUpload}
                                  className="hidden"
                                />
                              </label>
                              {customLogo && (
                                <div className="mt-2 p-2 bg-gray-100 rounded border">
                                  <img
                                    src={customLogo}
                                    alt="Custom logo"
                                    className="h-8 object-contain"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {configOptions.header.map(
                          ({ key, label, icon: Icon }) => (
                            <div key={key} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`header-${key}`}
                                checked={receiptConfig.header[key] || false}
                                onChange={() => toggleOption("header", key)}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              />
                              <label
                                htmlFor={`header-${key}`}
                                className="ml-3 flex items-center text-sm text-gray-700 cursor-pointer"
                              >
                                <Icon className="w-4 h-4 mr-2 text-gray-400" />
                                {label}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Body Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Body
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            key: "orderNumber",
                            label: "Order number",
                            icon: FiTag,
                          },
                          {
                            key: "dateTime",
                            label: "Date & time",
                            icon: FiClock,
                          },
                          { key: "cashier", label: "Cashier", icon: FiUser },
                          { key: "sku", label: "SKU", icon: FiTag },
                          {
                            key: "discountPrice",
                            label: "Discount price",
                            icon: FiPercent,
                          },
                          { key: "table", label: "Table", icon: FiGrid },
                          {
                            key: "orderType",
                            label: "Order type",
                            icon: FiTag,
                          },
                          {
                            key: "orderNote",
                            label: "Order notes",
                            icon: FiMessageSquare,
                          },
                        ].map(({ key, label, icon: Icon }) => (
                          <div key={key} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`body-${key}`}
                              checked={receiptConfig.body[key] || false}
                              onChange={() => toggleOption("body", key)}
                              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`body-${key}`}
                              className="ml-3 flex items-center text-sm text-gray-700 cursor-pointer"
                            >
                              <Icon className="w-4 h-4 mr-2 text-gray-400" />
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Footer
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="footer-thankYou"
                            checked={
                              receiptConfig.footer?.thankYouMessage || false
                            }
                            onChange={() =>
                              toggleOption("footer", "thankYouMessage")
                            }
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="footer-thankYou"
                            className="ml-3 flex items-center text-sm text-gray-700 cursor-pointer"
                          >
                            <FiMessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                            Include thank you message
                          </label>
                        </div>

                        {receiptConfig.footer?.thankYouMessage && (
                          <div className="ml-7">
                            <label className="block text-sm text-gray-700 mb-2">
                              Thank you message
                            </label>
                            <input
                              type="text"
                              value={receiptConfig.footer?.thankYouText || ""}
                              onChange={(e) =>
                                setReceiptConfig((prev) => ({
                                  ...prev,
                                  footer: {
                                    ...prev.footer,
                                    thankYouText: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        )}

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="footer-feedback"
                            checked={receiptConfig.footer?.feedback || false}
                            onChange={() => toggleOption("footer", "feedback")}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="footer-feedback"
                            className="ml-3 flex items-center text-sm text-gray-700 cursor-pointer"
                          >
                            <FiMessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                            Include feedback section
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Barcode Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Barcode
                      </h3>
                      <div className="space-y-4">
                        <select
                          value={receiptConfig.barcode?.type || ""}
                          onChange={(e) => updateBarcodeType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {barcodeTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        {receiptConfig.barcode?.enabled && (
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">
                              Barcode Data
                            </label>
                            <input
                              type="text"
                              placeholder="Enter barcode data"
                              value={receiptConfig.barcode?.data || ""}
                              onChange={(e) =>
                                setReceiptConfig((prev) => ({
                                  ...prev,
                                  barcode: {
                                    ...prev.barcode,
                                    data: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* QR Code Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        QR Code
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="qr-enabled"
                            checked={receiptConfig.qrCode?.enabled || false}
                            onChange={() =>
                              setReceiptConfig((prev) => ({
                                ...prev,
                                qrCode: {
                                  ...prev.qrCode,
                                  enabled: !prev.qrCode?.enabled,
                                },
                              }))
                            }
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="qr-enabled"
                            className="ml-3 text-sm text-gray-700 cursor-pointer"
                          >
                            Include QR Code
                          </label>
                        </div>
                        {receiptConfig.qrCode?.enabled && (
                          <input
                            type="text"
                            placeholder="QR Code data/URL"
                            value={receiptConfig.qrCode?.data || ""}
                            onChange={(e) =>
                              setReceiptConfig((prev) => ({
                                ...prev,
                                qrCode: {
                                  ...prev.qrCode,
                                  data: e.target.value,
                                },
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Format Tab Content
                  <div className="space-y-6">
                    {/* Paper Size */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Format
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Paper size
                          </label>
                          <select
                            value={receiptConfig.format.paperSize}
                            onChange={(e) =>
                              updateFormatOption("paperSize", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {paperSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Font Settings */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Font
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FiType className="inline w-4 h-4 mr-2" />
                            Inter Display
                          </label>
                          <select
                            value={receiptConfig.format.font}
                            onChange={(e) =>
                              updateFormatOption("font", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {fonts.map((font) => (
                              <option key={font} value={font}>
                                {font}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Font size
                          </label>
                          <select
                            value={receiptConfig.format.fontSize}
                            onChange={(e) =>
                              updateFormatOption("fontSize", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {fontSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Text Alignment */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Text alignment
                      </h3>
                      <div className="space-y-4">
                        <select
                          value={receiptConfig.format.textAlignment}
                          onChange={(e) =>
                            updateFormatOption("textAlignment", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {alignments.map(({ value, label, icon: Icon }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Printer Setting */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Printer Setting
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FiPrinter className="inline w-4 h-4 mr-2" />
                            Printer type
                          </label>
                          <select
                            value={receiptConfig.format.printerType}
                            onChange={(e) =>
                              updateFormatOption("printerType", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {printerTypes.map((printer) => (
                              <option key={printer} value={printer}>
                                {printer}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-gray-200 rounded-lg p-6 overflow-y-auto">
              <div className="flex justify-center">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full">
                  {/* Header */}
                  <div className={`space-y-2 mb-4 ${getTextAlignment()}`}>
                    {/* Logo */}
                    {receiptConfig.header?.logo?.enabled && (
                      <div className="mb-3">
                        {receiptConfig.header.logo.type === "default" ? (
                          <div className="flex justify-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                              XO
                            </div>
                          </div>
                        ) : receiptConfig.header.logo.type === "custom" &&
                          customLogo ? (
                          <div className="flex justify-center">
                            <img
                              src={customLogo}
                              alt="Custom logo"
                              className="h-16 w-auto object-contain"
                            />
                          </div>
                        ) : null}
                      </div>
                    )}

                    {receiptConfig.header?.storeName &&
                      previewData.storeName && (
                        <h2
                          className={`text-xl font-bold ${getFontSizeClass()}`}
                          style={{ fontFamily: receiptConfig.format.font }}
                        >
                          {previewData.storeName}
                        </h2>
                      )}
                    {receiptConfig.header?.address && previewData.address && (
                      <p
                        className={`text-sm text-gray-600 ${getFontSizeClass()}`}
                        style={{ fontFamily: receiptConfig.format.font }}
                      >
                        {previewData.address}
                      </p>
                    )}
                    {receiptConfig.header?.phoneNumber &&
                      previewData.phoneNumber && (
                        <p
                          className={`text-sm text-gray-600 ${getFontSizeClass()}`}
                          style={{ fontFamily: receiptConfig.format.font }}
                        >
                          {previewData.phoneNumber}
                        </p>
                      )}
                    {receiptConfig.header?.email && previewData.email && (
                      <p
                        className={`text-sm text-gray-600 ${getFontSizeClass()}`}
                        style={{ fontFamily: receiptConfig.format.font }}
                      >
                        {previewData.email}
                      </p>
                    )}
                    {receiptConfig.header?.socialMedia &&
                      previewData.website && (
                        <p
                          className={`text-sm text-gray-600 ${getFontSizeClass()}`}
                          style={{ fontFamily: receiptConfig.format.font }}
                        >
                          {previewData.website}
                        </p>
                      )}
                  </div>

                  {/* Order Details */}
                  <div
                    className={`my-6 text-sm border-t border-gray-200 pt-4 ${getTextAlignment()}`}
                    style={{ fontFamily: receiptConfig.format.font }}
                  >
                    {receiptConfig.body?.orderNumber &&
                      previewData.orderNumber && (
                        <div className="flex justify-between mb-1">
                          <span>Order Number</span>
                          <span>{previewData.orderNumber}</span>
                        </div>
                      )}
                    {receiptConfig.body?.dateTime && previewData.dateTime && (
                      <div className="flex justify-between mb-1">
                        <span>Date & Time</span>
                        <span>{previewData.dateTime}</span>
                      </div>
                    )}
                    {receiptConfig.body?.cashier && previewData.cashier && (
                      <div className="flex justify-between mb-1">
                        <span>Cashier</span>
                        <span>{previewData.cashier}</span>
                      </div>
                    )}
                    {receiptConfig.body?.table && previewData.table && (
                      <div className="flex justify-between mb-1">
                        <span>Table</span>
                        <span>{previewData.table}</span>
                      </div>
                    )}
                    {receiptConfig.body?.orderType && previewData.type && (
                      <div className="flex justify-between mb-1">
                        <span>Type</span>
                        <span>{previewData.type}</span>
                      </div>
                    )}
                  </div>

                  {/* Items */}
                  <div
                    className="border-t border-gray-200 pt-4 mb-4"
                    style={{ fontFamily: receiptConfig.format.font }}
                  >
                    <div className={`space-y-2 text-sm ${getTextAlignment()}`}>
                      {previewData.items?.map((item, index) => (
                        <div key={item.id || index}>
                          <div className="flex justify-between">
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                          {item.originalPrice &&
                            item.originalPrice !== item.price &&
                            receiptConfig.body?.discountPrice && (
                              <div className="text-right text-xs text-gray-500 line-through">
                                Original: ${item.originalPrice.toFixed(2)}
                              </div>
                            )}
                          {receiptConfig.body?.sku && item.sku && (
                            <div className="text-xs text-gray-500">
                              SKU: {item.sku}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t border-gray-200 mt-4 pt-4 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>{previewData.items?.length || 0} Item(s)</span>
                        <span>
                          ${previewData.subtotal?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                      {receiptConfig.body?.discountPrice &&
                        previewData.discount > 0 && (
                          <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-${previewData.discount.toFixed(2)}</span>
                          </div>
                        )}
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${previewData.tax?.toFixed(2) || "0.00"}</span>
                      </div>
                      {previewData.tip && previewData.tip > 0 && (
                        <div className="flex justify-between">
                          <span>Tip</span>
                          <span>${previewData.tip.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${previewData.total?.toFixed(2) || "0.00"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div
                    className="border-t border-gray-200 pt-4 mb-4"
                    style={{ fontFamily: receiptConfig.format.font }}
                  >
                    <div className="flex justify-between text-sm">
                      <span>{previewData.paymentMethod || "Cash"}</span>
                      <span>
                        ${previewData.paymentAmount?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {previewData.paymentDate}
                    </div>
                  </div>

                  {/* Order Notes */}
                  {receiptConfig.body?.orderNote && previewData.orderNotes && (
                    <div
                      className="border-t border-gray-200 pt-4 mb-4"
                      style={{ fontFamily: receiptConfig.format.font }}
                    >
                      <div className={`text-sm ${getTextAlignment()}`}>
                        <span className="font-medium">Order Notes: </span>
                        <span className="text-gray-600">
                          {previewData.orderNotes}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  {receiptConfig.footer?.thankYouMessage &&
                    receiptConfig.footer?.thankYouText && (
                      <div
                        className={`text-sm mb-4 ${getTextAlignment()}`}
                        style={{ fontFamily: receiptConfig.format.font }}
                      >
                        {receiptConfig.footer.thankYouText}
                      </div>
                    )}

                  {receiptConfig.footer?.feedback && (
                    <div
                      className={`text-xs text-gray-500 mb-4 ${getTextAlignment()}`}
                      style={{ fontFamily: receiptConfig.format.font }}
                    >
                      Please rate your experience at www.feedback.com
                    </div>
                  )}

                  {/* Barcode/QR Code */}
                  <div className="text-center space-y-3">
                    {receiptConfig.barcode?.enabled &&
                      receiptConfig.barcode?.type && (
                        <div>
                          <div className="text-xs text-gray-500 mb-2">
                            {receiptConfig.barcode.type.toUpperCase()} Barcode
                          </div>
                          {generateBarcode(receiptConfig.barcode.type)}
                        </div>
                      )}

                    {receiptConfig.qrCode?.enabled && (
                      <div>
                        <div className="text-xs text-gray-500 mb-2">
                          QR Code
                        </div>
                        {generateBarcode("qr", receiptConfig.qrCode.data)}
                        <div className="text-xs text-gray-400 mt-1">
                          Scan for feedback
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
