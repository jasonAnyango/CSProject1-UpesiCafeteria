// src/pages/Menu.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import dish1 from '../assets/homeImage8.png';

const Menu = () => {
  const [ menuItems, setMenuItems] = useState([])
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    }

    fetchMenuItems();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-900 px-6 py-16 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Our Menu</h1>
      <div className="flex flex-col gap-10">
        {menuItems.map((item, index) => (
          <Link
            to="/itemDetail"
            state={{
              name: item.name,
              image_url: item.image_url,
              description: item.description,
              available: item.available,
              price: item.price,
            }}
            key={index}
          >
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:bg-gray-700 transition duration-300 cursor-pointer p-4 gap-4">
              <div className="md:w-1/4 w-full h-60 md:h-auto">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-md" />
              </div>
              <div className="md:w-3/4 w-full text-white flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-300 text-sm line-clamp-3">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Menu;
