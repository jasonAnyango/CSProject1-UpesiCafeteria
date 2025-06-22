import Otp from '../models/Otp.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const { EMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save OTP to database
        await Otp.create({
            email: email,
            otp: otp.toString(),
            // Set OTP expiry to 10 minutes
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000)
        })

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: GMAIL_APP_PASSWORD
            }, tls: {
                rejectUnauthorized: false
            }
        })
        
        const mailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to email' });

    } catch (error) {
        console.error(`Error in password reset request: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the OTP record in the database
        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        // Check if the OTP has expired
        if (otpRecord.otpExpiry < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
        // If OTP is valid, delete the OTP record
        await Otp.deleteMany({ email });
        res.status(200).json({ message: 'OTP verified successfully', email });

    } catch (error) {
        console.error(`Error in password reset verification: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(`Error in password reset: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}