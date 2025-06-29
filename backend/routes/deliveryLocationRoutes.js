import express from 'express';
import { getDeliveryLocations, addDeliveryLocation, updateDeliveryLocation, deleteDeliveryLocation } from '../controllers/deliveryLocationController.js';

const router = express.Router();

// Get all delivery locations
router.get('/deliveryLocation', getDeliveryLocations);
// Create a new delivery location
router.post('/deliveryLocation', addDeliveryLocation);
// Update an existing delivery location
router.put('/deliveryLocation/:id', updateDeliveryLocation);
// Delete a delivery location
router.delete('/deliveryLocation/:id', deleteDeliveryLocation);

export default router;