import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/users');
    console.log(res.data);
    setUsers(res.data.data);
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
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <Link to="/admin/users/add" className="bg-amber-700 px-4 py-2 rounded hover:bg-amber-800 mb-4 inline-block">Add User</Link>

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
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
