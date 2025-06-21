// This file will handle the main application logic
import express from 'express'; // for creating the server
import cors from 'cors'; // for handling CORS
import otpRoutes from './routes/otpRoutes.js'; // for registration and OTP routes
import authRoutes from './routes/authRoutes.js' // for login authentication route

// Create an Express application
const app = express();

// Cors middle ware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', otpRoutes);
app.use('/api/auth', authRoutes);


export default app;