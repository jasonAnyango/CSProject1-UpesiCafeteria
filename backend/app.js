// This file will handle the main application logic
import express from 'express'; // for creating the server
import cors from 'cors'; // for handling CORS
import bodyParser from 'body-parser';
import otpRoutes from './routes/otpRoutes.js'; // for registration and OTP routes
import authRoutes from './routes/authRoutes.js'; // for login authentication route
import menuRoutes from './routes/menuRoutes.js'; // for menu routes
import orderRoutes from './routes/orderRoutes.js'; // for order routes 
import deliveryLocationRoutes from './routes/deliveryLocationRoutes.js'; // for delivery location routes
import resetPasswordRoutes from './routes/resetPasswordRoutes.js'; // for password reset routes
import adminRoutes from './routes/adminRoutes.js'; // for admin routes
import staffRoutes from './routes/staffRoutes.js' // Staff Routes
import { stkPush } from './mpesa/mpesa.js';
import feedbackRoutes from './routes/feedbackRoutes.js'

const app = express();

// ✅ FIRST: Middleware
app.use(cors());
app.use(express.json()); // Must come BEFORE routes
app.use(bodyParser.json())

// ✅ STK Push route
const mpesaRouter = express.Router();
mpesaRouter.post('/pay', async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const result = await stkPush(phone, amount);
    res.json(result);
  } catch (err) {
    console.error('❌ STK Push error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to process STK push' });
  }
});
app.use('/api/mpesa', mpesaRouter);

// ✅ All other routes
app.use('/api/auth', otpRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', resetPasswordRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', deliveryLocationRoutes);

app.use('/api/staff', staffRoutes);
app.use('/api', feedbackRoutes);

export default app;
