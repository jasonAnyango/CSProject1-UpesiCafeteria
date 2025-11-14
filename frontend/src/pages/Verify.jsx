// src/pages/OtpVerification.jsx
import React, { useState } from 'react';
import otpImage from '../assets/homeImage.png';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'

const OtpVerification = () => {
    // State
    const [otp, setOtp] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    // Get the user details from the sign up page
    const {name, email, password} = location.state

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/verifyOTP', {
                name,
                email,
                password,
                otp
            })

            Swal.fire({
                title: "Verification Successful",
                text: "You can now log in",
                icon: "success"
            })

            navigate('/login')
        } catch (error) {
            console.error(error.message)
            Swal.fire({
                title: "Verification Failed",
                text: error.response ? error.response.data.message : "Something went wrong",
                icon: "error"
            })
        }
    }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full max-w-6xl h-[70vh] shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-2/4 hidden md:flex">
          <img src={otpImage} alt="OTP Visual" className="h-full w-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-3/4 flex items-center justify-center p-8 bg-gray-900 text-white">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="text-4xl font-bold text-amber-800">🍽️</div>
            <h2 className="text-2xl font-semibold text-white">Verify OTP</h2>
            <p className="text-white text-sm">Enter the 6-digit code sent to your email</p>
            <form className="space-y-4" onSubmit={handleVerify}>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border rounded-md text-center tracking-widest" maxLength="6" />
              <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-md font-semibold">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OtpVerification;