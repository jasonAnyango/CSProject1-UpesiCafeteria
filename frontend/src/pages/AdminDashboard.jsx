import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const adminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/admin/users" className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
                    <h2 className="text-xl font-semibold">Manage Users</h2>
                    <p className="text-sm text-gray-400">View, add or delete system users</p>
                </Link>

                <Link to="/admin/analytics" className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700">
                    <h2 className="text-xl font-semibold">Analytics</h2>
                    <p className="text-sm text-gray-400">Track orders, payments and usage</p>
                </Link>
            </div>
        </div>
    )
}

export default adminDashboard;