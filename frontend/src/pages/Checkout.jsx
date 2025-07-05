import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import axios from 'axios';

const Checkout = () => {
  const { cartItems } = useCart();
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Fetch delivery locations
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/deliveryLocation')
      .then(res => {
        setLocations(res.data?.data || []);
      })
      .catch(err => {
        console.error('❌ Error fetching locations:', err);
        setError('Failed to load delivery locations');
      });
  }, []);

  const handleProceedToPayment = () => {
    if (!location) {
      alert('Please select a delivery location.');
      return;
    }
    localStorage.setItem('cartTotal', subtotal);
    localStorage.setItem('deliveryLocation', location);
    navigate('/payment');
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 px-6 py-16 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold text-white text-center mb-10">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <label className="block mb-2 font-semibold">Pick Delivery Location</label>
            {error && <p className="text-red-400 mb-2">{error}</p>}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white"
            >
              <option value="">Select location</option>
              {locations.map(loc => (
                <option key={loc._id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <p className="text-lg font-semibold mb-2">Order Total:</p>
            <p className="text-amber-500 font-bold text-2xl">KES {subtotal}</p>
            <hr className="my-4 border-gray-600" />
            <h3 className="text-xl font-semibold mb-2">Order Summary:</h3>
            <ul className="list-disc ml-5 space-y-1">
              {cartItems.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.quantity} x {item.name} - KES {item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Proceed to Payment</h2>
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-md font-semibold"
          >
            Go to Payment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
