import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed w-screen z-100 flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <div className="text-2xl font-bold">Upesi Cafeteria</div>
      <div className="hidden md:flex gap-8">
        <a href="/" className="hover:underline">Home</a>
        <a href="#menu" className="hover:underline">Menu</a>
        <a href="#about" className="hover:underline">About Us</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>
      <div className="flex gap-4">
        <Link to='/login'>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold hover:cursor-pointer">Login</button>
        </Link>
        <Link to='/signup'>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md font-semibold hover:cursor-pointer">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;