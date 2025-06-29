import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminAnalytics = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/admin/analytics');
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError('⚠️ Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">📊 Admin Analytics</h1>

      {loading ? (
        <div className="text-center text-gray-400">Loading analytics...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-gray-800 p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">👥 Total Users</h2>
            <p className="text-5xl font-bold text-amber-500">{data.totalUsers}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-gray-800 p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">🛒 Total Orders</h2>
            <p className="text-5xl font-bold text-amber-500">{data.totalOrders}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-gray-800 p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">💰 Revenue</h2>
            <p className="text-4xl font-bold text-amber-500">
              Ksh {(data.revenue ?? 0).toLocaleString()}
            </p>

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
