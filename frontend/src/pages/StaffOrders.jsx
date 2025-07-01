import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const StaffOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const statusOptions = ['pending', 'preparing', 'out for delivery', 'delivered', 'cancelled']

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

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white">📦 Staff Order Management</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="rounded-xl overflow-hidden shadow-xl bg-gray-900">
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
    </div>
  )
}

export default StaffOrders
