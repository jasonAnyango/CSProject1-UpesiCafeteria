import React from 'react';
import homeImage from '../assets/homeImage3.png';

const Home = () => {
  return (
    <div className="min-h-screen text-black">
      {/* Navigation Bar */}
      <div className="flex justify-evenly items-center bg-grey bg-opacity-80 p-4">
        <h1><a href="homePage" className="text-green-600 hover:underline">Home</a></h1>
        <h1><a href="menuPage" className="text-green-600 hover:underline">Menu</a></h1>
        <h1><a href="aboutPage" className="text-green-600 hover:underline">About Us</a></h1>
        <h1><a href="contactPage" className="text-green-600 hover:underline">Contact</a></h1>
      </div>

      {/* Content Section with Background Image */}
      <div
        className="h-[calc(100vh-80px)] bg-cover bg-center px-16 pt-10"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <h1 className="mt-20 text-5xl font-bold">UPESI CAFETERIA</h1>
        <p className="mt-4 max-w-2xl text-xl">
          Welcome to Upesi Cafeteria — your go-to spot for quick, delicious meals made with care.
          Whether you're on a tight schedule or just craving something satisfying, we make ordering
          easy and fast without compromising on flavor. From breakfast bites to hearty lunches,
          Upesi serves up freshness, speed, and convenience every time.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Home;
