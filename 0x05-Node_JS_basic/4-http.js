const http = require('http');

const PORT = 1245;
const HOST = 'localhost';

// Create the server
const app = http.createServer();

// Handle incoming requests
app.on('request', (_, res) => {
  const responseText = 'Hello Holberton School!';

  // Set headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);
  res.statusCode = 200;

  // Write the response
  res.write(Buffer.from(responseText));
});

// Start the server and listen on the specified port and host
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
