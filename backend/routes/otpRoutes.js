import express from 'express';
import { initiateRegistration, verifyOTP } from '../controllers/otpController.js'; // for handling registration and OTP verification

const router = express.Router();

// Define the 2 routes for OTP
router.post('/register', initiateRegistration); // Route for initiating registration and sending OTP
router.post('/verifyOTP', verifyOTP); // Route for verifying the OTP

export default router;