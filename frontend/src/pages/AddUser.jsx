import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import {
  GaugeCircle,
  Users2,
  Menu,
  MapPin
} from 'lucide-react';

const AddUser = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Staff' });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/users', form);
      Swal.fire('✅ Success', 'User created successfully', 'success');
      setForm({ name: '', email: '', password: '', role: 'Staff' }); // Reset form
    } catch (err) {
      Swal.fire('❌ Error', err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white mt-5">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 p-6 transition-all duration-300 space-y-10 hidden md:block`}>
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${!sidebarOpen && 'hidden'}`}>Administrator</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="space-y-6 mt-6">
          <Link to="/administrator" className="flex items-center gap-3 hover:text-amber-500">
            <GaugeCircle className="w-5 h-5" />{sidebarOpen && 'Dashboard'}
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 text-amber-500 font-semibold">
            <Users2 className="w-5 h-5" />{sidebarOpen && 'Users'}
          </Link>
          <Link to="/admin/deliveryLocation" className="flex items-center gap-3 hover:text-amber-500">
            <MapPin className="w-5 h-5" />{sidebarOpen && 'Delivery Locations'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">➕ Add New User</h1>
          <Link
            to="/admin/users"
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            ← Back to Users
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
          >
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-amber-700 px-4 py-2 rounded hover:bg-amber-800 transition"
          >
            Create User
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddUser;
