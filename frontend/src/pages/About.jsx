import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, Smile } from 'lucide-react';
import heroImage from '../assets/homeImage8.png'; 
import chefOne from '../assets/mj.jpg'  
import chefTwo from '../assets/mj.jpg' 
        
const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-white"
    >
      <div
        className="h-[70vh] bg-cover bg-center relative flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundBlendMode: 'multiply',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg tracking-wider">
          ABOUT&nbsp;US
        </h1>
      </div>
        <section className="py-20 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our&nbsp;Values</h2>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16"/>
          <div className="flex flex-row flex-wrap justify-center gap-6 md:w-full mb-5">
            <div className="bg-gray-800 p-6 rounded-xl shadow-md flex items-start gap-4 w-80">
              <Heart className="w-10 h-10 text-amber-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Passion for Quality</h3>
                <p className="text-gray-300 text-sm">
                  We believe every meal should be fresh, delicious, and prepared with care from locally sourced ingredients.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md flex items-start gap-4 w-80">
              <Star className="w-10 h-10 text-amber-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Customer First</h3>
                <p className="text-gray-300 text-sm">
                  Every decision at Upesi Cafeteria is guided by how it improves your dining experience and comfort.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md flex items-start gap-4 w-80">
              <Smile className="w-10 h-10 text-amber-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Warm Hospitality</h3>
                <p className="text-gray-300 text-sm">
                  Our team treats you like family, ensuring every visit feels like home with fast and friendly service.
                </p>
              </div>
            </div>
          </div>


        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img src={heroImage} alt="Speed value" className="w-full h-64 object-cover group-hover:scale-105 transition" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
             
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img src={heroImage} alt="Freshness value" className="w-full h-64 object-cover group-hover:scale-105 transition" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Meet&nbsp;Our&nbsp;Chefs</h2>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
          
          <div className="bg-gray-700 p-6 rounded-lg text-center shadow-lg">
            <img src={chefOne} alt="Chef Jane" className="w-48 h-48 object-cover rounded-full mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-1">Chef&nbsp;Jane&nbsp;W.</h3>
            <p className="text-amber-400 mb-2">Head&nbsp;Chef</p>
            <p className="text-gray-300 text-sm">
              Jane crafts Upesi’s signature flavors and ensures every dish leaves the kitchen with care and creativity.
            </p>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg text-center shadow-lg">
            <img src={chefTwo} alt="Chef Mark" className="w-48 h-48 object-cover rounded-full mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-1">Chef&nbsp;Mark&nbsp;K.</h3>
            <p className="text-amber-400 mb-2">Pastry&nbsp;Expert</p>
            <p className="text-gray-300 text-sm">
              Mark’s mandazi and sweet treats keep our community coming back for more—fluffy, golden, unforgettable.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/menu">
            <button className="bg-amber-800 hover:bg-amber-900 text-white font-semibold px-6 py-3 rounded-lg">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
