// VerifyResetOtp.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginImage from '../assets/homeImage.png';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const VerifyResetOtp = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = location.state; // Email passed from forgot password page

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            // Send OTP to backend for verification
            await axios.post('http://localhost:5000/api/auth/verify-reset-otp', { email, otp });

            Swal.fire({
                title: 'OTP Verified!',
                text: 'Proceed to set a new password.',
                icon: 'success'
            });

            navigate('/reset-password', { state: { email } }); // Pass email to reset password page

        } catch (error) {
            Swal.fire({
                title: 'Verification Failed',
                text: error.response ? error.response.data.message : 'Something went wrong.',
                icon: 'error'
            });
        }
    };

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
                    <img src={loginImage} alt="Verify OTP Visual" className="h-full w-full object-cover" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-3/4 flex items-center justify-center p-8 bg-gray-800 text-white">
                    <div className="w-full max-w-md space-y-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-amber-800">🍽️</div>
                            <h2 className="text-2xl font-semibold mt-2 text-white">Upesi Cafeteria</h2>
                        </div>

                        <form className="space-y-4" onSubmit={handleVerify}>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-3 border rounded-md"
                                required
                            />

                            <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-md font-semibold">
                                Verify OTP
                            </button>

                            <p className="text-center text-sm text-white">
                                Back to{' '}
                                <Link to="/login" className="text-amber-800 font-medium hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default VerifyResetOtp;
