// This file will handle the main application logic
import express from 'express'; // for creating the server
import cors from 'cors'; // for handling CORS
import otpRoutes from './routes/otpRoutes.js'; // for registration and OTP routes
import authRoutes from './routes/authRoutes.js' // for login authentication route
import menuRoutes from './routes/menuRoutes.js'; // for menu routes (uncomment when implemented)

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
// Menu routes - Cafeteria menu management
app.use('/api/menu', menuRoutes);


export default app;