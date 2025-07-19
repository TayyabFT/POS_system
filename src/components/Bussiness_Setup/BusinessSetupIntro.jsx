"use client";

import { useState } from 'react';
import { FiSettings, FiStore } from 'react-icons/fi';
import BusinessSetup from './BusinessSetup'; // Make sure to import your SetupBusiness component
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
const BusinessSetupIntro = () => {
  const [showSetup, setShowSetup] = useState(false);

  if (showSetup) {
    return <BusinessSetup />;
  }

const router=useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Optional step indicator */}
        <div className="flex justify-center mb-2">
          <span className="text-sm font-medium text-blue-600">Step 1 of 3</span>
        </div>
        
        {/* Main card */}
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <FiSettings className="text-blue-600 text-3xl" />
              {/* Alternatively: <FiStore className="text-blue-600 text-3xl" /> */}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Let's set up your business
          </h1>
          
          <p className="text-gray-500 text-center mb-6">
            Complete your setup in a few easy steps to unlock all features.
          </p>
          
          {/* Optional progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
            <div className="bg-blue-600 h-1.5 rounded-full w-1/3"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowSetup(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Business Setup
            </button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Skip for now
            </button>
          </div>
        </div>
        
        {/* Optional illustration credit */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Your business data will be secured and private
        </p>
      </div>
    </div>
  );
};

export default BusinessSetupIntro;