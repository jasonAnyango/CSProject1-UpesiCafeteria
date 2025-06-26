import dotenv from 'dotenv';
dotenv.config();

import app from './app.js' // Import the Express application
import connectDB from './config/db.js'; // Import the database
import stkRoutes from './routes/stkRoutes.js';

app.use('/api', stkRoutes);


// Define the port number
const {PORT} = process.env || 5000;

// Start the server
const startServer = async () => {
    await connectDB(); // Connect to the database
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer().catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process with a failure code
});

