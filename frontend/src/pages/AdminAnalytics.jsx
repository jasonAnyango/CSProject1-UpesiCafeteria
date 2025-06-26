import React from 'react';

const AdminAnalytics = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl text-amber-500">58</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl text-amber-500">142</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl text-amber-500">Ksh 42,300</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
