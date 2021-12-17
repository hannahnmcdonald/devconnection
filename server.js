// Express Server
const express = require('express');

// App 
const app= express();
app.get('/', (req, res) => res.send('API runnng'));

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));