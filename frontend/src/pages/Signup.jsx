import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImage from '../assets/homeImage.png';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
    // States
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // Prevent the default submit behavior
        e.preventDefault();

        try {
            // Post to backend
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
                confirmPassword
            })

            // Success Alert
            Swal.fire({
                title: 'OTP sent!',
                text: 'Check your email for the verification code.',
                icon:'success'
            })
            // Pass user details to OTP verification --> We'll use states
            navigate('/verify', {state: {name, email, password}})
        } catch (error) {
            Swal.fire({
                title: "Registration Failed",
                text: error.response ? error.response.data.message : "Something went wrong",
                icon: "error"
            })
        }
    }
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full max-w-4xl h-[70vh] shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-3/4 flex items-center justify-center p-8 bg-gray-800 order-2 md:order-1">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-800">🍽️</div>
              <h2 className="text-2xl font-semibold mt-2 text-white">Upesi Cafeteria</h2>
            </div>
            <form className="space-y-4 text-white" onSubmit={handleSubmit}>
                {/* Name Input */}
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md" />
                {/* Email Input */}
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md" />
                {/* Password Input */}
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md" />
                {/* Confirm Password Input */}
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-md" />
                {/* Submit button */}
              <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-md font-semibold hover:cursor-pointer">
                Sign Up
              </button>
              <p className="text-center text-sm text-white">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-800 font-medium hover:underline">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-2/4 hidden md:flex order-1 md:order-2">
          <img src={signupImage} alt="Signup Visual" className="h-full w-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;