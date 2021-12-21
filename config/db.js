// Bring in mongoose
const mongoose = require('mongoose');

// Bring in default.json w/config package
const config = require('config');

// Bring in mongoURI from default.json
const db = config.get('mongoURI');

// Connect to MongoDB
const connectDB = async () => {
    // Try/Catch to filter for errors
    try {
        // Await due to promise
        await mongoose.connect(db, { useNewUrlParser: true });
        // Console log connection success
        console.log('MongoDB Connected...');
    } catch(err) {
        // Console.log error
        console.error(err.message);
        // Exit process w/ failure
        process.exit(1);
    }
}

// Export the function to add to server.js
module.exports = connectDB;