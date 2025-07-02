// src/pages/StaffDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Bell,
  ClipboardList,
  Boxes,
  Menu as MenuIcon,
} from 'lucide-react';

const StaffDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();           // <-- to detect current path

  /* helper to decide active style */
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-900 text-white mt-5">
      {/* ░░ Sidebar ░░ */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 p-6 transition-all duration-300 space-y-10 hidden md:block`}
      >
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${!sidebarOpen && 'hidden'}`}>
            Staff
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="space-y-6 mt-6">
          <Link
            to="/staff"
            className={`flex items-center gap-3 ${
              isActive('/staff')
                ? 'text-amber-500 font-semibold'
                : 'hover:text-amber-500'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            {sidebarOpen && 'Dashboard'}
          </Link>

          <Link
            to="/staff/orders"
            className={`flex items-center gap-3 ${
              isActive('/staff/orders')
                ? 'text-amber-500 font-semibold'
                : 'hover:text-amber-500'
            }`}
          >
            <Boxes className="w-5 h-5" />
            {sidebarOpen && 'Manage Orders'}
          </Link>

          <Link
            to="/staff/menu"
            className={`flex items-center gap-3 ${
              isActive('/staff/menu')
                ? 'text-amber-500 font-semibold'
                : 'hover:text-amber-500'
            }`}
          >
            <Bell className="w-5 h-5" />
            {sidebarOpen && 'Manage Menu'}
          </Link>
        </nav>
      </aside>

      {/* ░░ Main Panel ░░ */}
      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center">
          Cafeteria Staff Dashboard
        </h1>
        <Outlet />   {/* nested route renders here */}
      </main>
    </div>
  );
};

export default StaffDashboard;