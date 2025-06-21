import express from 'express';
import { getDeliveryLocations, addDeliveryLocation, updateDeliveryLocation, deleteDeliveryLocation } from '../controllers/deliveryLocationController.js';

const router = express.Router();

// Get all delivery locations
router.get('/', getDeliveryLocations);
// Create a new delivery location
router.post('/', addDeliveryLocation);
// Update an existing delivery location
router.put('/:id', updateDeliveryLocation);
// Delete a delivery location
router.delete('/:id', deleteDeliveryLocation);

export default router;