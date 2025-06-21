import express from 'express';
import { placeOrder, getCustomerOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', placeOrder); // Place a new order
router.get('/customer/:customer_id', getCustomerOrders); // Get orders for a specific customer
router.get('/all', getAllOrders); // Get all orders for cafeteria staff
router.put('/update/:id', updateOrderStatus); // Update order status by ID

export default router;