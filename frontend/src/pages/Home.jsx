import React from 'react';
import homeImage from '../assets/homeImage4.png';

const Home = () => {
  return (
    // <div className="min-h-screen text-black font-sans">
    //   {/* Navigation Bar with Amber Gradient */}
    //   <div className="flex justify-evenly items-center bg-gradient-to-l from-amber-600 to-amber-800 p-4 shadow-md">
    //     <h1><a href="homePage" className="text-white text-lg font-semibold hover:underline">Home</a></h1>
    //     <h1><a href="menuPage" className="text-white text-lg font-semibold hover:underline">Menu</a></h1>
    //     <h1><a href="aboutPage" className="text-white text-lg font-semibold hover:underline">About Us</a></h1>
    //     <h1><a href="contactPage" className="text-white text-lg font-semibold hover:underline">Contact</a></h1>
    //   </div>

    //   {/* Content Section with Background Image */}
    //   <div
    //     className="h-[calc(100vh-80px)] bg-cover bg-center px-8 md:px-16 py-16 text-white"
    //     style={{ backgroundImage: `url(${homeImage})` }}
    //   >
    //     <div className="max-w-3xl">
    //       <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">UPESI CAFETERIA</h1>
    //       <p className="text-lg md:text-xl mb-6 bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
    //         Welcome to Upesi Cafeteria — your go-to spot for quick, delicious meals made with care.
    //         Whether you're on a tight schedule or just craving something satisfying, we make ordering
    //         easy and fast without compromising on flavor. From breakfast bites to hearty lunches,
    //         Upesi serves up freshness, speed, and convenience every time.
    //       </p>
    //       <button className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg shadow-lg transition duration-300">
    //         View Menu
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <>
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
                <div className="flex flex-col justify-center items-center h-full space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Upesi?</h2>
                    <p className="mb-4 text-center">We’re redefining fast food for students and professionals. Enjoy quality meals made fresh every day with unbeatable convenience.</p>
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
    </>
  );
};

export default Home;
