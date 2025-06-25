import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';

const MyCart = () => {
  const { cartItems, addToCart, removeFromCart, removeItemCompletely, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    navigate('/checkout');
    
  };

  const handleEmptyCart = () => {
    clearCart();
    alert('Cart emptied.');
    navigate('/menu');
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
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/4 w-full h-48">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/4 w-full p-4 text-white">
                  <h2 className="text-2xl font-semibold mb-1">{item.name}</h2>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-3">{item.description}</p>
                  <p className="text-amber-500 font-bold mb-2">KES {item.price} x {item.quantity}</p>
                  <p className="font-bold mb-4">Total: KES {item.price * item.quantity}</p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                    >
                      -
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItemCompletely(item.name)}
                      className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Your cart is empty.</p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md text-white">
          <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
          <p className="text-lg mb-6">Subtotal: <span className="text-amber-500 font-bold">KES {subtotal}</span></p>
          <button
            onClick={handleCheckout}
            className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-md font-semibold mb-4"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
          <button
            onClick={handleEmptyCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold"
            disabled={cartItems.length === 0}
          >
            Empty Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyCart;
