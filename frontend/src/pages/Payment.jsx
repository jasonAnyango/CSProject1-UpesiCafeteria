// src/pages/Payment.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import paymentImage from '../assets/image.png';

const Payment = () => {
  const [phone, setPhone] = useState('');

  const validatePhone = (number) => {
    if (number.startsWith('07') && number.length === 10) return true;
    if (number.startsWith('+254') && number.length === 13) return true;
    return false;
  };

  const handleSTKPush = () => {
    if (!validatePhone(phone)) {
      alert('Please enter a valid phone number (07... or +254...)');
      return;
    }
    alert(`STK Push sent to ${phone}`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 px-6 py-16 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-white text-center mb-12">Payment</h1>

      {/* Content Section */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        {/* Image Section */}
        <div className="md:w-1/2 w-full">
          <img src={paymentImage} alt="Payment Visual" className="w-full h-83 rounded-lg" />
        </div>

        {/* Payment Details */}
        <div className="md:w-1/2 w-full text-white">
          <label htmlFor="phone" className="block text-lg font-semibold mb-2 text-center md:text-left">Enter your phone number:</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600 mb-4"
            placeholder="Enter your phone number"
          />
          <div className="text-center md:text-left">
            <span className="text-lg font-medium block mb-2">Receive STK Push:</span>
            <button
              onClick={handleSTKPush}
              className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-md font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;
