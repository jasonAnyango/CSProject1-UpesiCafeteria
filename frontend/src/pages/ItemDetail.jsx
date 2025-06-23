// src/pages/ItemDetail.jsx
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import suggestion1 from '../assets/homeImage.png';
import suggestion2 from '../assets/homeImage.png';
import suggestion3 from '../assets/homeImage.png';

const ItemDetail = () => {
  const location = useLocation();
  const { name, image_url, description, available, price } = location.state || {};

  const handleAddToCart = () => {
    // For now, just log to console or you could integrate with context/store
    console.log(`Added to cart: ${name}`);
    alert(`${name} added to cart!`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 px-6 py-16 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dish Title */}
      <h1 className="text-4xl font-bold text-white text-center mb-10">{name}</h1>

      {/* Main Dish Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row mb-12">
        {/* Image */}
        <div className="md:w-1/4 w-full h-64 md:h-auto">
          <img src={image_url} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Description */}
        <div className="md:w-3/4 w-full p-6 text-white space-y-4">
          <p className="text-gray-300 text-base whitespace-pre-line line-clamp-4">{description}</p>
          <p className={`font-semibold ${available === true ? 'text-green-400' : 'text-red-400'}`}>Status: {available ? 'Available' : 'Unavailable'}</p>
          <p className="text-lg font-bold text-amber-500">Price: {price}</p>
          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Suggestions Section */}
      <h2 className="text-2xl font-bold text-white mb-6">You may also like</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[{
          name: 'Chapati Beef Wrap',
          image: suggestion1,
          description: 'Soft chapati filled with savory beef and crunchy veggies.'
        }, {
          name: 'Grilled Veggie Bowl',
          image: suggestion2,
          description: 'A healthy mix of grilled seasonal vegetables over rice.'
        }, {
          name: 'Matoke with Peanut Sauce',
          image: suggestion3,
          description: 'Traditional Ugandan dish with creamy peanut flavor.'
        }].map((suggestion, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-4">
            <img
              src={suggestion.image}
              alt={suggestion.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div className="text-white">
              <h3 className="font-semibold text-lg">{suggestion.name}</h3>
              <p className="text-sm text-gray-300">{suggestion.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ItemDetail;
