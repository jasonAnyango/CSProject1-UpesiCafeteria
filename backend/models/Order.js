import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    items : [
        {
            menuItem_name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    deliveryLocation: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'out for delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Order', orderSchema, 'Order');