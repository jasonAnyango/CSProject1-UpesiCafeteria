import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Box, SquareMenu, Bell } from 'lucide-react'

const StaffMenu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    category: ''
  })
  const [editingItemId, setEditingItemId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu/')
      setMenuItems(response.data)
    } catch (err) {
      console.error('Error fetching menu items:', err)
      setError('Failed to fetch menu items')
    } finally {
      setLoading(false)
    }
  }

  const handleAvailabilityToggle = async (item) => {
    try {
      const updated = { ...item, available: !item.available }
      await axios.put(`http://localhost:5000/api/menu/${item._id}`, updated)
      setMenuItems(prev =>
        prev.map(m => m._id === item._id ? updated : m)
      )
    } catch (err) {
      console.error('Error toggling availability:', err)
      Swal.fire('Error', 'Failed to update availability', 'error')
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItemId) {
        await axios.put(`http://localhost:5000/api/menu/${editingItemId}`, formData)
        Swal.fire('Success', 'Menu item updated', 'success')
      } else {
        await axios.post('http://localhost:5000/api/menu/', formData)
        Swal.fire('Success', 'Menu item added', 'success')
      }
      setFormData({ name: '', price: '', description: '', image_url: '', category: '' })
      setEditingItemId(null)
      fetchMenuItems()
    } catch (err) {
      console.error('Error submitting form:', err)
      Swal.fire('Error', 'Failed to save menu item', 'error')
    }
  }

  const handleEdit = (item) => {
    setFormData(item)
    setEditingItemId(item._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    fetchMenuItems()
  }, [])

  return (
    <div className="min-h-screen flex bg-gray-900 text-white mt-5">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 p-6 space-y-10 transition-all duration-300 hidden md:block`}
      >
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${!sidebarOpen && 'hidden'}`}>Staff</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="space-y-6 mt-6">
          <Link
            to="/staff"
            className={`flex items-center gap-3 font-semibold ${
              isActive('/staff') ? 'text-amber-500' : 'hover:text-amber-500'
            }`}
          >
            <Box className="w-5 h-5" />
            {sidebarOpen && 'Dashboard'}
          </Link>

          <Link
            to="/staff/orders"
            className={`flex items-center gap-3 ${
              isActive('/staff/orders') ? 'text-amber-500' : 'hover:text-amber-500'
            }`}
          >
            <Bell className="w-5 h-5" />
            {sidebarOpen && 'Manage Orders'}
          </Link>

          <Link
            to="/staff/menu"
            className={`flex items-center gap-3 ${
              isActive('/staff/menu') ? 'text-amber-500' : 'hover:text-amber-500'
            }`}
          >
            <SquareMenu className="w-5 h-5" />
            {sidebarOpen && 'Manage Menu'}
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-10 text-center md:text-left">🍽️ Menu Management</h1>

        {/* Form */}
        <div className="max-w-xl mx-auto mb-10 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{editingItemId ? 'Edit' : 'Add'} Menu Item</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {['name', 'price', 'description', 'image_url', 'category'].map(field => (
              <input
                key={field}
                type={field === 'price' ? 'number' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field] || ''}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required={['name', 'price', 'category'].includes(field)}
                className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
              />
            ))}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold">
              {editingItemId ? 'Update' : 'Add'} Item
            </button>
          </form>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto max-w-6xl mx-auto">
            <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Availability</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {menuItems.map(item => (
                  <tr key={item._id} className="hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <img src={item.image_url || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">KES {item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${item.available ? 'bg-green-600' : 'bg-red-600'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button onClick={() => handleEdit(item)} className="bg-yellow-500 px-3 py-1 rounded text-sm hover:bg-yellow-600">
                        Edit
                      </button>
                      <button onClick={() => handleAvailabilityToggle(item)} className="bg-purple-600 px-3 py-1 rounded text-sm hover:bg-purple-700">
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default StaffMenu
