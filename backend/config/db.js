// This file will handle the connection to the database
// 1. Import the necessary modules
import mongoose from 'mongoose'; // for MongoDB
import dotenv from 'dotenv'; // for environment variables

// 2. Load environment variables from .env file
dotenv.config();

// 3. Access the MongoDB connection string from environment variables
const {MONGODB_URI} = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};

export default connectDB;