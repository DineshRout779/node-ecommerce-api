require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.status(200).send('Ecomm api');
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
