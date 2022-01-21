require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());

connectDB();

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
