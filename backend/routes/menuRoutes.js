import express from 'express';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js'; // Import menu controller functions

// Create a new router instance
const router = express.Router();

// Define the routes for menu items
router.get('/', getMenuItems); // Route to get all menu items
router.post('/', addMenuItem); // Route to add a new menu item
router.put('/:id', updateMenuItem); // Route to update a menu item  
router.delete('/:id', deleteMenuItem); // Route to delete a menu item

export default router; // Export the router to be used in the main app
