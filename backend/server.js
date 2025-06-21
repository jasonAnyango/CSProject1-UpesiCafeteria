import app from './app.js' // Import the Express application
import connectDB from './config/db.js'; // Import the database
// connection function
import dotenv from 'dotenv'; // for environment variables

// Allow the use of environment variables
dotenv.config();

// Define the port number
const {PORT} = process.env || 5000;

// Start the server
const startServer = async () => {
    await connectDB(); // Connect to the database
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

// Call the function to start the server
startServer().catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process with a failure code
});

