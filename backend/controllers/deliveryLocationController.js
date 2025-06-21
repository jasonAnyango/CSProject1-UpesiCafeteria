import DeliveryLocation from '../models/deliveryLocation.js';

// Get all delivery locations
export const getDeliveryLocations = async (req, res) => {
  try {
    const deliveryLocations = await DeliveryLocation.find();
    res.status(200).json({message: 'Delivery locations fetched successfully', data: deliveryLocations});
  } catch (error) {
    console.error('Error fetching delivery locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Create a new delivery location
export const addDeliveryLocation = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingLocation = await DeliveryLocation.findOne({ name });
        if (existingLocation) {
            return res.status(400).json({ message: 'Location already exists' });
        }

        // Create a new delivery location
        const newLocation = new DeliveryLocation({
            name: name, description: description
        })

        // Save the new location to the database
        const savedLocation = await newLocation.save();
        res.status(201).json({ message: 'Delivery location added successfully', data: savedLocation });
    } catch (error) {
        console.error('Error adding delivery location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update an existing delivery location
export const updateDeliveryLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedLocation = await DeliveryLocation.findByIdAndUpdate(id, {name, description}, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updatedLocation);
    } catch (error) {
        console.error('Error updating delivery location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete a delivery location
export const deleteDeliveryLocation = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedLocation = await DeliveryLocation.findByIdAndDelete(id);
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.error('Error deleting delivery location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

