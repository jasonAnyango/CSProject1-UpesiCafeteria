// This file will handle the main application logic
import express from 'express'; // for creating the server
import cors from 'cors'; // for handling CORS
import otpRoutes from './routes/otpRoutes.js'; // for registration and OTP routes
import authRoutes from './routes/authRoutes.js' // for login authentication route
import menuRoutes from './routes/menuRoutes.js'; // for menu routes
import orderRoutes from './routes/orderRoutes.js'; // for order routes 
import deliveryLocationRoutes from './routes/deliveryLocationRoutes.js'; // for delivery location routes
import resetPasswordRoutes from './routes/resetPasswordRoutes.js'; // for password reset routes

// Create an Express application
const app = express();

// Cors middle ware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// OTP and registration route
app.use('/api/auth', otpRoutes);
// Authentication route for login
app.use('/api/auth', authRoutes);
// Password reset routes
app.use('/api/auth', resetPasswordRoutes);
// Menu routes - Cafeteria menu management
app.use('/api/menu', menuRoutes);
// Order routes
app.use('/api/order', orderRoutes);
// Delivery Location routes
app.use('/api/deliveryLocation', deliveryLocationRoutes);
export default app;