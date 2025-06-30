// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
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
} from 'lucide-react';

const trafficData = [
  { name: 'Direct', value: 45 },
  { name: 'Referral', value: 25 },
  { name: 'Social', value: 15 },
  { name: 'Ads', value: 15 },
];

const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

const salesDataSamples = {
  Daily: [
    { name: 'Mon', sales: 1200 },
    { name: 'Tue', sales: 900 },
    { name: 'Wed', sales: 1400 },
    { name: 'Thu', sales: 1000 },
    { name: 'Fri', sales: 1600 },
    { name: 'Sat', sales: 800 },
    { name: 'Sun', sales: 700 },
  ],
  Weekly: [
    { name: 'W1', sales: 6500 },
    { name: 'W2', sales: 7200 },
    { name: 'W3', sales: 8100 },
    { name: 'W4', sales: 7900 },
  ],
  Yearly: [
    { name: 'Jan', sales: 28000 },
    { name: 'Feb', sales: 31000 },
    { name: 'Mar', sales: 34000 },
    { name: 'Apr', sales: 33000 },
    { name: 'May', sales: 35500 },
    { name: 'Jun', sales: 37000 },
    { name: 'Jul', sales: 39000 },
    { name: 'Aug', sales: 40000 },
    { name: 'Sep', sales: 38000 },
    { name: 'Oct', sales: 36000 },
    { name: 'Nov', sales: 41000 },
    { name: 'Dec', sales: 45000 },
  ],
};

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
  const [range, setRange] = useState('Daily');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentMonthEarnings = 'KES 92,450';
  const currentMonthSales = '1,325';

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
          <a href="#dashboard" className="flex items-center gap-3 text-amber-500 font-semibold">
            <GaugeCircle className="w-5 h-5" />{sidebarOpen && 'Dashboard'}
          </a>
          <a href="#users" className="flex items-center gap-3 hover:text-amber-500">
            <Users2 className="w-5 h-5" />{sidebarOpen && 'Users'}
          </a>
          <a href="#notifications" className="flex items-center gap-3 hover:text-amber-500">
            <Bell className="w-5 h-5" />{sidebarOpen && 'Notifications'}
          </a>
          <a href="#reports" className="flex items-center gap-3 hover:text-amber-500">
            <BarChart2 className="w-5 h-5" />{sidebarOpen && 'Reports'}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        {/* Top KPIs */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h2 className="text-4xl font-bold">{currentMonthEarnings}</h2>
            <p className="text-gray-400">Current Month Earnings</p>
            <h2 className="text-3xl font-bold">{currentMonthSales}</h2>
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
                <option>Daily</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesDataSamples[range]}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {analytics.map((a, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
              <div className="p-2 bg-gray-700 rounded-full">{a.icon}</div>
              <div>
                <h4 className="text-lg font-semibold">{a.value}</h4>
                <p className="text-gray-400 text-sm">{a.label}</p>
              </div>
            </div>
          ))}
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
