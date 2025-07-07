import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Box, SquareMenu, Bell } from 'lucide-react'

const StaffOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/order/all')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/order/update/${orderId}`, {
        status: newStatus,
      })

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (err) {
      console.error('Failed to update order status:', err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update order status',
      })
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const statusOptions = ['pending', 'preparing', 'out for delivery', 'delivered']

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'preparing': return 'bg-blue-500'
      case 'out for delivery': return 'bg-indigo-500'
      case 'delivered': return 'bg-green-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const isActive = (path) => location.pathname === path

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

      {/* Main */}
      <main className="flex-1 p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-10 text-center md:text-left">
          📦 Staff Order Management
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-900">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {orders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-800 transition-all">
                      <td className="px-6 py-4 text-sm">{order._id}</td>
                      <td className="px-6 py-4 text-sm">{order.customer_name}</td>
                      <td className="px-6 py-4 text-sm">KES {order.total_amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} bg-opacity-70`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status} className="text-black">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default StaffOrders
