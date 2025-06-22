// src/pages/Menu.jsx
import React from 'react';
import { motion } from 'framer-motion';
import dish1 from '../assets/homeImage8.png';


const menuItems = [
  {
    name: 'Spicy Chicken Pilau',
    image: dish1,
    description: 'Fragrant rice dish simmered with tender chicken, cloves, cardamom, and cumin for a bold East African flavor.'
  },
  {
    name: 'Chapati Beef Wrap',
    image: dish1,
    description: 'Thin, soft chapati wrapped around slow-cooked beef and fresh veggies with a touch of chili sauce.'
  },
  {
    name: 'Grilled Veggie Bowl',
    image: dish1,
    description: 'A medley of seasoned, grilled vegetables served over brown rice and topped with tangy vinaigrette.'
  },
  {
    name: 'Matoke with Peanut Sauce',
    image: dish1,
    description: 'Steamed plantains drenched in creamy peanut sauce, a traditional Ugandan comfort dish.'
  },
  {
    name: 'Mandazi & Chai Combo',
    image: dish1,
    description: 'Sweet fried dough pastries paired perfectly with spicy, creamy Kenyan chai.'
  },
  {
    name: 'Tilapia Ugali Plate',
    image: dish1,
    description: 'Grilled tilapia fillet served with soft ugali and sukuma wiki, a classic coastal favorite.'
  },
  {
    name: 'Beef Stew & Rice',
    image: dish1,
    description: 'Hearty beef chunks cooked in tomato and onion sauce, served with fluffy white rice.'
  },
  {
    name: 'Vegetarian Samosas',
    image: dish1,
    description: 'Crispy triangles filled with spiced potatoes, peas, and carrots, great for snacking or sides.'
  },
  {
    name: 'Breakfast Combo Plate',
    image: dish1,
    description: 'Includes eggs, sausages, toast, and grilled tomatoes with optional beans or avocado.'
  },
  {
    name: 'Fried Rice with Sausages',
    image: dish1,
    description: 'Flavorful fried rice stir-fried with sliced sausages, vegetables, and a hint of soy sauce.'
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
      <div className="space-y-10">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/4 w-full h-60 md:h-auto">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-3/4 w-full p-6 text-white">
              <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Menu;
