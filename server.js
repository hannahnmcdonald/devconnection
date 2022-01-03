// Express Server
const express = require('express');
// Connect to MongoDB
const connectDB = require('./config/db');
// App 
const app= express();
// PORT
const PORT = process.env.PORT || 3001;

// Initialize Middleware
app.use(express.json({ extended: false });)
app.get('/', (req, res) => res.send('API runnng'));

// Define routes
app.use('/routes/user', require('./routes/user'));
app.use('/routes/auth', require('./routes/auth'));
app.use('/routes/profile', require('./routes/profile'));
app.use('/routes/posts', require('./routes/posts'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Connect Database
connectDB();