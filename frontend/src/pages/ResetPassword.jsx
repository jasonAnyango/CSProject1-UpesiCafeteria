// ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../assets/homeImage.png';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = location.state;

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match.',
                icon: 'error'
            });
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/reset-password', { email, newPassword });

            Swal.fire({
                title: 'Password Reset Successful!',
                text: 'You can now log in with your new password.',
                icon: 'success'
            });

            navigate('/login');

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

                        <form className="space-y-4" onSubmit={handleReset}>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-3 border rounded-md"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 border rounded-md"
                                required
                            />

                            <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-md font-semibold">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResetPassword;
