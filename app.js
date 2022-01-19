require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/users');
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());

connectDB();

app.use('/api/users', userRoute);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
