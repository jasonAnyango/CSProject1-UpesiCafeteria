import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import shoppingCartIcon from '../assets/shopping-cart.png'; // Importing an icon for the cart
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  // Access the user and logout function from AuthContext
  // Now we can conditionally render the navbar based on authentication state
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed w-screen z-100 flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <Link to='/'>
        <div className="text-2xl font-bold">Upesi Cafeteria</div>
      </Link>
      <div className="hidden md:flex gap-8">
        <a href="/" className="hover:underline">Home</a>
        <a href="/menu" className="hover:underline">Menu</a>
        <a href="/#about" className="hover:underline">About Us</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>
      <div className="flex gap-4 mr-2 align-bottom justify-center">
        {/* Check if user is logged in */}
        {user ? (
        // When logged in: 
        <>
          <span className='self-center font-medium'>Hi, {user.name.split(' ')[0]}</span>
          <Link to='/myCart' className='flex items-center gap-2 bg-amber-800 text-gray-900 px-4 py-2 rounded-md font-semibold hover:cursor-pointer'>
            <img src={shoppingCartIcon} alt="Cart Icon" />
            <span className='text-white font-bold'>My Cart</span>
          </Link>
          <button onClick={logout}
          className='bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:cursor-pointer'>
            Logout
          </button>
        </>) : (
        // When not logged in:
        <>
          <Link to="/login" className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold hover:cursor-pointer">
            Login
          </Link>
          <Link to="/signup" className="bg-gray-800 text-white px-4 py-2 rounded-md font-semibold hover:cursor-pointer">
            Sign Up
          </Link>
        </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;