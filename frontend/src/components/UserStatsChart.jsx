import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#FF8042']; // Green and orange colors for the pie chart

const UserStatsChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch user statistics from the backend
                const res = await axios.get('http://localhost:5000/api/admin/user-stats');
                // Destructure the response to get active and inactive users
                const { activeUsers, inactiveUsers } = res.data;
                // Prepare the data for the pie chart
                setData([
                    { name: 'Active Users', value: activeUsers },
                    { name: 'Inactive Users', value: inactiveUsers }
                ]);
            } catch (error) {
                // Log the error
                console.error('Error fetching user stats:', error);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="w-full flex flex-col items-center px-10">
            <h2 className="text-xl font-semibold mb-4">
                User Activity Overview
            </h2>
            <PieChart width={300} height={300}>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill='#8884d8'
                paddingAngle={5}
                dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign='bottom'/>
            </PieChart>
        </div>
    )
}

export default UserStatsChart