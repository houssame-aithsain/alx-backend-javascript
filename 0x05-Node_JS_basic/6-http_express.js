const express = require('express');
// Import the Express module
const app = express(); // Create an Express application

// Define the route for the root endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!'); // Respond with the message
});

// Start the server and listen on port 1245
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

// Export the app for testing purposes
module.exports = app;
