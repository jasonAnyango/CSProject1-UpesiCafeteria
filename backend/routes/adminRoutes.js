import express from 'express';
import { getUsers, addUser, deleteUser, getMonthlyRevenue, getSalesOverTime, getQuickStats, getUserStats, getRecentUsers } from '../controllers/adminController.js';

const router = express.Router();

// get all users
router.get('/users', getUsers);
// add a new user
router.post('/users', addUser);
// delete a user
router.delete('/users/:id', deleteUser);

// Analytics routes
router.get('/revenue', getMonthlyRevenue); // Get monthly revenue
router.get('/sales', getSalesOverTime); // Get sales over time
router.get('/stats', getQuickStats); // Get sales over time
router.get('/user-stats', getUserStats); // Get user stats
router.get('/recent-users', getRecentUsers); // Get recent users

export default router;