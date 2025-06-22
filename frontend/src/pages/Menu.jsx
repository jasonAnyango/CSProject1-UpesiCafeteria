// src/pages/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import dish1 from '../assets/homeImage8.png';

const menuItems = [
  {
    name: 'Spicy Chicken Pilau',
    image: dish1,
    description: 'Fragrant rice dish simmered with tender chicken, cloves, cardamom, and cumin for a bold East African flavor.',
    status: 'Available',
    price: 'KES 450'
  },
  {
    name: 'Chapati Beef Wrap',
    image: dish1,
    description: 'Thin, soft chapati wrapped around slow-cooked beef and fresh veggies with a touch of chili sauce.',
    status: 'Available',
    price: 'KES 350'
  },
  {
    name: 'Grilled Veggie Bowl',
    image: dish1,
    description: 'A medley of seasoned, grilled vegetables served over brown rice and topped with tangy vinaigrette.',
    status: 'Available',
    price: 'KES 400'
  },
  {
    name: 'Matoke with Peanut Sauce',
    image: dish1,
    description: 'Steamed plantains drenched in creamy peanut sauce, a traditional Ugandan comfort dish.',
    status: 'Unavailable',
    price: 'KES 300'
  },
  {
    name: 'Mandazi & Chai Combo',
    image: dish1,
    description: 'Sweet fried dough pastries paired perfectly with spicy, creamy Kenyan chai.',
    status: 'Available',
    price: 'KES 200'
  },
  {
    name: 'Tilapia Ugali Plate',
    image: dish1,
    description: 'Grilled tilapia fillet served with soft ugali and sukuma wiki, a classic coastal favorite.',
    status: 'Available',
    price: 'KES 500'
  },
  {
    name: 'Beef Stew & Rice',
    image: dish1,
    description: 'Hearty beef chunks cooked in tomato and onion sauce, served with fluffy white rice.',
    status: 'Available',
    price: 'KES 400'
  },
  {
    name: 'Vegetarian Samosas',
    image: dish1,
    description: 'Crispy triangles filled with spiced potatoes, peas, and carrots, great for snacking or sides.',
    status: 'Available',
    price: 'KES 150'
  },
  {
    name: 'Breakfast Combo Plate',
    image: dish1,
    description: 'Includes eggs, sausages, toast, and grilled tomatoes with optional beans or avocado.',
    status: 'Available',
    price: 'KES 350'
  },
  {
    name: 'Fried Rice with Sausages',
    image: dish1,
    description: 'Flavorful fried rice stir-fried with sliced sausages, vegetables, and a hint of soy sauce.',
    status: 'Available',
    price: 'KES 300'
  },
];

const Menu = () => {
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
              image: item.image,
              description: item.description,
              status: item.status,
              price: item.price,
            }}
            key={index}
          >
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:bg-gray-700 transition duration-300 cursor-pointer p-4 gap-4">
              <div className="md:w-1/4 w-full h-60 md:h-auto">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
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
