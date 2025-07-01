import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, BarChart2, MapPin } from 'lucide-react'; // ✅ Add MapPin icon

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Link
            to="/admin/users"
            className="flex items-center gap-4 bg-gray-800 p-6 rounded-2xl shadow-lg hover:bg-gray-700 transition duration-300"
          >
            <Users className="w-10 h-10 text-blue-400" />
            <div>
              <h2 className="text-2xl font-semibold">Manage Users</h2>
              <p className="text-sm text-gray-400">View, add or delete system users</p>
            </div>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Link
            to="/admin/analytics"
            className="flex items-center gap-4 bg-gray-800 p-6 rounded-2xl shadow-lg hover:bg-gray-700 transition duration-300"
          >
            <BarChart2 className="w-10 h-10 text-green-400" />
            <div>
              <h2 className="text-2xl font-semibold">Analytics</h2>
              <p className="text-sm text-gray-400">Track orders, payments and usage</p>
            </div>
          </Link>
        </motion.div>

        {/* Link to Delivery Locations */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Link
            to="/admin/deliveryLocation"
            className="flex items-center gap-4 bg-gray-800 p-6 rounded-2xl shadow-lg hover:bg-gray-700 transition duration-300"
          >
            <MapPin className="w-10 h-10 text-amber-400" />
            <div>
              <h2 className="text-2xl font-semibold">Delivery Locations</h2>
              <p className="text-sm text-gray-400">Manage delivery zones and addresses</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
