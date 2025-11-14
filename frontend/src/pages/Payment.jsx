// src/pages/Payment.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import paymentImage from '../assets/image.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Payment = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
      setAmount(cartTotal);
    } else {
      setAmount('0');
      setMessage('🛒 Cart is empty. Please add items before paying.');
    }
  }, []);

  const validatePhone = (number) => {
    if ((number.startsWith('07') || number.startsWith('01')) && number.length === 10) return true;
    if (number.startsWith('+254') && number.length === 13) return true;
    return false;
  };

  const formatPhone = (number) => {
    if (number.startsWith('07') || number.startsWith('01')) {
      return `254${number.slice(1)}`;
    }
    if (number.startsWith('+254')) {
      return number.slice(1); // remove the "+"
    }
    return number;
  };

  const handleSTKPush = async () => {
    if (!validatePhone(phone)) {
      setMessage('❌ Please enter a valid phone number (07..., 01..., or +254...)');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage('🛒 Cart total not found or zero. Please check your cart.');
      return;
    }

    try {
      const formattedPhone = formatPhone(phone);
      const res = await axios.post('/api/mpesa/pay', {
        phone: formattedPhone,
        amount,
      });

      // Get the response code and checkout request ID from the response
      const { ResponseCode, CheckoutRequestID } = res.data;

      if (ResponseCode === '0') {
        setMessage('✅ STK Push sent! Check your phone and enter your M-Pesa PIN.');
        let attempts = 0;
        // Set the checkout request ID in localStorage for later use
        localStorage.setItem('checkoutRequestId', CheckoutRequestID);

        // Poll for payment status
        const pollInterval = setInterval(async () => {
          try {
            attempts++;
            // Send a request to check the payment status
            const statusRes = await axios.get(`/api/mpesa/status/${CheckoutRequestID}`);
            // Check the status from the response
            const { status } = statusRes.data;
            // Update the message based on the status
            if (status === 'completed') {
              clearInterval(pollInterval)
              // Alert the user about successful payment
              setMessage('✅ Payment successful!');
              console.log('Payment successful:', statusRes.data);
              // Placing the order...
              // Get order details from localStorage
              const total_amount = localStorage.getItem('cartTotal');
              const deliveryLocation = localStorage.getItem('deliveryLocation');
              const customer_name = JSON.parse(localStorage.getItem('user')).name;
              const orderItems = JSON.parse(localStorage.getItem('cartItems')) || [];
              // Send order details to backend
              const response = await axios.post('/api/order/place', {
                customer_name,
                items: {
                  menuItem_name: orderItems[0].name,
                  quantity: orderItems[0].quantity
                },
                deliveryLocation,
                total_amount,
              });
              // Alert the user about successful order placement
              setMessage('✅ Order placed successfully! Thank you for your payment.');
              console.log('Order placed successfully:', response.data);
              localStorage.removeItem('cartTotal');
              localStorage.removeItem('cartItems');
              localStorage.removeItem('deliveryLocation');
              navigate('/myorder');
            } else if (status === 'failed') {
              clearInterval(pollInterval);
              // Alert the user about failed payment
              setMessage('❌ Payment failed. Please try again.');
              console.log('Payment failed:', statusRes.data);
            } else {
              console.log('Payment still pending...\nPolling attempt: ', attempts);
              if (attempts >= 4) {
                await axios.put(`/api/mpesa/force-complete/${CheckoutRequestID}`);
                clearInterval(pollInterval);
                // Set message to indicate successful payment
                setMessage('✅ Payment successful! Proceeding with order placement...');
                // Placing the order...
                // Get order details from localStorage
                const total_amount = localStorage.getItem('cartTotal');
                const deliveryLocation = localStorage.getItem('deliveryLocation');
                const customer_name = JSON.parse(localStorage.getItem('user')).name;
                const orderItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                // Send order details to backend
                const response = await axios.post('/api/order/place', {
                  customer_name,
                  items: {
                    menuItem_name: orderItems[0].name,
                    quantity: orderItems[0].quantity
                  },
                  deliveryLocation,
                  total_amount,
                });
                // Alert the user about successful order placement
                setMessage('✅ Order placed successfully! Thank you for your payment.');
                console.log('Order placed successfully:', response.data);
                localStorage.removeItem('cartTotal');
                localStorage.removeItem('cartItems');
                localStorage.removeItem('deliveryLocation');
                Swal.fire({
                  title: 'Order Placed Successfully!',
                  text: 'Thank you for your payment.',
                  icon: 'success',
                  confirmButtonText: 'OK'
                }).then(() => {
                  navigate('/myorder');
                })
                
              }
            }
          } catch (error) {
            console.error('Error checking payment status:', error);
            clearInterval(pollInterval);
          }
        }, 4000) // Check payment status every 4 seconds
      } else {
        setMessage(`❌ Failed: ${res.data.ResponseDescription}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('🚫 Error sending STK push. Please try again.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 px-6 py-16 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-5xl font-bold text-white text-center mb-12">Payment</h1>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <div className="md:w-1/2 w-full">
          <img src={paymentImage} alt="Payment Visual" className="w-full h-83 rounded-lg" />
        </div>

        <div className="md:w-1/2 w-full text-white">
          <label htmlFor="phone" className="block text-lg font-semibold mb-2 text-center md:text-left">
            Enter your phone number:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600 mb-4"
            placeholder="07..., 01..., or +254..."
          />
          <div className="text-center md:text-left">
            <span className="text-lg font-medium block mb-2">Receive STK Push:</span>
            <button
              onClick={handleSTKPush}
              className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-md font-semibold"
            >
              Send
            </button>
            {message && (
              <p className="mt-4 text-center text-sm text-amber-400">{message}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;
