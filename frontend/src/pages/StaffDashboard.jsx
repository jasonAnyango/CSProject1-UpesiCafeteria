// src/pages/StaffDashboard.jsx
import React, { useState } from 'react';
import {
  Bell,
  ClipboardList,
  Boxes,
  Menu,
  Clock4,
  CheckCircle2,
  Flame,
  PackageCheck,
} from 'lucide-react';

const dummyOrders = [
  {
    id: 1,
    customer: 'Alice W.',
    items: ['Chapati Beef Wrap x2', 'Mango Juice x1'],
    status: 'Pending',
    time: '10:32 AM',
  },
  {
    id: 2,
    customer: 'Brian M.',
    items: ['Matoke x1', 'Soda x1'],
    status: 'Preparing',
    time: '10:45 AM',
  },
  {
    id: 3,
    customer: 'Jane K.',
    items: ['Grilled Veggie Bowl x1'],
    status: 'Ready',
    time: '11:00 AM',
  },
];

const statusColors = {
  Pending: 'text-yellow-400',
  Preparing: 'text-orange-400',
  Ready: 'text-green-400',
  Completed: 'text-emerald-500',
};

const buttonColors = {
  Pending: 'bg-yellow-700 hover:bg-yellow-800',
  Preparing: 'bg-orange-700 hover:bg-orange-800',
  Ready: 'bg-green-700 hover:bg-green-800',
  Completed: 'bg-emerald-700 hover:bg-emerald-800',
};

const StaffDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState(dummyOrders);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white mt-5">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 p-6 transition-all duration-300 space-y-10 hidden md:block`}>
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${!sidebarOpen && 'hidden'}`}>Staff</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="space-y-6 mt-6">
          <a href="#dashboard" className="flex items-center gap-3 text-amber-500 font-semibold">
            <ClipboardList className="w-5 h-5" />{sidebarOpen && 'Dashboard'}
          </a>
          <a href="#inventory" className="flex items-center gap-3 hover:text-amber-500">
            <Boxes className="w-5 h-5" />{sidebarOpen && 'Inventory'}
          </a>
          <a href="#notifications" className="flex items-center gap-3 hover:text-amber-500">
            <Bell className="w-5 h-5" />{sidebarOpen && 'Notifications'}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        <h1 className="text-4xl font-bold text-white text-center">Cafeteria Staff Dashboard</h1>

        {/* Status Summary */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Clock4 className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-lg font-semibold">Pending Orders</p>
            <p className="text-2xl">{orders.filter(o => o.status === 'Pending').length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Flame className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-lg font-semibold">Preparing</p>
            <p className="text-2xl">{orders.filter(o => o.status === 'Preparing').length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <PackageCheck className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-lg font-semibold">Ready</p>
            <p className="text-2xl">{orders.filter(o => o.status === 'Ready').length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2" />
            <p className="text-lg font-semibold">Completed</p>
            <p className="text-2xl">{orders.filter(o => o.status === 'Completed').length}</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-700 p-4 rounded-md space-y-2 border-l-4 border-amber-500"
              >
                <p><span className="font-bold">Customer:</span> {order.customer} ({order.time})</p>
                <p><span className="font-bold">Items:</span> {order.items.join(', ')}</p>
                <p>
                  <span className="font-bold">Status:</span>{' '}
                  <span className={statusColors[order.status]}>{order.status}</span>
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {['Pending', 'Preparing', 'Ready', 'Completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(order.id, status)}
                      className={`${buttonColors[status]} text-sm px-3 py-1 rounded`}
                    >
                      Mark as {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
