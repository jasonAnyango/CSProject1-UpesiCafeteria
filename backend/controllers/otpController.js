import Otp from "../models/Otp.js"; // Otp model
import jwt from "jsonwebtoken"; // JWT for token generation
import dotenv from "dotenv"; // For environment variables
import nodemailer from "nodemailer"; // For sending emails

import bcrypt from "bcryptjs"; // For hashing passwords
import User from "../models/User.js"; // Import the User model

// Allow access to environment variables
dotenv.config();
// Load environment variables
const { JWT_SECRET, EMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

// Initiate the registration process
export const initiateRegistration = async (req, res) => {
    try {
        // Validate Input
        const { email, name, password, confirmPassword } = req.body;
        // Check if all fields are provided
        if (!email || !name || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email contains '@strathmore.edu' domain
        if (!email.endsWith('@strathmore.edu')) {
            return res.status(400).json({ message: "Email must be a Strathmore University email" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Input validation passed, proceed with OTP generation
        const otp = Math.floor(100000 +Math.random() * 900000); // 6-digit OTP

        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: GMAIL_APP_PASSWORD
            }
        });

        // The mail options for sending the OTP
        const mailOptions = {
            from: EMAIL_USER, // Sender address
            to: email, // Recipient address
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is: ${otp}`
        }

        // Send the OTP email
        await transporter.sendMail(mailOptions);

        // Store the OTP in the database with an expiry time of 10 minutes
        await Otp.create({
            email,
            otp: otp.toString(),
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000)
        })

        // Respond with a success message
        return res.status(200).json({ message: `OTP sent to email: ${email}` });

    } catch (error) {
        console.error(`Error in OTP registration: ${error.message}`);
        res.status(500).json({ message: "Registration Initiation Failed" });
    }
}

// Verify the OTP and complete the registration
export const verifyOTP = async (req, res) => {
    try {
        // Extract the details from the request body
        const {email, otp, name, password} = req.body;

        // Check if the email and OTP exist in the database
        const otpRecord = await Otp.findOne({ email, otp });
        if(!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Check if the OTP has expired
        if(otpRecord.otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        
        // Create a new user in the database
        const newUser = await User.create({
            email: email,
            name: name,
            role: "Customer", // Default role
            password: password
        });

        // Delete the OTP record after successful registration
        await Otp.deleteMany({ email });

        // Generate a JWT token for the user
        const token = jwt.sign({ id:newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        // Respond with the token and user details
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({
            message: error.message || "OTP verification failed"
        });
    }
}
