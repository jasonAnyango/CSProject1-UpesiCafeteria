import User from "../models/User.js"; // Import the User model
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


// Allow access to environment variables
dotenv.config();
// Load environment variables
const {JWT_SECRET} = process.env;

// Login an existing user
export const login = async (req, res) => {
    try {
        // Get credentials from the request body
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist return a 400 status code and an error message
        if (!user) {
            return res.status(400).json({ message: "User with that email does not exist" })
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If the passwords do not match, return a 400 status code and an error message
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }

        // Generate a JWT token
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'});

        // Respond with the token and user details, status 200 - OK
        res.status(200).json({
            token,
            user: {
                id: user._id, name: user.name, email: user.email, role: user.role
            }
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error during user login:", error);
        // Status 500 - Internal Server Error 
        res.status(500).json({
            message: error.message || "User authorization failed"
        });
    }
}
