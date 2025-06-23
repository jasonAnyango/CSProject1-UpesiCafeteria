// src/pages/MyCart.jsx
import React from 'react';
import { motion } from 'framer-motion';
import dish1 from '../assets/homeImage.png';

const cartItems = [
  {
    name: 'Spicy Chicken Pilau',
    image: dish1,
    description: 'Fragrant rice dish simmered with tender chicken, cloves, and cumin.',
    price: 450,
  },
  {
    name: 'Chapati Beef Wrap',
    image: dish1,
    description: 'Soft chapati filled with savory beef and crunchy veggies.',
    price: 350,
  },
  {
    name: 'Grilled Veggie Bowl',
    image: dish1,
    description: 'A healthy mix of grilled seasonal vegetables over rice.',
    price: 400,
  },
];

const MyCart = () => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  const handleEmptyCart = () => {
    alert('Cart emptied.');
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 px-6 py-16 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold text-white text-center mb-10">My Cart</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/4 w-full h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/4 w-full p-4 text-white">
                <h2 className="text-2xl font-semibold mb-1">{item.name}</h2>
                <p className="text-gray-300 text-sm mb-2 line-clamp-3">{item.description}</p>
                <p className="text-amber-500 font-bold">KES {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md text-white">
          <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
          <p className="text-lg mb-6">Subtotal: <span className="text-amber-500 font-bold">KES {subtotal}</span></p>
          <button
            onClick={handleCheckout}
            className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-md font-semibold mb-4"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={handleEmptyCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold"
          >
            Empty Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyCart;
