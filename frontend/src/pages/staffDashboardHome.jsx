import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const StaffDashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, trendRes] = await Promise.all([
          axios.get('http://localhost:5000/api/staff/summary'),
          axios.get('http://localhost:5000/api/staff/orderTrend?days=7'),
        ]);
        setSummary(summaryRes.data);
        setTrend(trendRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading…</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const { totalOrdersToday, ordersDeliveredToday, statusCountsToday } = summary;

  return (
    <section className="space-y-10">
      {/* ░░ Top Row ░░ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <p className="text-sm text-gray-400 mb-2">Total Orders Today</p>
          <h2 className="text-4xl font-bold text-amber-400">{totalOrdersToday}</h2>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-sm text-gray-400 mb-2 text-center">Order Trend</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={trend}>
              <CartesianGrid strokeOpacity={0.1} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#facc15"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <p className="text-sm text-gray-400 mb-2">Orders Delivered</p>
          <h2 className="text-4xl font-bold text-green-400">{ordersDeliveredToday}</h2>
        </div>
      </div>

      {/* ░░ Order Status Cards ░░ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending', key: 'pending', color: 'bg-yellow-500' },
          { label: 'Preparing', key: 'preparing', color: 'bg-blue-500' },
          { label: 'Out for Delivery', key: 'out for delivery', color: 'bg-indigo-500' },
          { label: 'Delivered', key: 'delivered', color: 'bg-green-500' },
        ].map(({ label, key, color }) => (
          <div
            key={key}
            className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col items-center"
          >
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <span
              className={`text-xl font-bold text-white px-4 py-2 rounded-full ${color}`}
            >
              {statusCountsToday[key] ?? 0}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffDashboardHome;
