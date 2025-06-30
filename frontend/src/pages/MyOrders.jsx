// src/pages/MyOrders.jsx
import React from 'react';
import { motion } from 'framer-motion';
import sampleImage from '../assets/homeImage.png';

const dummyOrderGroup = {
  status: 'Out for Delivery',
  items: [
    {
      name: 'Spicy Chicken Pilau',
      quantity: 2,
      image: sampleImage,
    },
    {
      name: 'Chapati Beef Wrap',
      quantity: 1,
      image: sampleImage,
    },
    {
      name: 'Grilled Veggie Bowl',
      quantity: 3,
      image: sampleImage,
    },
  ],
};

const MyOrders = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 px-6 py-16 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-5xl font-bold text-white text-center mb-12">My Orders</h1>

      <div className="bg-gray-800 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-gray-700 p-4 rounded-lg space-y-4">
          {dummyOrderGroup.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-300">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-lg font-semibold text-amber-400 mt-6">Order Status: {dummyOrderGroup.status}</p>
      </div>
    </motion.div>
  );
};

export default MyOrders;
