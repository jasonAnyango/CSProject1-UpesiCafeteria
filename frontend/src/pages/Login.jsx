import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../assets/homeImage.png';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full max-w-6xl h-[70vh] shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-2/4 hidden md:flex">
          <img src={loginImage} alt="Login Visual" className="h-full w-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-3/4 flex items-center justify-center p-8 bg-gray-800 text-white">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-800">🍽️</div>
              <h2 className="text-2xl font-semibold mt-2 text-white">Upesi Cafeteria</h2>
            </div>
            <form className="space-y-4">
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-md" />
              <input type="password" placeholder="Password" className="w-full p-3 border rounded-md" />
              <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-md font-semibold">
                Log In
              </button>
              <p className="text-center text-sm text-white">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-amber-800 font-medium hover:underline">
                  Create One
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;