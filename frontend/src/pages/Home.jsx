import React from 'react';
import homeImage from '../assets/homeImage8.png';
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <motion.div
    initial={{opacity:0, y:-50}}
    animate={{opacity:100, y:0}}
    exit={{opacity:0, y:-50}}
    transition={{duration:0.5}}
    >
        <div
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: `url(${homeImage})`, backgroundBlendMode: 'darken', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">UPESI CAFETERIA</h1>
            <p className="mt-4 text-xl max-w-xl">Fast, Fresh, and Flavorful — Upesi delivers more than just a meal!</p>
            <button className="mt-6 px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg shadow-lg">
                View Menu
            </button>
        </div>

        <section id="about" className="py-20 px-6 md:px-16 bg-gray-900 text-white">
            <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
            <div className="grid md:grid-cols-3 gap-10 items-center">
                <img src={homeImage} alt="About Upesi 1" className="w-full h-auto rounded-lg shadow-md" />
                <div className="flex flex-col justify-center h-full space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Upesi?</h2>
                    <p className="mb-4">We’re redefining fast food for students and professionals. Enjoy quality meals made fresh every day with unbeatable convenience.</p>
                    <button className="bg-amber-800 text-white px-6 py-3 rounded-md hover:bg-amber-900 font-semibold">Learn More</button>
                </div>
                <img src={homeImage} alt="About Upesi 2" className="w-full h-auto rounded-lg shadow-md" />
            </div>
        </section>

        <section id="menu" className="py-20 px-6 md:px-16 bg-gray-800">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img src={homeImage} alt="Popular Dishes" className="w-3/4 h-auto rounded-lg shadow-md" />
        <div>
          <h2 className="text-3xl font-bold mb-4 text-white">Popular Dishes</h2>
          <div className="space-y-4 text-lg">
            <div>
              <h3 className="font-semibold text-xl text-white">Spicy Chicken Pilau</h3>
              <p>Aromatic rice dish with seasoned chicken and rich spices.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-white">Chapati Beef Wrap</h3>
              <p>Soft chapati filled with tender beef and flavorful veggies.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-white">Grilled Veggie Bowl</h3>
              <p>Fresh vegetables grilled to perfection in a hearty bowl.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-white">Matoke with Peanut Sauce</h3>
              <p>Traditional green bananas served in rich peanut sauce.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-white">Mandazi & Chai Combo</h3>
              <p>Golden mandazi served with a soothing cup of chai.</p>
            </div>
          </div>
          <button className="mt-4 bg-amber-800 text-white px-6 py-3 rounded-md hover:bg-amber-900 font-semibold">See Full Menu</button>
        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default Home;
