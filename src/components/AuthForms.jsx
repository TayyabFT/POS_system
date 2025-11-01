'use client';
import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiPhone,
  FiShoppingCart,
  FiLoader
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import {useRouter} from 'next/navigation';

import { loginUser, signUpUser } from "@/services/authService"; 
const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirm_password, setShowconfirm_password] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    remember: false,
    terms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


const router = useRouter();


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null); // Clear error when switching forms
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
      remember: false,
      terms: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Validate login form
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all required fields');
        }

        // Handle login
        const { email, password } = formData;
        const response = await loginUser({ email, password });
        
        // Check if response is successful
        if (!response || !response.message) {
          throw new Error('Invalid response from server');
        }
        
        // Store token or user data as needed
        if (response.message.user_id) {
          localStorage.setItem('userid', response.message.user_id);
        }
        
        // Navigate to dashboard
        router.push('/pos');
      } else {
        // Validate signup form
        if (!formData.full_name || !formData.email || !formData.password || !formData.confirm_password) {
          throw new Error('Please fill in all required fields');
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        if (formData.password !== formData.confirm_password) {
          throw new Error('Passwords do not match');
        }

        if (!formData.terms) {
          throw new Error('Please agree to the terms and conditions');
        }

        const { full_name, email, phone_number, password, confirm_password } = formData;
        const response = await signUpUser({ full_name, email, phone_number, password, confirm_password });

        // Check if response is successful
        if (!response) {
          throw new Error('Invalid response from server');
        }

        // Optionally auto-login after signup
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        
        if (response.message?.user_id) {
          localStorage.setItem('userid', response.message.user_id);
        }
        
        router.push('/setupbusiness');
      }
    } catch (err) {
      // Handle different types of errors
      let errorMessage = 'An error occurred. Please try again.';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
      console.error('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FiShoppingCart className="text-white text-2xl" />
              <span className="text-xl font-bold text-white">Flow POS</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isLogin ? 'Login to POS' : 'Create Account'}
            </h2>
          </div>

          {/* Form Container */}
          <div className="p-8">
            {/* Google Login (Login Form Only) */}
            {isLogin && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-xl py-3 px-4 mb-6 text-gray-700 font-medium shadow-sm hover:shadow-md transition-all"
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </motion.button>
            )}

            {/* Divider */}
            {isLogin && (
              <div className="flex items-center mb-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Field (Signup Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </motion.div>
              )}

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isLogin ? 0 : 0.1 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </motion.div>

              {/* phone_number Field (Signup Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="phone_number Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </motion.div>
              )}

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isLogin ? 0.1 : 0.3 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </motion.div>

              {/* Confirm Password (Signup Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showconfirm_password ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowconfirm_password(!showconfirm_password)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showconfirm_password ? <FiEyeOff /> : <FiEye />}
                  </button>
                </motion.div>
              )}

              {/* Remember Me & Forgot Password (Login Only) */}
              {isLogin ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </motion.div>
              ) : (
                /* Terms Checkbox (Signup Only) */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start"
                >
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">terms and conditions</a>
                  </label>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                >
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 px-6 font-medium shadow-lg transition-all ${
                  isLoading 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Login' : 'Create Account'}</span>
                    <FiArrowRight />
                  </>
                )}
              </motion.button>
            </form>

            {/* Toggle Form Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isLogin ? 0.3 : 0.6 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={toggleForm}
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={toggleForm}
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    Login
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Flow POS. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForms;