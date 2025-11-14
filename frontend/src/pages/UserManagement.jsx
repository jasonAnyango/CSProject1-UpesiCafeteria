import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import {
  GaugeCircle,
  Users2,
  Menu,
  MapPin,
  MessageCircle
} from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data.data);
    } catch (error) {
      console.error('❌ Failed to fetch users:', error);
    }
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete User?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('❌ Error deleting user:', error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          <Link to="/admin" className="flex items-center gap-3 hover:text-amber-500">
            <GaugeCircle className="w-5 h-5" />{sidebarOpen && 'Dashboard'}
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 text-amber-500 font-semibold">
            <Users2 className="w-5 h-5" />{sidebarOpen && 'Users'}
          </Link>
          <Link to="/admin/deliveryLocation" className="flex items-center gap-3 hover:text-amber-500">
            <MapPin className="w-5 h-5" />{sidebarOpen && 'Delivery Locations'}
          </Link>
          <Link to="/admin/feedback" className="flex items-center gap-3 hover:text-amber-500">
            <MessageCircle className="w-5 h-5" />{sidebarOpen && 'Feedback'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">👥 All Users</h1>
          <Link
            to="/admin/users/add"
            className="bg-amber-700 px-4 py-2 rounded hover:bg-amber-800 text-white"
          >
            ➕ Add User
          </Link>
        </div>

        <table className="w-full mt-4 text-left border-collapse">
          <thead>
            <tr className="text-amber-500 border-b border-gray-700">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserManagement;
