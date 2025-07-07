// src/components/FeedbackList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MessageCircle,
  Menu,
  GaugeCircle,
  Users2,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeedbackList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [feedback, setFeedback]       = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base =
          import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const res = await axios.get(`${base}/api/feedback`);
        setFeedback(res.data.feedback || res.data);
      } catch (err) {
        console.error('Failed to fetch feedback', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

//   if (loading)        return <p className="p-6">Loading feedback…</p>;
//   if (!feedback.length) return <p className="p-6">No feedback yet.</p>;

  return (
    <div className="min-h-screen flex bg-gray-900 text-white mt-5">
      {/* ── Sidebar ── */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 p-6 transition-all duration-300 space-y-10 hidden md:block`}
      >
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${!sidebarOpen && 'hidden'}`}>
            Administrator
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="space-y-6 mt-6">
            <Link to="/admin" className="flex items-center gap-3 hover:text-amber-500">
            <GaugeCircle className="w-5 h-5" />{sidebarOpen && 'Dashboard'}
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 hover:text-amber-500">
            <Users2 className="w-5 h-5" />{sidebarOpen && 'Users'}
            </Link>
            <Link to="/admin/deliveryLocation" className="flex items-center gap-3 hover:text-amber-500">
            <MapPin className="w-5 h-5" />{sidebarOpen && 'Delivery Locations'}
            </Link>
            <Link to="/admin/feedback" className="flex items-center gap-3 text-amber-500 text-semibold">
            <MessageCircle className="w-5 h-5" />{sidebarOpen && 'Feedback'}
            </Link>
        </nav>
      </aside>

      {/* Content pane */}
      <main className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">User Feedback</h2>

        {/* Column of cards */}
        <div className="flex flex-col space-y-4">
          {feedback.map((f) => (
            <div
              key={f._id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-amber-500" />
                <h4 className="font-semibold">{f.name}</h4>
                <span className="text-sm text-gray-400">({f.email})</span>
                <span className="ml-auto text-xs text-gray-400">
                  {new Date(f.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300">{f.message}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/* helper for sidebar items */
const SidebarLink = ({ to, icon, label, active, sidebarOpen }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 hover:text-amber-500 ${
      active ? 'text-amber-500 font-semibold' : ''
    }`}
  >
    {React.cloneElement(icon, { className: 'w-5 h-5' })}
    {sidebarOpen && label}
  </Link>
);

export default FeedbackList;
