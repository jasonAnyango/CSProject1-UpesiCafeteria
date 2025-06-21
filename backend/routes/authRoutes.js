import express from 'express';
import { login } from '../controllers/authController.js'; // for handling login

const router = express.Router();

// Define the route for login
router.post('/login', login); // Route for user login

export default router;