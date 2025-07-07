import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    checkoutRequestId: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export default mongoose.model('Payment', paymentSchema, 'Payment');