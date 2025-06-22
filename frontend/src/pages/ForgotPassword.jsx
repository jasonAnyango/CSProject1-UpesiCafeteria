import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/homeImage.png';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/auth/request-reset', { email });

            Swal.fire({
                title: 'OTP Sent!',
                text: 'Check your email to continue password reset.',
                icon: 'success'
            });

            navigate('/verify-reset-otp', { state: { email } });

        } catch (error) {
            Swal.fire({
                title: 'Error',
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
                    <img src={loginImage} alt="Reset Password Visual" className="h-full w-full object-cover" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-3/4 flex items-center justify-center p-8 bg-gray-800 text-white">
                    <div className="w-full max-w-md space-y-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-amber-800">🍽️</div>
                            <h2 className="text-2xl font-semibold mt-2 text-white">Upesi Cafeteria</h2>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-md"
                                required
                            />

                            <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-md font-semibold">
                                Send OTP
                            </button>

                            <p className="text-center text-sm text-white">
                                Remember your password?{' '}
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

export default ForgotPassword;
