// src/pages/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sampleImage from '../assets/homeImage.png';
import axios from 'axios';

const fetchMyOrders = async (customer_name) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/order/customer/${customer_name}` );
    console.log("My Orders:", response.data);
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const customer_name = JSON.parse(localStorage.getItem('user')).name;

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchMyOrders(customer_name);
      setOrders(data);
    }

    loadOrders();
  }, [customer_name]);

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
          {orders.map((order, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div>
                <h3 className="text-xl font-semibold">{order.items.map((item) => item.menuItem_name).join(', ')}</h3>
                <p className="text-gray-300">Quantity: {order.items.map((item) => item.quantity).join(', ')}</p>
                <p className="text-gray-300">Price: {order.total_amount}</p>
                <p className="text-lg font-semibold text-amber-400 mt-6">Order Status: {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyOrders;
