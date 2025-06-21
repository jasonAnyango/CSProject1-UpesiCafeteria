import MenuItem from '../models/MenuItem.js';

// Add a new menu item - Create
export const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, image_url, category } = req.body;

        const newMenuItem = new MenuItem({
            name: name,
            description: description,
            price: price,
            image_url: image_url,
            category: category
        })

        // Save the new menu item to the database
        await newMenuItem.save();

        res.status(201).json({ message: 'Menu item added successfully', menuItem: newMenuItem });

    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all menu items - Read
export const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); 
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update a menu item - Update
export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params; // Get the menu item ID from the request parameters
        const { name, description, price, image_url, category, available } = req.body;
        // Find the menu item by ID and update it
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            id,
            {
                name: name,
                description: description,
                price: price,
                image_url: image_url,
                category: category,
                available: available
            },
            { new: true }
        ); 

        // If the menu item is not found, return a 404 error - Not found
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item updated successfully', menuItem: updatedMenuItem }); 
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Delete a menu item - Delete
export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params; // Get the menu item ID from the request parameters
        // Find the menu item by ID and delete it
        const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
        // If the menu item is not found, return a 404 error - Not found
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully', menuItem: deletedMenuItem });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}