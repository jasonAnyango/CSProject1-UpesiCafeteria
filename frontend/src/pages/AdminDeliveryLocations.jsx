import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDeliveryLocations = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLocations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/deliveryLocation');
      setLocations(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to load delivery locations.');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addLocation = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/admin/deliveryLocation', form);
      setForm({ name: '', description: '' });
      fetchLocations();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || '❌ Failed to add location');
    }
  };

  const deleteLocation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/deliveryLocation${id}`);
      fetchLocations();
    } catch (err) {
      console.error(err);
      setError('❌ Failed to delete location');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">📍 Manage Delivery Locations</h1>

      {/* Form */}
      <form
        onSubmit={addLocation}
        className="bg-gray-800 p-6 rounded-xl shadow-md mb-12 max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">➕ Add New Location</h2>
        <input
          type="text"
          name="name"
          placeholder="Location Name"
          value={form.name}
          onChange={handleInput}
          className="w-full p-3 mb-4 rounded text-gray-800 bg-gray-500"
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleInput}
          className="w-full p-3 mb-4 rounded text-gray-800 bg-gray-500"
        />
        <button
          type="submit"
          className="bg-amber-500 px-6 py-2 rounded hover:bg-amber-600 transition"
        >
          Add Location
        </button>
        {error && <p className="text-red-400 mt-3">{error}</p>}
      </form>

      {/* Location Cards */}
      {loading ? (
        <p className="text-center text-gray-400">Loading delivery locations...</p>
      ) : locations.length === 0 ? (
        <p className="text-center text-gray-400">No locations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {locations.map((location) => (
            <div
              key={location._id}
              className="bg-gray-800 p-6 rounded-xl shadow relative hover:shadow-amber-500/30 transition"
            >
              <h3 className="text-xl font-semibold">{location.name}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {location.description || 'No description'}
              </p>
              <button
                onClick={() => deleteLocation(location._id)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-lg"
                title="Delete"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDeliveryLocations;
