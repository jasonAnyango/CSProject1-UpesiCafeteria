import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <div className="text-2xl font-bold">Upesi Cafeteria</div>
      <div className="hidden md:flex gap-8">
        <a href="#home" className="hover:underline">Home</a>
        <a href="#menu" className="hover:underline">Menu</a>
        <a href="#about" className="hover:underline">About Us</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>
      <div className="flex gap-4">
        <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">Login</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md font-semibold">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;