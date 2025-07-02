import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchRecentUsers = async () => {
            try {
                // Fetch recent users from the backend
                const res = await axios.get('http://localhost:5000/api/admin/recent-users');
                setUsers(res.data.data);
                console.log('Recent users:', res.data.data);
            } catch (error) {
                console.error('Error fetching recent users:', error);
            }
        }
        fetchRecentUsers();
    })
    

    return (
        <div className='shadow-md p-4 w-full'>
            <h2 className="text-lg font-semibold mb-3">
                Recent Users
            </h2>
            <ul className="divide-y max-h-80 overflow-y-auto">
                {users.map(user => (
                    <li key={user._id} className='py-3'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{user.name}</span>
                            <span className='text-sm text-gray-600'>{user.email}</span>
                            <span className='text-xs text-gray-400'>Registered on: {new Date(user.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                                })}</span>
                        </div>
                    </li>
                ))}
                {users.length === 0 && (
                    <li className='py-3 text-center text-gray-500'>No recent users found.</li>
                )}
            </ul>
        </div>
    )
}

export default RecentUsers;