import Order from "../models/Order.js";

// Place Order endpoint
export const placeOrder = async (req, res) => {
    try {
        // Grab the order details from the request body
        const { customer_name, items, deliveryLocation, total_amount } = req.body;

        // Check if the items array is empty
        if(!items || items.length === 0) {
            return res.status(400).json({message:"Order must contain at least one item"});
        }

        // Create a new order document
        const newOrder = new Order({
            customer_name: customer_name,
            items: items,
            deliveryLocation: deliveryLocation,
            total_amount: total_amount,
            status: 'pending' // Default status when order is placed
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get customer orders endpoint
export const getCustomerOrders = async (req, res) => {
    try {
        // Get customer name from request params
        const { customer_name } = req.params;

        // Find orders for the customer based on customer name
        const orders = await Order.find({ customer_name: customer_name });

        res.status(200).json({
            message: "Customer orders retrieved successfully",
            orders: orders
        });
    } catch (error) {
        console.error("Error retrieving customer orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get all orders endpoint - Cafeteria Staff
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            message: "All orders retrieved successfully",
            orders: orders
        });
    } catch (error) {
        console.error("Error retrieving all orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update order status endpoint - Cafeteria Staff
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate( id, { status: status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}