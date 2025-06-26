import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUser = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Staff' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/user', form);
      Swal.fire('Success', 'User created successfully', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="name" type="text" placeholder="Name" required onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
        <select name="role" onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700">
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="bg-amber-700 px-4 py-2 rounded hover:bg-amber-800">
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
