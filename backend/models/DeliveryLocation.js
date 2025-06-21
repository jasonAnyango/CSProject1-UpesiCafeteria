import mongoose from 'mongoose';

const deliverLocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('DeliveryLocation', deliverLocationSchema, 'DeliveryLocation');