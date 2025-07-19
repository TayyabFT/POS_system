'use client';
import { useState } from 'react';
import { 
  FiHome, 
  FiMail, 
  FiPhone, 
  FiGlobe, 
  FiMapPin, 
  FiDollarSign,
  FiClock,
  FiHelpCircle,
  FiCheck,
  FiUpload,
  FiChevronRight,
  FiChevronLeft,
  FiShoppingCart
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
const BusinessSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    logo: null,
    currency: 'USD',
    timezone: 'UTC',
    language: 'en',
    enableTax: false,
    themeColor: '#3B82F6'
  });
  const [logoPreview, setLogoPreview] = useState(null);

  const businessTypes = [
    'Retail', 'Restaurant', 'Cafe', 'Pharmacy', 
    'Supermarket', 'Clothing Store', 'Electronics', 'Other'
  ];

  const industries = [
    'Food & Beverage', 'Fashion', 'Electronics', 'Health & Beauty',
    'Home & Garden', 'Sports & Outdoors', 'Automotive', 'Other'
  ];

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'India', 'Germany', 'France'];
  const cities = {
    'United States': ['New York', 'Los Angeles', 'Chicago'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane'],
    'India': ['Mumbai', 'Delhi', 'Bangalore'],
    'Germany': ['Berlin', 'Munich', 'Hamburg'],
    'France': ['Paris', 'Lyon', 'Marseille']
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'AUD', name: 'Australian Dollar' }
  ];

  const timezones = [
    'UTC', 'EST (UTC-5)', 'PST (UTC-8)', 'CET (UTC+1)',
    'IST (UTC+5:30)', 'JST (UTC+9)', 'AEST (UTC+10)'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' }
  ];

  const themeColors = [
    { value: '#3B82F6', name: 'Blue' },
    { value: '#10B981', name: 'Green' },
    { value: '#6366F1', name: 'Indigo' },
    { value: '#F59E0B', name: 'Amber' },
    { value: '#EF4444', name: 'Red' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real app, you would send this data to your API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-700 flex flex-col md:flex-row"
      >
        {/* Side Illustration (Left - 30%) */}
        <div className="w-full md:w-[30%] bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg dark:bg-gray-600">
              <FiShoppingCart className="text-blue-600 text-5xl dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">Almost there!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {currentStep === 1 && "Tell us about your business"}
              {currentStep === 2 && "How can we reach you?"}
              {currentStep === 3 && "Finalize your preferences"}
            </p>
          </div>
        </div>

        {/* Business Setup Content (Right - 70%) */}
        <div className="w-full md:w-[70%] p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Setup Your Business</h1>
              <span className="text-sm text-gray-500 dark:text-gray-300">Step {currentStep} of 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiHome className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        placeholder="Your Business Name"
                        required
                      />
                      {formData.businessName && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <FiCheck className="text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      >
                        <option value="">Select Business Type</option>
                        {businessTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiChevronRight className="text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Industry <span className="text-red-500">*</span>
                      <button type="button" className="ml-1 text-gray-400 hover:text-gray-600">
                        <FiHelpCircle className="inline" />
                      </button>
                    </label>
                    <div className="relative">
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      >
                        <option value="">Select Industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiChevronRight className="text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Business Logo (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg bg-gray-100 overflow-hidden border border-gray-300 dark:bg-gray-600 dark:border-gray-500">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FiUpload className="text-xl" />
                          </div>
                        )}
                      </div>
                      <label className="flex-1">
                        <span className="sr-only">Choose logo</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoUpload}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            dark:file:bg-blue-900 dark:file:text-blue-100
                            dark:hover:file:bg-blue-800"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiGlobe className="text-gray-400" />
                      </div>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiChevronRight className="text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400" />
                      </div>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!formData.country}
                        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all disabled:bg-gray-100 disabled:text-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                        required
                      >
                        <option value="">Select City</option>
                        {formData.country && cities[formData.country]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiChevronRight className="text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Street address, P.O. box, company name"
                    required
                  ></textarea>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        placeholder="contact@yourbusiness.com"
                        required
                      />
                      {formData.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <FiCheck className="text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Currency */}
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Preferred Currency <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiDollarSign className="text-gray-400" />
                      </div>
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      >
                        {currencies.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.name} ({currency.code})
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiChevronRight className="text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Timezone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiClock className="text-gray-400" />
                      </div>
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      >
                        {timezones.map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiChevronRight className="text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Default Language <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiChevronRight className="text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Enable Tax */}
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        id="enableTax"
                        name="enableTax"
                        type="checkbox"
                        checked={formData.enableTax}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <label htmlFor="enableTax" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable GST/VAT
                    </label>
                    <button type="button" className="ml-1 text-gray-400 hover:text-gray-600">
                      <FiHelpCircle className="inline" />
                    </button>
                  </div>
                </div>

                {/* Theme Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 dark:text-gray-300">
                    POS Theme Color (Optional)
                  </label>
                  <div className="flex space-x-3">
                    {themeColors.map(color => (
                      <div key={color.value} className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, themeColor: color.value }))}
                          className={`w-10 h-10 rounded-full ${formData.themeColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                          style={{ backgroundColor: color.value }}
                          aria-label={color.name}
                        />
                        <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  <FiChevronLeft className="mr-2" />
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                  <FiChevronRight className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() => {
                    router.push('/dashboard'); // Redirect to dashboard after submission
                  }}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessSetup;