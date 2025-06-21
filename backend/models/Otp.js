import mongoose from 'mongoose';

// Define OTP Collection Schema
const otpSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpiry: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Otp', otpSchema, 'Otp');