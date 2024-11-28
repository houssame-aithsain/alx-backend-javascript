const express = require('express');
const app = express();
const port = 7865;

app.use(express.json()); // Middleware to parse JSON bodies

// Existing routes
app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

app.get('/cart/:id', (req, res) => {
  const { id } = req.params;
  if (/^\d+$/.test(id)) {  // Regex to check if the id is a number
    res.send(`Payment methods for cart ${id}`);
  } else {
    res.status(404).send('Not Found');
  }
});

// New route /available_payments
app.get('/available_payments', (req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

// New route /login
app.post('/login', (req, res) => {
  const { userName } = req.body;
  res.send(`Welcome ${userName}`);
});

app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});

module.exports = app;
