'use client';

import { FiAlertTriangle, FiHome, FiSearch, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      {/* Header with Logo */}
      <div className="mb-8 flex items-center justify-center">
        <FiShoppingCart className="text-blue-600 text-3xl mr-2" />
        <span className="text-2xl font-bold text-gray-800">Flow POS</span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        {/* Illustration */}
        <div className="bg-blue-50 p-8 flex justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20"></div>
            <div className="absolute inset-4 bg-blue-200 rounded-full opacity-30"></div>
            <div className="absolute inset-8 bg-blue-300 rounded-full opacity-40"></div>
            <div className="absolute inset-12 flex items-center justify-center">
              <FiAlertTriangle className="text-red-500 text-5xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Flow POS..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/" 
              className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiHome className="mr-2" />
              Return Home
            </Link>
            <Link 
              href="/dashboard" 
              className="flex-1 flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Need help? Contact our support team</p>
        <p className="mt-1">© {new Date().getFullYear()} Flow POS. All rights reserved.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;