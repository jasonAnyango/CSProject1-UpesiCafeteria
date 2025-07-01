import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 md:px-16 ">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        {/* Brand */}
        <Link to="/" className="text-3xl font-bold text-amber-500 hover:text-amber-400">
          Upesi Cafeteria
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link to="#about" className="hover:text-white transition-colors">About</Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-gray-400">
          © {new Date().getFullYear()} Upesi Cafeteria. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
