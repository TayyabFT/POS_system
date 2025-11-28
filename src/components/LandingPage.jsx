'use client';

import { useState } from 'react';
import { FiArrowRight, FiPlay, FiCheck, FiDollarSign, FiSmartphone, FiPieChart, FiClock, FiUsers, FiShoppingCart, FiCoffee, FiScissors, FiShoppingBag, FiHome, FiMail, FiPhone, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import dashboardImage from "@/assets/images/pos-dashboard.png"
import qrcodedemo from "@/assets/images/qrcodedemo.png"
import posModules from "@/assets/images/posModule.png"
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const router = useRouter();
  const handleLogin = () => {
    router.push('/dashboard');
  };

  const features = [
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Instant Setup",
      description: "Get your business running in minutes, not hours with our guided onboarding."
    },
    {
      icon: <FiSmartphone className="w-6 h-6" />,
      title: "Hardware Freedom",
      description: "Works on any device - tablet, phone, or computer. No expensive hardware needed."
    },
    {
      icon: <FiPieChart className="w-6 h-6" />,
      title: "Smart Insights",
      description: "Real-time analytics and reports to help you make data-driven decisions."
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "All Payment Types",
      description: "Accept cash, cards, mobile wallets, and QR code payments seamlessly."
    }
  ];

  const industries = [
    { icon: <FiCoffee className="w-6 h-6" />, name: "Cafés & Coffee Shops" },
    { icon: <FiScissors className="w-6 h-6" />, name: "Barber & Beauty Salons" },
    { icon: <FiShoppingBag className="w-6 h-6" />, name: "Retail Boutiques" },
    { icon: <FiHome className="w-6 h-6" />, name: "Restaurants" },
    { icon: <FiShoppingCart className="w-6 h-6" />, name: "Online Stores" }
  ];

  const testimonials = [
    {
      quote: "Flow cut our setup time by 90% and our customers love the QR code ordering. Game changer!",
      name: "Sarah Johnson",
      role: "Owner, Brew & Bites Café",
      stars: 5
    },
    {
      quote: "The AI scheduling has saved me 10+ hours a week on staff management. Worth every penny.",
      name: "Michael Chen",
      role: "Manager, Urban Cuts Barbershop",
      stars: 5
    }
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: ["Up to 2 registers", "Basic reporting", "Email support", "Online ordering"],
      cta: "Start Free Trial"
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      popular: true,
      features: ["Up to 5 registers", "Advanced analytics", "Priority support", "QR code payments", "Staff management"],
      cta: "Get Started"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited registers", "Dedicated account manager", "API access", "Custom integrations", "24/7 support"],
      cta: "Contact Sales"
    }
  ];

  const renderStars = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <span key={i} className="text-yellow-400">★</span>
    ));
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600 flex items-center">
              <FiShoppingCart className="mr-2" />
              Flow POS
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#solutions" className="text-gray-700 hover:text-blue-600">Solutions</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
          </div>
          
          <div className="hidden md:block">
            <button onClick={handleLogin} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
            <a href="#solutions" className="block text-gray-700 hover:text-blue-600">Solutions</a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="block text-gray-700 hover:text-blue-600">Testimonials</a>
            <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              The Smart & Simple <span className="text-blue-600">POS System</span> for Your Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Effortless control, intelligent growth - get your business running in minutes with our all-in-one solution.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                Start Free Trial <FiArrowRight className="ml-2" />
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-300 flex items-center justify-center"
              >
                <FiPlay className="mr-2" /> Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="relative">
                <Image 
                  src={dashboardImage} // Replace with your actual image
                  alt="Flow POS Dashboard"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">Trusted by businesses worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Shopify', 'Square', 'QuickBooks', 'Uber Eats'].map((logo) => (
              <div key={logo} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition duration-300">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Run Your Business</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flow combines point of sale, payments, and business management into one simple system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">One-Click Business Modules</h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform Flow to match your business type with a single click. Whether you run a restaurant, retail store, or service business, we've got you covered.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Quick service mode for fast-paced environments</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Integrated delivery and pickup options</span>
                </li>
                <li className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Appointment booking for service businesses</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src={posModules} // Replace with your actual image
                  alt="Flow POS Modules"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Feature */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pl-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contactless QR Code Ordering & Payments</h2>
              <p className="text-xl text-gray-600 mb-8">
                Let customers browse your menu and pay directly from their phones - no physical contact needed.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                    [QR Code]
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Customer scans QR code at table</li>
                    <li>Browse menu on their phone</li>
                    <li>Place order & pay securely</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src={qrcodedemo} // Replace with your actual image
                  alt="QR Code Ordering"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section id="solutions" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Your Industry</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flow adapts to your specific business needs with tailored features and workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:bg-blue-50 transition duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {industry.icon}
                </div>
                <h3 className="font-semibold">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from businesses that use Flow every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="mb-4">
                  {renderStars(testimonial.stars)}
                </div>
                <p className="text-xl italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4">
                    <Image 
                      src={posModules} // Replace with actual avatar image
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />  
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All plans include our full feature set. Pay only for the scale you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden border ${plan.popular ? 'border-blue-500 border-2' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-3 rounded-lg font-semibold ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition duration-300`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of businesses using Flow to simplify operations and boost sales.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4 flex items-center">
                <FiShoppingCart className="mr-2" />
                Flow POS
              </div>
              <p className="mb-4">The smart & simple POS system for modern businesses.</p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="hover:text-white transition duration-300">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Integrations', 'Updates'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Documentation', 'Guides', 'Blog', 'Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiMail className="mr-2" /> hello@flowpos.com
                </li>
                <li className="flex items-center">
                  <FiPhone className="mr-2" /> (800) 123-4567
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Flow POS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <FiX className="w-8 h-8" />
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white">Video demo would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;