import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box, SquareMenu } from 'lucide-react'

const StaffDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-10 text-center">Staff Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Manage Orders Card */}
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Link
                        to="/staff/orders"
                        className="flex items-center gap-4 bg-gray-800 p-6 rounded-2xl shadow-lg hover:bg-gray-700 transition duration-300"
                    >
                        <span className="w-10 h-10 text-blue-400"><Box /></span>
                        <div>
                            <h2 className="text-2xl font-semibold">Manage Orders</h2>
                            <p className="text-sm text-gray-400">View and update order statuses</p>
                        </div>
                    </Link>
                </motion.div>
                {/* Manage Menu Card */}
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Link
                        to="/staff/menu"
                        className="flex items-center gap-4 bg-gray-800 p-6 rounded-2xl shadow-lg hover:bg-gray-700 transition duration-300"
                    >
                        <span className="w-10 h-10 text-blue-400"><SquareMenu /></span>
                        <div>
                            <h2 className="text-2xl font-semibold">Manage Menu</h2>
                            <p className="text-sm text-gray-400">View and update menu items</p>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default StaffDashboard;