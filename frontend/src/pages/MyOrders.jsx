// src/pages/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sampleImage from '../assets/homeImage.png';
import axios from 'axios';
import Swal from 'sweetalert2';

const fetchMyOrders = async (customer_name) => {
  try {
    const response = await axios.get(`/api/order/customer/${customer_name}` );
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

  const handleCancel = async (orderId, newStatus) => {
    try {
      const timeLimit = 15 * 60 * 1000; // 15 minutes in milliseconds
      if (new Date() - new Date(orders.find(o => o._id === orderId).created_at) > timeLimit) {
        Swal.fire({
          icon: 'error',
          title: 'Cancellation Failed',
          text: 'You can only cancel an order within 15 minutes of placing it.',
        });
        return;
      }
      await axios.put(`/api/order/update/${orderId}`, {
        status: newStatus,
      })
      Swal.fire({
        icon: 'success',
        title: 'Order Cancelled',
        text: 'Your order has been cancelled successfully.',
      });
    } catch (err) {
      console.error('Failed to update order status:', err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update order status',
      })
    } finally {
      // Refresh the orders list
      const customer_name = JSON.parse(localStorage.getItem('user')).name;
      const data = await fetchMyOrders(customer_name);
      setOrders(data);
    }
  }

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
  <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-5 mb-6 w-full">
    <h3 className="text-xl font-bold text-white mb-4">Order #{index + 1}</h3>
    
    {/* List of items in this order */}
    <div className="space-y-4">
      {order.items.map((item, idx) => (
        <div key={idx} className="flex justify-between border-b border-gray-600 pb-2">
          <div>
            <h4 className="text-lg font-semibold text-white">{item.menuItem_name}</h4>
            <p className="text-gray-300">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Order-wide info */}
    <div className="mt-4 flex justify-between items-center">
      <div>
        <p className="text-gray-300">Total Price: KES {order.total_amount}</p>
        <p className="text-md font-semibold text-amber-400">Order Status: {order.status === 'out for delivery'
        ? <span className="text-amber-400">Your order is {order.status}. Kindly meet the delivery person at the specified location.</span>
        : order.status === 'delivered'
        ? <span className="text-green-400">Your order has been {order.status}. Thank you for choosing us!</span>
        : <span className='text-amber-400'>{order.status}</span>}</p>
      </div>
      <button
        onClick={() => handleCancel(order._id, 'cancelled')}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm hover:cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </div>
))}

        </div>
      </div>
    </motion.div>
  );
};

export default MyOrders;
