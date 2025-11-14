// src/pages/Contact.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Quote } from 'lucide-react';
import contactHero from '../assets/homeImage8.png';

const Contact = () => {
  /* ─── form state ────────────────────────────── */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type:'success'|'error', text:'' }

  /* ─── handlers ──────────────────────────────── */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message,
      };

      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || '';
      await axios.post(`${apiBaseUrl}/api/feedback`, payload);

      setAlert({ type: 'success', text: 'Thanks for your feedback 🙌' });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      setAlert({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  /* ─── UI ─────────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="text-white"
    >
      {/* ── HERO SECTION ── */}
      <div
        className="h-[70vh] bg-cover bg-center relative flex items-center justify-center text-center px-4"
        style={{ backgroundImage: `url(${contactHero})`, backgroundBlendMode: 'darken' }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0" />
        <div className="relative z-10 flex flex-col items-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-xl mb-4">
            CONTACT US
          </h1>
          <p className="text-lg md:text-xl font-medium">
            We’re here to help. Reach out and we’ll get back to you as fast as an Upesi delivery!
          </p>
        </div>
      </div>

      {/* ── CONTACT + FEEDBACK FORM SECTION ── */}
      <section className="py-20 px-6 md:px-16 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          {/* left column – contact info */}
          <div className="space-y-10">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-1">Email Us</h3>
                <p className="text-gray-300">info@upesicafeteria.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-1">Phone Us</h3>
                <p className="text-gray-300">+254 712 345 678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-amber-500 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-1">Visit Us</h3>
                <p className="text-gray-300">MSB Building, Nairobi</p>
              </div>
            </div>
          </div>

          {/* right column – feedback form */}
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {alert && (
              <div
                className={`p-3 rounded ${
                  alert.type === 'success' ? 'bg-green-700' : 'bg-red-700'
                }`}
              >
                {alert.text}
              </div>
            )}

            {/* names */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
            </div>

            {/* email + phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            {/* message */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-amber-800 hover:bg-amber-900 px-6 py-3 rounded font-semibold w-full md:w-auto disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-20 px-6 md:px-16 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {[{
            quote: 'Upesi Cafeteria exceeded my expectations. I placed a bulk order for our department meeting and everything was not only delivered on time but also fresh and delicious. The chapatis were soft, the stew flavorful, and the service was excellent. Highly recommend their team!',
            author: '— Grace M., Operations Coordinator'
          },{
            quote: 'As someone with dietary restrictions, I truly appreciate how Upesi Cafeteria caters to different needs. Their team communicated with me clearly and ensured my meal was exactly what I needed. Exceptional service and commitment!',
            author: '— Daniel K., Graduate Student'
          }].map((t,i)=>(
            <div key={i} className="text-lg text-gray-200 italic relative">
              <Quote className="w-8 h-8 text-amber-500 absolute -top-6 -left-6" />
              <p>{t.quote}</p>
              <p className="mt-4 text-right font-semibold text-amber-400">{t.author}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
