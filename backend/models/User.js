import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

// Define User Collection Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Administrator', 'Customer', 'Staff']
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Hash the password before saving the user document
userSchema.pre('save', async function(next) {
    // Check if the password was changed or is new
    // If not modified, skip hashing and proceed to next middleware
    if (!this.isModified('password')) {return next();}
    this.password = await bcrypt.hash(this.password, 12);
    // Continue to next middleware
    next();
})

// Export the user model
export default mongoose.model('User', userSchema, 'User');