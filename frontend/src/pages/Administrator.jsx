// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  GaugeCircle,
  Users2,
  Bell,
  BarChart2,
  Menu,
  MapPin
} from 'lucide-react';

const trafficData = [
  { name: 'Direct', value: 45 },
  { name: 'Referral', value: 25 },
  { name: 'Social', value: 15 },
  { name: 'Ads', value: 15 },
];

const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

const analytics = [
  { label: 'Page Views', value: '24.6K', icon: <GaugeCircle className="w-5 h-5" /> },
  { label: 'Revenue', value: 'KES 92,450', icon: <BarChart2 className="w-5 h-5" /> },
  { label: 'New Users', value: '1,204', icon: <Users2 className="w-5 h-5" /> },
  { label: 'Bounce Rate', value: '38%', icon: <Bell className="w-5 h-5" /> },
];

const recentActivities = [
  'Added new menu item – Tilapia Ugali Plate',
  'Updated user John Doe to Staff role',
  'Generated monthly sales report',
  'Resolved ticket #453 – Order delay',
];



const Administrator = () => {
  const [range, setRange] = useState('daily');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({});
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/admin/sales?range=${range}`)
      .then(res => res.json())
      .then(data => {
        console.log("Sales data fetched:", data);
        setSalesData(data);
      })
      .catch(err => console.error("Failed to fetch sales data", err));
  }, [range]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Failed to fetch quick stats", err));
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
          <Link href="/administrator" className="flex items-center gap-3 text-amber-500 font-semibold">
            <GaugeCircle className="w-5 h-5" />{sidebarOpen && 'Dashboard'}
          </Link>
          <Link to='/admin/users' className="flex items-center gap-3 hover:text-amber-500">
            <Users2 className="w-5 h-5" />{sidebarOpen && 'Users'}
          </Link>
          <Link to='/admin/deliveryLocation' className="flex items-center gap-3 hover:text-amber-500">
            <MapPin className="w-5 h-5" />{sidebarOpen && 'Delivery Locations'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        {/* Top KPIs */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h2 className="text-4xl font-bold">
              {stats?.revenue?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }) || 'KES 0'}
            </h2>
            <p className="text-gray-400">Current Month Earnings</p>
            <h2 className="text-3xl font-bold">
              {stats?.totalSales?.toLocaleString() || '0'}
            </h2>
            <p className="text-gray-400">Current Month Sales</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sales Overview</h3>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="bg-gray-700 p-1 rounded"
              >
                <option value={'daily'}>Daily</option>
                <option value={'weekly'}>Weekly</option>
                <option value={'yearly'}>Yearly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  formatter={(value) => `KES ${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  labelClassName="text-white"
                  itemStyle={{ color: '#FBBF24' }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#FBBF24"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Traffic Sources</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Analytics */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
            <div className="p-2 bg-gray-700 rounded-full">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold">{stats?.revenue?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }) || 'KES 0'}</h4>
              <p className="text-gray-400 text-sm">Revenue</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
            <div className="p-2 bg-gray-700 rounded-full">
              <Users2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold">{stats?.newUsers || 0}</h4>
              <p className="text-gray-400 text-sm">New Users</p>
            </div>
          </div>
        </div>


        {/* Recent Activities */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Recent Activities</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            {recentActivities.map((act, i) => (
              <li key={i}>{act}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Administrator;
